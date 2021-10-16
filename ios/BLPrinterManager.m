//
//  BLPrinterManager.m
//  ioscall
//
//  Created by Raja on 13/04/2021.
//

#import "BLPrinterManager.h"

@implementation BLPrinterManager


-(void)initwithBLEName:(NSString*)getPrinterName withQrCodeString:(NSString*)getQrCodeString withTableNoString:(NSString*)getTableNoString
{
    
    getQrcodeToPrint = getQrCodeString;
    getTableNoToPrint = getTableNoString;
    SelectedPrinter = getPrinterName; // Sample "Optimuz"
    sendDataArray= [[NSMutableArray alloc]init];
    
    manager = [HHBluetoothPrinterManager sharedManager];
    manager.delegate = self;
    dataArray1 = [[NSMutableArray alloc] init];//初始化
    printerJob = [NSTimer scheduledTimerWithTimeInterval:(float)1.0 target:self selector:@selector(sendDataTimer:) userInfo:nil repeats:YES];
    [ImageProcessor shared].delegate = self;
    [manager clearConnectData];
    [manager scanPeripherals];
    
    
    
}






#pragma mark - Print Press Handler

-(void)startPrintingReceipt
{
  
  _printerData= [[NSMutableData alloc]init];
   HHPrinterFormat *format = [[HHPrinterFormat alloc] init];

    [self printingQRCodewithText:getQrcodeToPrint];
    NSString *title = [format printTitle:[NSString stringWithFormat:@"TABLE : %@",getTableNoToPrint]];
   [self printerWithFormat:Align_Center CharZoom:Char_Normal Content:title];
    [self appendNewLine];
    [self appendNewLine];
    [self appendNewLine];
    [self appendNewLine];
    [self CuttingCommand];
    



}

// ************ To Print Text *********** //

-(void)printPlainText:(NSString*)getPlainText
{
    [self appendNewLine];
    [self setFontSize];
    [self setText:getPlainText];
    
}

- (void)appendNewLine
{
    Byte nextRowBytes[] = {0x0A};
    [_printerData appendBytes:nextRowBytes length:sizeof(nextRowBytes)];
}

- (void)setFontSize
{
    Byte fontSizeBytes[] = {0x1D,0x21,0x11};
    [_printerData appendBytes:fontSizeBytes length:sizeof(fontSizeBytes)];
}

- (void)setText:(NSString *)text
{
    NSStringEncoding enc = CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingGB_18030_2000);
    NSData *data = [text dataUsingEncoding:enc];
    [_printerData appendData:data];
}

// ************ To Print Text *********** //



// ************ To Print QR Code *********** //

-(void)printingQRCodewithText:(NSString*)getQRText
{
    [self setAlignment];
    [self setQRCodeSize:10];
    [self setQRCodeErrorCorrection:46];
    [self setQRCodeInfo:getQRText];
    [self printStoredQRData];
}


- (void)setAlignment
{
        
    Byte alignBytes[] = {0x1B,0x61,0x01};
    [_printerData appendBytes:alignBytes length:sizeof(alignBytes)];
}

- (void)setQRCodeSize:(NSInteger)size
{
    Byte QRSize [] = {0x1D,0x28,0x6B,0x03,0x00,0x31,0x43,size}; // 10
    //    Byte QRSize [] = {29,40,107,3,0,49,67,size};
    [_printerData appendBytes:QRSize length:sizeof(QRSize)];
}

- (void)setQRCodeErrorCorrection:(NSInteger)level
{
    Byte levelBytes [] = {0x1D,0x28,0x6B,0x03,0x00,0x31,0x45,level}; // 46
    //    Byte levelBytes [] = {29,40,107,3,0,49,69,level};
    [_printerData appendBytes:levelBytes length:sizeof(levelBytes)];
}

