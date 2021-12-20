import { bytes2String, dumpSo, enumIntent, stacks, storeInfo } from "./utils";

function f00() {
    if (Java.available) {
        Java.perform(function () {
            // 开启日志
            var klass = Java.use("com.cmic.sso.sdk.d.c");
            if (klass) {
                klass.b.implementation = function (p0: string, p1: string) {
                    var logFlag = this._b.value;
                    console.log(`c.b: logFlag - ${logFlag}`);
                    if (logFlag == false) {
                        this.a(true);
                        console.log(`c.b: logFlag - ${this._b.value}`);
                    }
                    this.b(p0, p1);
                }
            }

            klass = Java.use("anet.channel.strategy.dispatch.e");
            if (klass) {
                // klass.a.overload('anet.channel.strategy.dispatch.IAmdcSign', 'java.util.Map').implementation = function (p0: object, p1: object) {
                //     stacks("anet.channel.strategy.dispatch.e.a");
                //     var result = this.a(p0, p1);
                //     console.log(`[anet.channel.strategy.dispatch.e.a] result - ${result}`);
                //     return result;
                // }
            }

            klass = Java.use("anet.channel.c");
            if (klass) {
                // klass.sign.implementation = function (p0: string) {
                //     stacks("anet.channel.c.sign");
                //     var result = this.sign(p0);
                //     var Appkey = this._a;
                //     console.log(`[anet.channel.c.sign] p0 - ${p0}`);
                //     console.log(`[anet.channel.c.sign] Appkey - ${Appkey}`);
                //     console.log(`[anet.channel.c.sign] result - ${result}`);
                //     return result;
                // }
            }
            klass = Java.use("gsdk.library.wrapper_account.vj");
            if (klass) {
                // klass.a.overload('java.util.List').implementation = function (p0: object) {
                //     var result = this.a(p0);
                //     console.log(`[gsdk.library.wrapper_account.vj.a] result - ${result}`);
                //     return result;
                // }
            }
            klass = Java.use("gsdk.library.wrapper_account.gf");
            if (klass) {
                // klass.a.overload('java.util.List').implementation = function (p0: object) {
                //     var result = this.a(p0);
                //     console.log(`[gsdk.library.wrapper_account.gf.a] result - ${result}`);
                //     return result;
                // }
            }

            klass = Java.use("gsdk.library.wrapper_share.ag");
            if (klass) {
                // klass.a.overload('java.lang.String').implementation = function (p0: string) {
                //     stacks("[gsdk.library.wrapper_share.ag.a] string");
                //     var result = this.a(p0);
                //     // console.log(`[gsdk.library.wrapper_share.ag] string: p0 - ${p0}, result - ${gson.$new().toJson(result)}`);
                //     console.log(`[gsdk.library.wrapper_share.ag.a] string: p0 - ${p0}`);
                //     console.log(`[gsdk.library.wrapper_share.ag.a] string: result - ${result}`);
                //     return result;
                // }
                // klass.a.overload('gsdk.library.wrapper_share.ag').implementation = function (p0: object) {
                //     stacks("[gsdk.library.wrapper_share.ag] ag");
                //     var result = this.a(p0);
                //     // console.log(`[gsdk.library.wrapper_share.ag] ag: p0 - ${gson.$new().toJson(p0)}, result - ${result}`);
                //     console.log(`[gsdk.library.wrapper_share.ag.a] ag: p0 - ${p0}`);
                //     console.log(`[gsdk.library.wrapper_share.ag.a] ag: result - ${result}`);
                //     return result;
                // }
            }

            klass = Java.use("com.tencent.mm.opensdk.openapi.WXAPIFactory");
            if (klass) {
                // klass.createWXAPI.overload('android.content.Context', 'java.lang.String', 'boolean', 'int').implementation = function (p0: object, p1: string, p2: boolean, p3: number) {
                //     // stacks("WXAPIFactory.createWXAPI");
                //     console.log(`WXAPIFactory.createWXAPI: checkSignature - ${p2}`);
                //     var result = this.createWXAPI(p0, p1, false, p3);
                //     console.log(`WXAPIFactory.createWXAPI: result - ${result}`);
                //     return result;
                // }
            }

            klass = Java.use("com.tencent.mm.opensdk.channel.a.a");
            if (klass) {
                // klass.a.overload('java.lang.String', 'int', 'java.lang.String').implementation = function (p0: string, p1: number, p2: string) {
                //     stacks("a.a");
                //     console.log(`p0 - ${p0}, p1 - ${p1}, p2 - ${p2}`);
                //     var result = this.a(p0, p1, p2);
                //     console.log("result :" + bytes2String(result));
                //     return result;
                // }
            }

            klass = Java.use("android.content.ContentResolver");
            if (klass) {
                // klass.insert.implementation = function (p0: object, p1: object) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentResolver.insert: p0 - ${p0}, p1 - ${p1}`);
                //     var result = this.insert(p0, p1);
                //     console.log(`ContentResolver.insert: result - ${result}`);
                //     return result;
                // }
                // klass.query.overload('android.net.Uri', '[Ljava.lang.String;', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String').implementation = function (p0: object, p1: string[], p2: string, p3: string[], p4: string) {
                //     // stacks("ContentResolver.query");
                //     console.log(`ContentResolver.query: p0 - ${p0}, p1 - ${p1}, p2 - ${p2}, p3 - ${p3}, p4 - ${p4}`);
                //     var result = this.query(p0, p1, p2, p3, p4);
                //     console.log(`ContentResolver.query: result - ${result}`);
                //     return result;
                // }
                // klass.update.implementation = function (p0: object, p1: object, p2: string, p3: string[]) {
                //     // stacks("ContentResolver.update");
                //     console.log(`ContentResolver.update: p0 - ${p0}, p1 - ${p1}, p2 - ${p2}, p3 - ${p3}`);
                //     var result = this.update(p0, p1, p2, p3);
                //     console.log(`ContentResolver.update: result - ${result}`);
                //     return result;
                // }
            }

            klass = Java.use("android.content.ContentValues");
            if (klass) {
                // klass.put.overload('java.lang.String', 'java.lang.Boolean').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', 'java.lang.Byte').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', 'java.lang.Double').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', 'java.lang.Float').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', 'java.lang.Integer').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', 'java.lang.Long').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', 'java.lang.Short').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', 'java.lang.String').implementation = function (p0: string, p1: string) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
                // klass.put.overload('java.lang.String', '[B').implementation = function (p0: string, p1: any) {
                //     // stacks("ContentResolver.insert");
                //     console.log(`ContentValues.put: p0 - ${p0}, p1 - ${p1.toString()}`);
                //     return this.put(p0, p1);
                // }
            }

            klass = Java.use("android.net.Uri");
            if (klass) {
                // klass.parse.implementation = function (p0: string) {
                //     // stacks("ContentResolver.insert");
                //     var result = this.parse(p0);
                //     if (p0.indexOf("com.tencent.mm.sdk.comm.provider") != -1) {
                //         console.log(`Uri.parse: p0 - ${p0}`);
                //         console.log(`Uri.parse: result - ${result}`);
                //     }
                //     return result;
                // }
            }

            klass = Java.use("com.ss.android.pushmanager.setting.PushMultiProcessSharedProvider$a");
            if (klass) {
                // klass.a.overload('java.lang.String').implementation = function (p0: string) {
                //     console.log("PushMultiProcessSharedProvider$a.a  string: p0 - " + p0);
                //     return this.a(p0);
                // }
                // klass.a.overload('java.lang.String', 'float').implementation = function (p0: string, p1: number) {
                //     console.log("PushMultiProcessSharedProvider$a.a  string-float： p0 - " + p0 + ", p1 - " + p1.toString());
                //     return this.a(p0, p1);
                // }
                // klass.a.overload('java.lang.String', 'int').implementation = function (p0: string, p1: number) {
                //     console.log("PushMultiProcessSharedProvider$a.a  string-int: p0 - " + p0 + ", p1 - " + p1.toString());
                //     return this.a(p0, p1);
                // }
                // klass.a.overload('java.lang.String', 'long').implementation = function (p0: string, p1: number) {
                //     console.log("PushMultiProcessSharedProvider$a.a  string-long: p0 - " + p0 + ",p1 - " + p1.toString());
                //     return this.a(p0, p1);
                // }
                // klass.a.overload('java.lang.String', 'java.lang.String').implementation = function (p0: string, p1: number) {
                //     console.log("PushMultiProcessSharedProvider$a.a  string-string: p0 - " + p0 + ",p1 - " + p1);
                //     return this.a(p0, p1);
                // }
                // klass.a.overload('java.lang.String', 'boolean').implementation = function (p0: string, p1: number) {
                //     console.log("PushMultiProcessSharedProvider$a.a  string-bool: p0 - " + p0 + ",p1 - " + p1);
                //     return this.a(p0, p1);
                // }
            }

            klass = Java.use("com.tencent.mm.opensdk.openapi.WXApiImplComm");
            if (klass) {
                // klass.validateAppSignature.implementation = function (p0: object, p1: object[], p2: boolean) {
                //     console.log(`validateAppSignature: p2 - ${p2}`);
                //     var result = this.validateAppSignature(p0, p1, false);
                //     console.log(`validateAppSignature: result - ${result}`);
                //     return result;
                // }
                // klass.validateAppSignatureForPackage.implementation = function (p0: object, p1: string, p2: boolean) {
                //     console.log(`validateAppSignatureForPackage: p1- ${p1}, p2 - ${p2}`);
                //     var result = this.validateAppSignatureForPackage(p0, p1, false);
                //     console.log(`validateAppSignatureForPackage: result - ${result}`);
                //     return result;
                // }
                // klass.isIntentFromWx.implementation = function (p0: object, p1: string) {
                //     // stacks("WXApiImplComm.isIntentFromWx");
                //     console.log(`isIntentFromWx: p1 - ${p1}`);
                //     var result = this.isIntentFromWx(p0, p1);
                //     console.log(`isIntentFromWx: result - ${result}`);
                //     return result;
                // }
            }

            klass = Java.use("android.content.Intent");
            if (klass) {
                // klass.getStringExtra.implementation = function (p0: string) {
                //     var result = this.getStringExtra(p0);
                //     console.log(`getStringExtra: p0 - ${p0}， result - ${result}`);
                //     return result;
                // }
                // klass.putExtra.overload('java.lang.String', 'java.lang.String').implementation = function (p0: string, p1: string) {
                //     console.log(`Intent.putExtra: p0 - ${p0}, p1 - ${p1}`);
                //     return this.putExtra(p0, p1);
                // }
                // klass.putExtra.overload('java.lang.String', '[B').implementation = function (p0: string, p1: any) {
                //     console.log(`Intent.putExtra: p0 - ${p0}, p1 - ${bytes2String(p1)}`);
                //     return this.putExtra(p0, p1);
                // }
                // klass.putExtra.implementation = function (p0: string, p1: any) {
                //     console.log(`Intent.putExtra: p0 - ${p0}, p1 - ${p1}`);
                //     return this.putExtra(p0, p1);
                // }
            }

            klass = Java.use("com.tencent.mm.opensdk.modelbase.BaseReq");
            if (klass) {
                // klass.getType.implementation = function () {
                //     var result = this.getType();
                //     console.log(`getType: result - ${result}`);
                //     return result;
                // }
            }

            klass = Java.use("android.os.Bundle");
            if (klass) {
                // klass.getString.overload('java.lang.String').implementation = function (p0: string) {
                //     var result = this.getString(p0);
                //     console.log(`Bundle.getString:  p0 - ${p0}, result - ${result}`);
                //     return result;
                // }
                // klass.putString.overload('java.lang.String', 'java.lang.String').implementation = function (p0: string, p1: string) {
                //     console.log(`Bundle.putString:  p0 - ${p0}, p1 - ${p1}`);
                //     return this.putString(p0, p1);
                // }
            }
        });
    }
}

