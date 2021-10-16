//
//  HHBluetoothPrinterManager.m
//  BlueToothPrinterT
//
//  Created by hxy on 16/1/17.
//  Copyright © 2016年 huangxinyu. All rights reserved.
//

#import "HHBluetoothPrinterManager.h"
#import "HHPrinterFormat.h"
#import "IGThermalSupport.h"

@interface HHBluetoothPrinterManager ()<CBCentralManagerDelegate, CBPeripheralDelegate>
{
    int firstPrint;
    int secondPrint;
}
/**
 *  蓝牙中央管理
 */
@property (nonatomic, strong) CBCentralManager *centralManager;
/**
 *  已连接的周边对象
 */
@property (nonatomic, strong) CBPeripheral *connectedPeripheral;
/**
 *  已连接的服务
 */
@property (nonatomic, strong) CBService *connectedService;
/**
 *  已连接的特征值
 */
@property (nonatomic, strong) CBCharacteristic *connectedCharacteristic;

@property (nonatomic, assign, readwrite) CBCentralManagerState centralState;

@end

@implementation HHBluetoothPrinterManager

#define Printer169ServiceUUID @"49535343-FE7D-4AE5-8FA9-9FAFD205E455"
#define Printer200ServiceUUID @"E7810A71-73AE-499D-8C15-FAA9AEF0C3F2"

/**
 *  单例方法
 *
 *  @return 实例对象
 */
+ (instancetype)sharedManager {
    static HHBluetoothPrinterManager *manager;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[HHBluetoothPrinterManager alloc] init];
    });
    return manager;
}

- (instancetype)init {
    if (self = [super init]) {
        self.centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:dispatch_get_main_queue()];
    }
    return self;
}

#pragma makr - CBCentralManagerDelegate
- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
    NSLog(@"centralManagerDidUpdateState");
    
   
    
    self.centralState = central.state;
    if ([self.delegate respondsToSelector:@selector(centralManagerDidUpdateState:)]) {
        [self.delegate centralManagerDidUpdateState:central];
    }
}

- (void)centralManager:(CBCentralManager *)central willRestoreState:(NSDictionary<NSString *,id> *)dict {
    self.centralState = central.state;
    if ([self.delegate respondsToSelector:@selector(centralManagerDidUpdateState:)]) {
        [self.delegate centralManagerDidUpdateState:central];
    }
}

/**
 *  扫描到新的蓝牙设备
 *
 *  @param central           中心设备
 *  @param peripheral        外设
 *  @param advertisementData 广播数据
 *  @param RSSI              信号质量
 */
- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary<NSString *,id> *)advertisementData RSSI:(NSNumber *)RSSI
{
    if ([self.delegate respondsToSelector:@selector(centralManager:didDiscoverPeripheral:)]) {
        [self.delegate centralManager:central didDiscoverPeripheral:peripheral];
    }
}
/**
 *  连接到新的蓝牙设备
 *
 *  @param central    中心管理
 *  @param peripheral 蓝牙设备
 */
