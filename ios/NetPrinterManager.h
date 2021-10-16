//
//  NetPrinterManager.h
//  ioscall
//
//  Created by Raja on 15/04/2021.
//

#import <Foundation/Foundation.h>
#import "RJAsyncSocket.h"
#import "IGThermalSupport.h"

NS_ASSUME_NONNULL_BEGIN

@interface NetPrinterManager : NSObject
{
    RJAsyncSocket *asyncSocket;
    UIImage *generatedQRcodeImg;
}

-(void)initWithQrValue:(NSString*)QrValue withIpaddress:(NSString*)getIpAddress withPortNumber:(NSString*)getPortNumber withQrCodeString:(NSString*)getQrCodeString withTableNoString:(NSString*)getTableNoString;
@end

NS_ASSUME_NONNULL_END
