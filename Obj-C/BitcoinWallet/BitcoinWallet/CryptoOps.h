//******************************************************************************
//
// Copyright (c) 2016 Microsoft Corporation. All rights reserved.
//
// This code is licensed under the MIT License (MIT).
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
//******************************************************************************

#ifndef CryptoOps_h
#define CryptoOps_h

#import <Foundation/Foundation.h>
#import <Foundation/Foundation.h>
#include <stdio.h>
#include <string.h>
#include "uECC.h"
#import "AddressManager.h"
#include "DEREncoder.h"

@interface CryptoOps : NSObject

+ (NSString*)signData:(NSString*)privBytes withAddress:(NSString*)tag;
+ (NSData*)hexEncodedHashToData:(NSString*)data;
+ (NSData*)hexEncodedStringToData:(NSString*)test;
+ (NSString*)dataToHexEncodedString:(NSData*)test;


@end



#endif /* CryptoOps_h */