- (void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral
{
    NSLog(@"ok");//链接成功
    firstPrint = 0;
    secondPrint = 1;
    peripheral.delegate = self;
    [peripheral discoverServices:nil];
    
}

/**
 *  连接蓝牙设备失败
 *
 *  @param central    中心管理
 *  @param peripheral 蓝牙设备
 *  @param error      错误
 */
- (void)centralManager:(CBCentralManager *)central didFailToConnectPeripheral:(CBPeripheral *)peripheral error:(nullable NSError *)error
{
    if ([self.delegate respondsToSelector:@selector(centralManager:didFailToConnectPeripheral:error:)]) {
        [self.delegate centralManager:central didFailToConnectPeripheral:peripheral error:error];
    };
    [self duankai:peripheral];
    [self clearConnectData];
}

#pragma mark - CBPeripheralDelegate
- (void)peripheral:(CBPeripheral *)peripheral didDiscoverServices:(NSError *)error
{
    NSLog(@"didDicoverService");
    if (error) {
        NSLog(@"连接服务:%@ 发生错误:%@",peripheral.name,[error localizedDescription]);
        return;
    }
    
    for (CBService* service in  peripheral.services) {
        NSLog(@"扫描到的serviceUUID:%@",service.UUID);
        //这里其实三个服务都可以做打印，但是我只选择了其中一个
        if ([service.UUID isEqual:[CBUUID UUIDWithString:Printer200ServiceUUID]]) {
            //扫描特征
            //self.connectedService = service;
            [peripheral discoverCharacteristics:nil forService:service];
            break;
        }
    }
}


- (void)peripheral:(CBPeripheral *)peripheral didUpdateValueForCharacteristic:(CBCharacteristic *)characteristic error:(nullable NSError *)error;
{
     
    
}

- (void)peripheral:(CBPeripheral *)peripheral didWriteValueForCharacteristic:(CBCharacteristic *)characteristic error:(nullable NSError *)error;
{
  
    secondPrint++;
    
    if ([self.delegate respondsToSelector:@selector(endOfPrinting:)]) {
            [self.delegate endOfPrinting:peripheral];
    }
    
}



//扫描出特征
- (void)peripheral:(CBPeripheral *)peripheral didDiscoverCharacteristicsForService:(CBService *)service error:(NSError *)error
{
    if (error) {
        NSLog(@"%@",service.UUID,[error localizedDescription]);
        return;
    }
    
    for (CBCharacteristic * characteristic in service.characteristics)
    {
        if (characteristic.properties & CBCharacteristicPropertyWrite ) {
            [peripheral setNotifyValue:YES forCharacteristic:characteristic];
            self.connectedPeripheral = peripheral;
            self.connectedService = service;
            self.connectedCharacteristic = characteristic;
            [self.centralManager stopScan];
        }
    }
}

/*
 Invoked upon completion of a -[setNotifyValue:forCharacteristic:] request.
 */
- (void)peripheral:(CBPeripheral *)peripheral didUpdateNotificationStateForCharacteristic:(CBCharacteristic *)characteristic error:(NSError *)error
{
    if (error)
    {
        NSLog(@"Error updating notification state for characteristic %@ error: %@", characteristic.UUID, [error localizedDescription]);
        return;
    }
    
    
    
    NSLog(@"Updated notification state for characteristic %@ (newState:%@)", characteristic.UUID, [characteristic isNotifying] ? @"Notifying" : @"Not Notifying");
    
    if ([self.delegate respondsToSelector:@selector(startPrintingReceipt)]) {
        [self.delegate startPrintingReceipt];
    }
    
    
}

#pragma mark - 接口方法
- (void)scanPeripherals
{
    
    NSDictionary *options = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:YES], CBCentralManagerOptionShowPowerAlertKey, nil];
    [self.centralManager scanForPeripheralsWithServices:nil options:options];
    
    if((long)[self.centralManager state] == 4)
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"ERROR"
                                                          message:@"Please turn ON bluetooth in your device."
                                                          delegate:self
                                                          cancelButtonTitle:@"OK"
                                                          otherButtonTitles:nil];
      [alert show];
    }
    
    
}

- (void)cancelScan
{
    [self.centralManager stopScan];
}
- (void)duankai:(CBPeripheral *)peripheral{
    
    [self.centralManager cancelPeripheralConnection:peripheral];
}
- (void)connectPeripheral:(CBPeripheral *)peripheral
{
    [self.centralManager connectPeripheral:peripheral options:[NSDictionary dictionaryWithObject:[NSNumber numberWithBool:YES] forKey:CBConnectPeripheralOptionNotifyOnDisconnectionKey]];
 
}


/**

 */
- (void)startPrint:(CBPeripheral *)peripheral writeValue:(NSData *)valData forCharacteristic:(CBCharacteristic *)characteristic type:(CBCharacteristicWriteType)type
{
    
    [peripheral writeValue:valData forCharacteristic:characteristic type:type];
    firstPrint++;
 
}





- (void)startPrint:(NSData *)writeData {
    if (self.connectedPeripheral && self.connectedCharacteristic) {
        [self startPrint:self.connectedPeripheral
              writeValue:writeData
       forCharacteristic:self.connectedCharacteristic
                    type:CBCharacteristicWriteWithResponse];
    }
}


- (void)clearConnectData {
    [self.centralManager stopScan];
    self.connectedPeripheral = nil;
    self.connectedService = nil;
}


@end
