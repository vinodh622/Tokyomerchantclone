// RCTCalendarModule.m
#import "RNtest1.h"
#import <React/RCTLog.h>

@implementation RNtest1

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();



RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end