- (void)setQRCodeInfo:(NSString *)info
{
    NSInteger kLength = info.length + 3;
    NSInteger pL = kLength % 256;
    NSInteger pH = kLength / 256;
    
    Byte dataBytes [] = {0x1D,0x28,0x6B,pL,pH,0x31,0x50,48};
    //    Byte dataBytes [] = {29,40,107,pL,pH,49,80,48};
    [_printerData appendBytes:dataBytes length:sizeof(dataBytes)];
    NSData *infoData = [info dataUsingEncoding:NSUTF8StringEncoding];
    [_printerData appendData:infoData];
    //    [self setText:info];
}

- (void)printStoredQRData
{
    Byte printBytes [] = {0x1D,0x28,0x6B,0x03,0x00,0x31,0x51,48};
    //    Byte printBytes [] = {29,40,107,3,0,49,81,48};
    [_printerData appendBytes:printBytes length:sizeof(printBytes)];

}

// ************ To Print QR Code *********** //


- (void)endOfPrinting:(CBPeripheral *)peripheral
{
  
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.02 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
       
        NSLog(@"All Text Printed");
        [self->manager duankai:peripheral];
        if([self->printerJob isValid])
        {
            [self->printerJob invalidate];
        }
        
    });
   
}



#pragma mark - Actions

- (BOOL)startScanning {
    
    
    if (CBCentralManagerStatePoweredOn == [mCentralManager state]) {
        [mPeripheralWrappers removeAllObjects];
        [mCentralManager scanForPeripheralsWithServices:nil options:@{ CBCentralManagerScanOptionAllowDuplicatesKey : @YES }];
        [self performSelector:@selector(sacnningDidTimeout) withObject:nil afterDelay:10];
        return YES;
    }
    return NO;
     
    
   
}

- (void)stopScanning {
    [NSObject cancelPreviousPerformRequestsWithTarget:self];
    [mCentralManager stopScan];
    }

- (void)scanningDidFinish {
    [self stopScanning];
}

- (void)sacnningDidTimeout {
    [self stopScanning];
}





- (void)updateData {
    if ([self startScanning]) {
    } else {
        [mPeripheralWrappers removeAllObjects];
       // ALERT(LS(@"BLUETOOTH_POWEROFF_TITLE"), LS(@"BLUETOOTH_POWEROFF_PROMPT"));
    }
}

- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
  
    NSLog(@"state: %ld", (long)[central state]);
    [self updateData];
    [self->manager scanPeripherals];
}


- (void) sendDataTimer:(NSTimer *)timer {//发送打印数据
  
    NSLog(@"Printing data %@",_printerData);
    if(_printerData != nil)
    {
        [manager startPrint:_printerData];
        [_printerData setLength:0];
    }
   

}


#pragma mark - Delegates

- (void) didConnectPeripheral:(CBPeripheral *)peripheral{
    NSLog(@"did Connect Peripheral");
    
    NSLog(@"ok");
}

- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral {//扫描到的设备
    
    if([peripheral.name localizedCaseInsensitiveContainsString:SelectedPrinter])
    {
        [dataArray1 addObject:peripheral];
        selectedPeripheral = [dataArray1 firstObject];
        [manager connectPeripheral:[dataArray1 firstObject]];
    }
    
}


#pragma mark - HP delegates

- (void) printerWithFormat:(Align_Type_e)eAlignType CharZoom:(Char_Zoom_Num_e)eCharZoomNum Content:(NSString *)printContent{
    
    if([SelectedPrinter isEqualToString:@"Xprinter"])
    {
        eCharZoomNum = Char_Normal;
    }
    else
    {
        eCharZoomNum = Char_ZoomOptimuz;
    }
    
    NSData  *data    = nil;
    NSUInteger strLength;
    
    NSStringEncoding enc = CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingGB_18030_2000);
    
    Byte caPrintFmt[500];
    
    /*初始化命令：ESC @ 即0x1b,0x40*/
    //caPrintFmt[0] = 0x1b;
    //caPrintFmt[1] = 0x40;
    
    /*字符设置命令：ESC ! n即0x1b,0x21,n*/
    caPrintFmt[0] = 0x1d;
    caPrintFmt[1] = 0x21;
    //caPrintFmt[0] = 0x1b;
    //caPrintFmt[1] = 0x40;
    caPrintFmt[2] = eCharZoomNum;
  //  caPrintFmt[2] = (eCharZoomNum<<4) | eCharZoomNum;
    caPrintFmt[3] = 0x1b;
    caPrintFmt[4] = 0x61;
    caPrintFmt[5] = eAlignType;
    NSData *printData = [printContent dataUsingEncoding: enc];
    Byte *printByte = (Byte *)[printData bytes];
    
   // Byte fontSizeBytes[] = {0x1D,0x21,0x11};
    
    strLength = [printData length];
    if (strLength < 1) {
        return;
    }
    
    for (int  i = 0; i<strLength; i++) {
        caPrintFmt[6+i] = *(printByte+i);
    }
    
    data = [NSData dataWithBytes:caPrintFmt length:6+strLength];
    [_printerData appendData:data];
    
    
    
}


