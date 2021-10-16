//
//  TaskManager.m
//  ioscall
//
//  Created by Raja on 13/04/2021.
//

#import "TaskManager.h"
#import <React/RCTLog.h>
#import "HHPrinterFormat.h"
#import "BLPrinterManager.h"
#import "NetPrinterManager.h"

@implementation TaskManager

RCT_EXPORT_MODULE();



RCT_EXPORT_METHOD(initwithIpAddress: (NSString *)getipAddress withPortNumber:(NSString *)getPortNumber withQrCodeString:(NSString *)getQrCodeString withTableNoString:(NSString *)getTableNoString) {
  //function's content
  
  dispatch_async(dispatch_get_main_queue(), ^(void){
   
      [[NetPrinterManager alloc]initWithQrValue:@"futureUse" withIpaddress:getipAddress withPortNumber:getPortNumber withQrCodeString:getQrCodeString withTableNoString:getTableNoString];
    
      });
  
 
}


RCT_EXPORT_METHOD(initwithBLEName: (NSString *)getPrinterName withQrCodeString:(NSString *)getQrCodeString withTableNoString:(NSString *)getTableNoString) {
  //function's content
  
  dispatch_async(dispatch_get_main_queue(), ^(void){
   
      [[BLPrinterManager alloc]initwithBLEName:getPrinterName withQrCodeString:getQrCodeString withTableNoString:getTableNoString];
    
      });
  
}


- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventA", @"EventB"];
}

@end
