//
//  BLPrinterManager.h
//  ioscall
//
//  Created by Raja on 13/04/2021.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "UIImage+Splitting.h"
#import "UIImage+Compress.h"
#import "HHPrinterFormat.h"
#import "ImageProcessor.h"
#import <objc/runtime.h>
#import <CoreBluetooth/CoreBluetooth.h>
#import "HHBluetoothPrinterManager.h"
#import <QuartzCore/QuartzCore.h>

NS_ASSUME_NONNULL_BEGIN

typedef  enum {
    Align_Left = 0X00,
    Align_Center,
    Align_Right,
}Align_Type_e;
//0x11 is OK big medium
//0x81 is OK medium
typedef  enum {
    Char_Normal = 0x10,
    Char_Zoom_2,
    Char_Zoom_3,
    Char_Zoom_4,
    Char_ZoomOptimuz = 0x81,
}Char_Zoom_Num_e;


typedef  enum {
    TICKET_SALE = 1,
    TICKET_CARD,
}TYPE_TICKET;

#define MAX_CHARACTERISTIC_VALUE_SIZE   32
#define MAX_HEIGHT_SUB_IMAGE            30
#define WIDTH_58                        384

@interface BLPrinterManager : NSObject<CBCentralManagerDelegate,CBPeripheralDelegate,HHBluetoothPrinterManagerDelegate, ImageProcessorDelegate>
{
  CBCentralManager *mCentralManager;
  CBPeripheral *mConnectedPeripheral;
  NSMutableArray *mPeripheralWrappers;
  CBCharacteristic *mTransferCharacteristic;
  NSData *mSendingData;
  CBCharacteristic *mNotifingCharacteristic;
  NSMutableData *mCachingData;
  NSMutableString *mReceivedText;
  int mReceivedBytes;
  int mSentBytes;
  int mReceivedCount;
  int mSentCount;
  
  
  HHBluetoothPrinterManager *manager;
  //选中的设备
  CBPeripheral *selectedPeripheral;
  NSMutableArray *dataArray1;
  NSMutableArray *sendDataArray;
  NSArray *PrintersArray;
  NSString *SelectedPrinter;
  
  NSString *getQrcodeToPrint;
  NSString *getTableNoToPrint;
    
    int totalLines;
    int currentLine;
    NSTimer *printerJob;
    

}

@property (strong, nonatomic)   NSMutableData            *printerData;


-(void)passMyPrintingValue;
-(void)initwithBLEName:(NSString*)getPrinterName withQrCodeString:(NSString*)getQrCodeString withTableNoString:(NSString*)getTableNoString;

@end

NS_ASSUME_NONNULL_END