function sendIntent() {
    if (Java.available) {
        Java.perform(() => {
            var klass = Java.use("com.tencent.mm.opensdk.channel.MMessageActV2");
            if (klass) {
                klass.send.implementation = function (p0: object, p1: any) {
                    // stacks("MMessageActV2.send");
                    var args = Java.cast(p1, Java.use("com.tencent.mm.opensdk.channel.MMessageActV2$Args"));
                    var bundle = args.bundle.value;
                    var content: string = args.content.value;
                    var flags: number = args.flags.value;
                    var launchMode: number = args.launchMode.value;
                    var targetClassName: string = args.targetClassName.value;
                    var targetPkgName: string = args.targetPkgName.value;
                    var token: string = args.token.value;
                    console.log(`bundle - ${bundle}\n content - ${content}\n flags - ${flags}\n launchMode - ${launchMode}\n targetClassName - ${targetClassName}\n targetPkgName - ${targetPkgName}\n token - ${token}`);
                    var result = this.send(p0, p1);
                    console.log(`[MMessageActV2.send] result - ${result}`);
                    return result;
                }
                klass.sendUsingPendingIntent.implementation = function (p0: object, p1: any) {
                    // stacks("MMessageActV2.sendUsingPendingIntent");
                    console.log(`MMessageActV2.sendUsingPendingIntent: context - ${p0}, intent - ${p1}`);
                    enumIntent(p1);
                    return this.sendUsingPendingIntent(p0, p1);
                }
            }
        });
    }
}