- (void) printerWithChineseFormat:(Align_Type_e)eAlignType CharZoom:(Char_Zoom_Num_e)eCharZoomNum Content:(NSString *)printContent{
    NSData  *data    = nil;
    NSUInteger strLength;
    
    NSStringEncoding enc = CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingGB_18030_2000);
    
    Byte caPrintFmt[500];
    
    /*初始化命令：ESC @ 即0x1b,0x40*/
    caPrintFmt[0] = 0x1d;
       caPrintFmt[1] = 0x21;
    
    /*字符设置命令：ESC ! n即0x1b,0x21,n*/
   // caPrintFmt[0] = 0x1d;
  //  caPrintFmt[1] = 0x21;
    //caPrintFmt[0] = 0x1b;
    //caPrintFmt[1] = 0x40;
    caPrintFmt[2] = (eCharZoomNum<<4) | eCharZoomNum;
    caPrintFmt[3] = 0x1b;
    caPrintFmt[4] = 0x61;
    caPrintFmt[5] = eAlignType;
    NSData *printData = [printContent dataUsingEncoding: enc];
    Byte *printByte = (Byte *)[printData bytes];
    
    
    
    strLength = [printData length];
    if (strLength < 1) {
        return;
    }
    
    for (int  i = 0; i<strLength; i++) {
        caPrintFmt[6+i] = *(printByte+i);
    }
    
    data = [NSData dataWithBytes:caPrintFmt length:6+strLength];
    
    [sendDataArray addObject:data];
   // [self printLongData:data];
    //[self printData:data];
}



- (void) CutprinterWithFormat:(Align_Type_e)eAlignType CharZoom:(Char_Zoom_Num_e)eCharZoomNum Content:(NSString *)printContent{
    NSData  *data    = nil;
    NSUInteger strLength;
    
    NSStringEncoding enc = CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingGB_18030_2000);
    Byte caPrintFmt[500];
    
    /*初始化命令：ESC @ 即0x1b,0x40*/
    //caPrintFmt[0] = 0x1b;
    //caPrintFmt[1] = 0x40;
    
    /*字符设置命令：ESC ! n即0x1b,0x21,n*/
    caPrintFmt[0] = 0x1d;
    caPrintFmt[1] = 0x21;
    
    NSData *printData = [printContent dataUsingEncoding: enc];
    Byte *printByte = (Byte *)[printData bytes];
    
    strLength = [printData length];
    if (strLength < 1) {
        return;
    }
    
    for (int  i = 0; i<strLength; i++) {
        caPrintFmt[6+i] = *(printByte+i);
    }
    
    data = [NSData dataWithBytes:caPrintFmt length:6+strLength];
    
    [sendDataArray addObject:data];
    //    [self printLongData:data];
    //    [self printData:data];
}




- (void)CuttingCommand{
    unsigned char* cData = (unsigned char *)calloc(100, sizeof(unsigned char));
    NSData* sendData = nil;
    //选中中文指令集
    cData[0] = 0x1b;
    cData[1] = 0x69;
    sendData = [NSData dataWithBytes:cData length:2];
    free(cData);
    [_printerData appendData:sendData];
    
}


@end
