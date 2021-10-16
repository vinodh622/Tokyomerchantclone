//
//  NetPrinterManager.m
//  ioscall
//
//  Created by Raja on 15/04/2021.
//

#import "NetPrinterManager.h"
#import "FileManager.h"
#import "Barcode.h"


@implementation NetPrinterManager

-(void)initWithQrValue:(NSString*)QrValue withIpaddress:(NSString*)getIpAddress withPortNumber:(NSString*)getPortNumber withQrCodeString:(NSString*)getQrCodeString withTableNoString:(NSString*)getTableNoString
{
  
  
  dispatch_queue_t mainQueue = dispatch_get_main_queue();
  asyncSocket = [[RJAsyncSocket alloc] initWithDelegate:self delegateQueue:mainQueue];
  
  NSError *error = nil;
  if (![asyncSocket connectToHost:getIpAddress onPort:9100 error:&error withQrCode:getQrCodeString withTableNo:getTableNoString])
  {
      NSLog(@"error connect to IP Address");   
  }
  else
  {
     NSLog(@"connected to IP Address");
  }
    
  
}




@end