function hookPackageName() {
    if (Java.available) {
        Java.perform(() => {
            var klass = Java.use("android.content.Intent");
            if (klass) {
                klass.putExtra.overload('java.lang.String', 'java.lang.String').implementation = function (p0: string, p1: string) {
                    if (p0.indexOf("_mmessage_appPackage") != -1 && p1.indexOf("com.hermes.wl.gg") != -1) {
                        // console.log(`_mmessage_appPackage - ${p1}`);
                        var myStr = Java.use("java.lang.String").$new("com.hermes.wl");
                        return this.putExtra(p0, myStr);
                    }
                    return this.putExtra(p0, p1);
                }
            }
        });
    }
}


function handleIntent() {
    if (Java.available) {
        Java.perform(function () {
            var klass = Java.use("com.tencent.mm.opensdk.openapi.BaseWXApiImplV10");
            if (klass) {
                // klass.$init.implementation = function (p0: object, p1: string, p2: boolean, p3: number) {
                //     // stacks("BaseWXApiImplV10.init");
                //     console.log(`BaseWXApiImplV10.init: checkSignature - ${p2}`);
                //     return this.$init(p0, p1, false, p3);
                // }
                // klass.getTokenFromWX.implementation = function (p0: object) {
                //     // stacks("BaseWXApiImplV10.getTokenFromWX");
                //     var result = this.getTokenFromWX(p0);
                //     console.log(`BaseWXApiImplV10.getTokenFromWX: result - ${result}`);
                //     return result;
                // }
                // klass.sendReq.implementation = function (p0: object) {
                //     // stacks("BaseWXApiImplV10.sendReq");
                //     console.log(`BaseWXApiImplV10.sendReq: p0 - ${p0}`);
                //     var result = this.sendReq(p0);
                //     console.log(`BaseWXApiImplV10.sendReq: result - ${result}`);
                //     return result;
                // }
                // klass.checkSumConsistent.implementation = function (p0: object, p1: object) {
                //     stacks("BaseWXApiImplV10.checkSumConsistent");
                //     var result = this.checkSumConsistent(p0, p1);
                //     console.log(`checkSumConsistent: result - ${result}`);
                //     return result;
                // }
                klass.handleIntent.implementation = function (p0: any, p1: any) {
                    // stacks("BaseWXApiImplV10.handleIntent");
                    console.log(`BaseWXApiImplV10.handleIntent: p0 - ${p0}, p1 - ${p1}`);
                    enumIntent(p0);
                    var _bundle = Java.cast(p0, Java.use("android.content.Intent")).getExtras();
                    var bundle = Java.cast(_bundle, Java.use("android.os.Bundle"));
                    console.log(`handleIntent: bundle - ${bundle}, err_code - ${bundle.getInt("_wxapi_baseresp_errcode")}`);
                    var result = this.handleIntent(p0, p1);
                    console.log(`handleIntent: result - ${result}`);
                    return result;
                }

            }

            klass = Java.use("com.bytedance.ug.sdk.share.channel.wechat.view.BaseWXEntryActivity");
            if (klass) {
                klass.onResp.implementation = function (p0: any) {
                    // stacks("BaseWXEntryActivity.onResp");
                    console.log(`BaseWXEntryActivity.onResp: p0 - ${p0}`);
                    var SendMessageToWX = Java.cast(p0, Java.use("com.tencent.mm.opensdk.modelmsg.SendMessageToWX$Resp"));
                    var errCode: number = SendMessageToWX.errCode.value;
                    var errStr: string = SendMessageToWX.errStr.value;
                    console.log(`BaseWXEntryActivity.onResp: errCode - ${errCode}, errStr - ${errStr}`);
                    return this.onResp(p0);
                }
            }

            klass = Java.use("gsdk.impl.share.DEFAULT.e");
            if (klass) {
                klass.onShareResultEvent.implementation = function (p0: any) {
                    // stacks("e.onShareResultEvent");
                    var result = Java.cast(p0, Java.use("gsdk.library.wrapper_share.u"));
                    console.log(`e.onShareResultEvent: flag - ${result.ag.value}, err_code - ${result.ah.value}`);
                    // result.ag.value = 10000;
                    // result.ah.value = 0;
                    // console.log(`e.onShareResultEvent: flag - ${result.ag.value}, err_code - ${result.ah.value}`);
                    var retV = this.onShareResultEvent(p0);
                    console.log(`e.onShareResultEvent: flag - ${result.ag.value}, err_code - ${result.ah.value}`);
                    return retV;
                }
            }

            klass = Java.use("com.bytedance.ttgame.module.share.bridge.ShareModule$ShareEventCallback");
            if (klass) {
                // klass.onShareResultEvent.implementation = function (p0:object) {
                //     stacks("ShareModule$ShareEventCallback.onShareResultEvent");
                //     console.log(`ShareModule$ShareEventCallback.onShareResultEvent: p0 - ${p0}`);
                //     return this.onShareResultEvent(p0);;
                // }
            }
        });
    }
}


function handleUrl() {
    if (Java.available) {
        Java.perform(function () {
            var klass = Java.use("gsdk.library.wrapper_share.b");
            if (klass) {
                klass.a.implementation = function (p0: object, p1: object, p2: string, p3: string) {
                    console.log(`b.a: p2 - ${p2}, p3 - ${p3}`);
                    var result = this.a(p0, p1, p2, p3);
                    console.log(`b.a: result - ${result}`);
                    return result;
                }
            }
            klass = Java.use("com.bytedance.sdk.open.aweme.common.model.BaseReq");
            if (klass) {
                klass.getCallerPackage.implementation = function () {
                    var result:string = this.getCallerPackage();
                    if (result.indexOf("gg") != -1) {
                        console.log(`BaseReq.getCallerPackage: result - ${result}`);
                        return Java.use("java.lang.String").$new("com.hermes.wl");
                    }
                    return result;
                }
            }
        });
    }
}

setImmediate(() => {
    console.log("\n");
    // f00();
    // handleIntent();
    // sendIntent();
    // hookPackageName();
    // handleUrl();

    // setTimeout(function () {
    //     f00();
    //     f01();
    // }, 3000);
})