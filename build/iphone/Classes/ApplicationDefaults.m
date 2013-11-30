/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"SQe4QAwc2GRw4ajM0U1pNeItANjmoQbx"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"pxa1fKVxVIJ4PLQgoDzhrhx4T2moYLAm"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"O48nLnNTyW4XUASW84dTTXfjrX1UB9Cu"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"aRtUHbTDJGB9tvWQ4J93SWlaN3sCl9GQ"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"PdcPFgAzNy05x0PzYa0CqzUiy1tSFSXw"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"ocNKDnUWv33asdUnybmZhCkyEbl01hzK"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"mqtt"] forKey:@"acs-push-type-development"];
	[_property setObject:[TiUtils stringValue:@"mqtt"] forKey:@"acs-push-type-production"];
	[_property setObject:[TiUtils stringValue:@"mqtt"] forKey:@"acs-push-type"];
	[_property setObject:[NSNumber numberWithInt:[TiUtils intValue:@"32768"]] forKey:@"ti.android.threadstacksize"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

+ (NSDictionary*) launchUrl {
    static BOOL launched = NO;
    if (!launched) {
        launched = YES;
        return nil;
    } else { return nil;}
}
 
@end