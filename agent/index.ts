import {bytes2HexString, bytes2String, dumpSo, show_maps, stacks} from "./utils";

function hook_java() {
    if (Java.available) {
        Java.perform(function () {
            const proxy = Java.use("android.content.pm.IPackageManager$Stub$Proxy");
            console.log(`proxy - ${proxy}`);
            proxy.getPackageInfo.implementation = function (packageName: string, flags: number, userId: number) {
                const ret = this.getPackageInfo(packageName, flags, userId);
                console.log(`[getPackageInfo] packageName - ${packageName},  flags - ${flags}, userId - ${userId}, packageInfo - ${ret}`);

                const packageInfo = Java.cast(ret, Java.use("android.content.pm.PackageInfo"));
                console.log(`packageInfo - ${packageInfo}`);
                const signatures_value = packageInfo.signatures.value;
                console.log(`signatures_value - ${signatures_value}`);

                if(signatures_value == null)
                {
                    return  ret;
                }

                const signature = Java.cast(signatures_value[0], Java.use("android.content.pm.Signature"));
                const mSignature = signature.mSignature.value;
                console.log(`mSignature - ${bytes2HexString(mSignature)}`);

                return ret;
            }
        });
    }
}

function hook_native() {

}

// frida -U --no-pause -f com.bekko.yld.vivo -l .\_agent.js
// setTimeout(function () {
//     console.log(`\n`);
//     // hook_java();
//     hook_native();
// }, 10);

setImmediate(() => {
    hook_java();
    hook_native();
});