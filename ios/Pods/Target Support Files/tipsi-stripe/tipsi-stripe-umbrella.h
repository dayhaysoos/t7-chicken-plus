#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "TPSCardField.h"
#import "TPSCardFieldManager.h"
#import "TPSError.h"
#import "TPSStripeManager.h"

FOUNDATION_EXPORT double tipsi_stripeVersionNumber;
FOUNDATION_EXPORT const unsigned char tipsi_stripeVersionString[];

