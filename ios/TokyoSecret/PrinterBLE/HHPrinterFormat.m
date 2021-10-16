//
//  HHPrinterFormat.m
//  BlueToothPrinterT
//
//  Created by hxy on 16/1/17.
//  Copyright © 2016年 huangxinyu. All rights reserved.
//

#import "HHPrinterFormat.h"

//一行最大数量
static const NSInteger LineByteSize = 32;

@interface HHPrinterFormat ()


@property (nonatomic, strong, readwrite) NSMutableString* contentString;

@end

@implementation HHPrinterFormat

- (instancetype)init
{
    self = [super init];
    if (self) {
    }
    return self;
}

- (NSString *)printTitle:(NSString *)title
{
    self.contentString = [NSMutableString new];
    [self.contentString appendString:@"\n\n"]; //抬头留白
    [self.contentString appendString:title];
    [self.contentString appendFormat:@"\n"];
    return [self.contentString copy];
}

- (NSString *)printOrderMsg:(NSDictionary<NSString *,NSString *> *)msgDic
{
    self.contentString = [NSMutableString new];
    [self.contentString appendString:@"\n"];
    for (NSInteger idx = 0; idx < 32; ++idx) {
        [self.contentString appendString:@"="];
    }
    [self.contentString appendString:@"\n"];
    
    return [self printMiddleMsg:msgDic];
}

- (NSString *)printMenuMsg:(NSDictionary<NSString *,NSDictionary *> *)menuMsgDic isHead:(BOOL)isHead
{
    self.contentString = [NSMutableString new];
    if (isHead) {
        [self.contentString appendString:@"\n"];
        for (NSInteger idx = 0; idx < 32; ++idx) {
            [self.contentString appendString:@"-"];
        }
        [self.contentString appendString:@"\n"];
    }
    
    [menuMsgDic enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, NSDictionary * _Nonnull obj, BOOL * _Nonnull stop) {
        [self.contentString appendString:key];
        [self.contentString appendString:@"\n"];
        [obj enumerateKeysAndObjectsUsingBlock:^(NSString*  _Nonnull key, NSString*  _Nonnull obj, BOOL * _Nonnull stop) {
            [self.contentString appendString:key];
            for (NSInteger idx = key.length; idx < LineByteSize - key.length - obj.length; ++idx) {
                [self.contentString appendString:@" "];
            }
            [self.contentString appendString:obj];
        }];
        [self.contentString appendString:@"\n"];
    }];
    return [self.contentString copy];
}

- (NSString *)printMenu:(NSString *)index title:(NSString *)title price:(NSString *)price isHead:(BOOL)isHead {
    self.contentString = [NSMutableString new];
    NSUInteger priceSpace = 10;
    if (isHead) {
        [self.contentString appendString:@"\n"];
        for (NSInteger idx = 0; idx < 32; ++idx) {
            [self.contentString appendString:@"-"];
        }
        [self.contentString appendString:@"\n"];
    }
    [self.contentString appendFormat:@"%@ ", index];
    if (title.length > LineByteSize - (index.length + priceSpace + 3)) {
        NSUInteger subTitleIndex = LineByteSize - (index.length + priceSpace + 3);
        [self.contentString appendFormat:@"%@ %@\n", [title substringToIndex:subTitleIndex], price];
        price = [price substringFromIndex:subTitleIndex];
    }
    
    while (title.length > LineByteSize - (index.length + priceSpace + 3)) {
        NSMutableString *newLine = [NSMutableString new];
        for (NSUInteger idx = 0; idx < index.length + 1; idx++) {
            [newLine appendString:@" "];
        }
        NSUInteger subTitleIndex = LineByteSize - (index.length + priceSpace + 3);
        NSString *subTitle = [title substringToIndex:subTitleIndex];
        [newLine appendString:subTitle];
        for (NSUInteger idx = newLine.length; idx < LineByteSize; idx++) {
            [newLine appendString:@" "];
        }
        [newLine appendString:@"\n"];
        [self.contentString appendString:newLine];
    }
    
    return [self.contentString copy];
}

- (NSString *)printPriceMsg:(NSDictionary<NSString*,NSString*>*)msgDic isHead:(BOOL)isHead AddedString:(NSMutableString*)AddedString {
    self.contentString = [NSMutableString new];
    /*
    if (isHead) {
        for (NSInteger idx = 0; idx < 32; ++idx) {
            [self.contentString appendString:@"-"];
        }
        [self.contentString appendString:@"\n"];
    }
    
    [msgDic enumerateKeysAndObjectsUsingBlock:^(NSString*  _Nonnull key, NSString*  _Nonnull obj, BOOL * _Nonnull stop) {
        [self.contentString appendString:key];
        for (NSInteger idx = 0; idx < LineByteSize - key.length - obj.length - 2; ++idx) {
            [self.contentString appendString:@" "];
        }
        [self.contentString appendString:obj];
        [self.contentString appendString:@"\n"];
    }];
     */
    
    return [AddedString copy];
}

- (NSString *)printAddressMsg:(NSDictionary<NSString *,NSString *> *)msgDic isHead:(BOOL)isHead
{
    self.contentString = [NSMutableString new];
    if (isHead) {
        for (NSInteger idx = 0; idx < 32; ++idx) {
            [self.contentString appendString:@"-"];
        }
    }
    
    [msgDic enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, NSString * _Nonnull obj, BOOL * _Nonnull stop) {
        NSString* keyValue = [key stringByAppendingString:@": "];
        [self.contentString appendString:keyValue];
        //如果文字加起来大于最大字符，则要求obj换行
        
        if (keyValue.length + obj.length > LineByteSize) {
            while (keyValue.length + obj.length > LineByteSize) {
                NSInteger length = LineByteSize - keyValue.length; //可显示的字符
                NSString* newValue = [obj substringToIndex:length];
                [self.contentString appendString:newValue];
                [self.contentString appendString:@"\n"];
                for (NSInteger idx = 0; idx < keyValue.length; ++idx) {
                    [self.contentString appendString:@" "];
                }
                obj = [obj substringFromIndex:length];
            }
        }else
        {
            [self.contentString appendString:obj];
        }
        [self.contentString appendString:@"\n"];
    }];
    
    return [self.contentString copy];
}

- (NSString *)printBarCode:(NSString *)barString {
    return nil;
}

- (NSString *)printLinePace
{
    self.contentString = [NSMutableString new];
    [self.contentString appendFormat:@"\n"];
    for (NSInteger idx = 0; idx < 32; ++idx) {
        [self.contentString appendString:@"-"];
    }
    return [self.contentString copy];
}



#pragma mark - 私有方法
/**
 *  排版内容
 *
 *  @param middleMsgDic 内容字典
 *  如:姓名：某某某
 *     苹果：5斤
 *
 *  @return 返回排版后的文字
 */
- (NSString *)printMiddleMsg:(NSDictionary<NSString *,NSString *> *)middleMsgDic
{
    [middleMsgDic enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, NSString * _Nonnull obj, BOOL * _Nonnull stop) {
        [self.contentString appendString:key];
        [self.contentString appendString:@": "];
        [self.contentString appendString:obj];
        [self.contentString appendString:@"\n\n"];
    }];
    
    
    return [self.contentString substringToIndex:self.contentString.length - 2];
}


@end
