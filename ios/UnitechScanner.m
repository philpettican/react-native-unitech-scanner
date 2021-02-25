#import <UnitechScanner.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@implementation UnitechScanner
{
  bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"scanner-barcode"];
}

// RCT_EXPORT_METHOD(getScannerState:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
// {
//   resolve(@NO);
// }

@end
