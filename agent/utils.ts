export function dumpLua(path: string, name: string, start: NativePointer, size: number) {
    console.log(`store script name - ${path + name}`);
    const file = new File(path, "w+");
    if (file && file != null) {
        console.log("store start");
        const buffer = start.readByteArray(size);
        if (buffer) {
            file.write(buffer);
            file.flush();
        }
        file.close();
        console.log("store end");
    }
    else {
        console.error("file open failed!");
    }
}

export function dumpSo(soName: string) {
    Java.perform(function () {
        let currentApplication = Java.use("android.app.ActivityThread").currentApplication();
        let dir = currentApplication.getApplicationContext().getFilesDir().getPath();
        console.log(`dir - ${dir}`);
        let libso = Process.getModuleByName(soName);
        console.log(`name - ${libso.name}, base - ${libso.base}, size - ${libso.size}, path - ${libso.path}`);
        let path = dir + "/" + libso.name + "_" + libso.base + "_" + ptr(libso.size) + ".so";
        let file = new File(path, "wb");
        if (file && file != null) {
            Memory.protect(libso.base, libso.size, 'rwx');
            var libso_buffer = libso.base.readByteArray(libso.size);
            if (libso_buffer) {
                file.write(libso_buffer);
                file.flush();
            }
            file.close();
            console.log(`dump - ${path}`);
        }
    });
}

export function storeInfo(path: string, info: string) {
    const file = new File(path, "a+");
    if (file) {
        if (info) {
            console.log("store log start!");
            file.write(info);
            file.flush();
            console.log("store log end!");
        }
        file.close();
        return;
    }
    console.error("file open failed!");
    return;
}

export function storeScript(path: string, buff: NativePointer, len: number) {
    const file = new File(path, "w+");
    if (file) {
        let data = buff.readByteArray(len);
        if (data) {
            console.log("store log start!");
            file.write(data);
            file.flush();
            console.log("store log end!");
        }
        file.close();
        return;
    }
    console.error("file open failed!");
    return;
}

export function stacks(tag: string, context?: CpuContext) {
    const time = getCurTime();
    const pid = Process.getCurrentThreadId().toString();
    // native stacks
    if (context) {
        console.error(`\n[${time}] [${pid}] >>>>>  ${tag} start`);
        console.log(Thread.backtrace(context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\n'));   // Backtracer.FUZZY   Backtracer.ACCURATE
        console.error(`[${time}] [${pid}] >>>>> ${tag} end`);
        return;
    }

    // java stacks
    Java.perform(function () {
        const exception = Java.use("java.lang.Exception");
        const ins = exception.$new("Exception");
        const straces = ins.getStackTrace();
        if (undefined != straces && null != straces) {
            console.error(`\n[${time}] [${pid}] >>>>> ${tag} start`);
            for (var i = 0; i < straces.length; i++) {
                console.log("   " + straces[i].toString());
            }
            console.error(`[${time}] [${pid}] >>>>> ${tag} end`);
        }
        exception.$dispose();
    });
}

export function getCurTime(): string {
    var date = new Date();
    var hour = date.getHours();
    var _hour = (hour < 10) ? "0" + hour : hour;

    var minute = date.getMinutes();
    var _minute = (minute < 10) ? "0" + minute : minute;

    var second = date.getSeconds();
    var _second = (second < 10) ? "0" + second : second;

    var milli_sec = date.getMilliseconds();
    var _milli_sec = (milli_sec < 10) ? "00" + milli_sec : (milli_sec < 100) ? "0" + milli_sec : milli_sec;

    return _hour + ":" + _minute + ":" + _second + ":" + _milli_sec;
}

export function bytes2String(bytes: any): string | null {
    if (bytes == null || bytes == undefined) return null;

    var buf = Java.array('byte', bytes);
    var content = "";

    for (var i = 0; i < buf.length; i++) {
        if (buf[i] >= 32 && buf[i] <= 126) {
            content += (String.fromCharCode(buf[i] & 0xff));
        } else {
            content += ".";
        }
    }

    // console.log(content);
    return content;
}

export function loadClass(target: string): boolean {
    let result = false;
    if (Java.available) {
        Java.perform(function () {
            Java.enumerateLoadedClasses({
                onMatch: function (klass) {
                    if (klass.indexOf(target) != -1) {
                        result = true;
                        console.log(`find ${target}, info - ${klass}`);
                    }
                },
                onComplete: function () {
                    if (!result) {
                        console.error(`find not ${target}`);
                    }
                }
            });
        });
    }

    return result;
}

export function enumClassLoader() {
    if (Java.available) {
        Java.perform(function () {
            console.log(`\ncurrent - loader - ${Java.classFactory.loader}`);
            Java.enumerateClassLoaders({
                onMatch: function (loader) {
                    console.log(`\n`);
                    console.log(`find loader - ${loader}`);

                },
                onComplete: function () {

                }
            });
        });
    }
}

export function enumIntent(intent: any) {
    if (Java.available) {
        var bundle = Java.cast(intent, Java.use("android.content.Intent")).getExtras();
        if (bundle != null) {
            var keys = bundle.keySet();
            var it = keys.iterator();
            while (it.hasNext()) {
                var key = it.next();
                console.log(`\tintent: key - ${key}, value - ${bundle.get(key)}`);
            }
        }
    }
}