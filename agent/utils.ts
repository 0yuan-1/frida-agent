export function socket(fd: number, socket_addr?: any) {
    var result = "";
    var _type = Socket.type(fd);
    if (_type != null && (_type == "tcp" || _type == "tcp6")) {
        result = result + "type:" + _type;
        var _local = Socket.localAddress(fd);
        if (_local != null) {
            result = result + ",localAddress:" + JSON.stringify(_local);
        } else {
            result = result + ",localAddress: Unkown";
        }
        var _peer = Socket.peerAddress(fd);
        if (_peer) {
            result = result + ",peerAddress:" + JSON.stringify(_peer);
        } else {
            result = result + ",peerAddress: Unkown";
        }
    } else if (_type != null && (_type == "udp" || _type == "udp6")) {
        result = result + "type:" + _type;
        console.log("socket_detaile:\r\n", hexdump(socket_addr, {length: 16}));

        if (socket_addr) {
            var port_ptr = socket_addr.add(2);
            var port: number = ptr(port_ptr).readU8() * 256 + ptr(port_ptr.add(1)).readU8();
            var ip_ptr = socket_addr.add(4);
            var ip = getUdpIp(ip_ptr);

            result = result + ", peerAddress:" + ip + ", port:" + port;
        }
    } else {
        result = result + "type:" + _type;
    }
    console.log("Socket Detailed:" + result);
}

export function getUdpIp(ip: any): string {
    return ptr(ip).readU8() + "." + ptr(ip.add(1)).readU8() + "." + ptr(ip.add(2)).readU8() + "." + ptr(ip.add(3)).readU8();
}

export function TraceArtFunc(target: string): NativePointer | null {
    var addr = null;
    Process.enumerateModules()
        .filter((module) => {
            return module['path'].toLowerCase().indexOf('libart.so') != -1;
        })
        .forEach((m) => {
            // console.log(JSON.stringify(m, null, '  '));
            let symbols = m.enumerateSymbols();
            let map = new Map();
            let fns = [
                "GetStringUTFChars", "NewStringUTF", "FindClass", "GetMethodID",
                "GetMethodID", "GetStaticMethodID", "GetFieldID", "GetStaticFieldID",
                "RegisterNatives", "GetObjectClass"
            ];
            symbols.forEach((symbol) => {
                if (symbol.name.indexOf("art") >= 0
                    && symbol.name.indexOf("JNI") >= 0
                    && symbol.name.indexOf("CheckJNI") < 0) {
                    fns.forEach((fnc) => {
                        if (symbol.name.indexOf(fnc) >= 0)
                            map.set(fnc, symbol.address);
                    });
                }
            });
            addr = map.get(target);
        });
    return addr;
}

export function TraceExports(targets: string[]) {
    Process.enumerateModules().forEach((module) => {
        module.enumerateExports().forEach((symbol) => {
            for (var i = 0; i < targets.length; i++) {
                if (symbol.name == targets[i]) {
                    console.log(JSON.stringify(module), JSON.stringify(symbol));
                    break;
                }
            }
        });
    });
}

export function TraceClasses(targets: string[]) {
    if (Java.available) {
        Java.perform(() => {
            Java.enumerateLoadedClassesSync().forEach(function (clz) {
                targets.forEach((target) => {
                    if (clz.indexOf(target) >= 0)
                        console.log("class name:" + clz);
                });
            });
        });
    }
}

export function TraceMethod(target: string, bTraceStack: boolean) {
    if (Java.available) {
        Java.perform(function () {
            var delim = target.lastIndexOf(".");
            if (delim === -1) {
                return;
            }
            var targetClass = target.slice(0, delim);
            var targetMethod = target.slice(delim + 1, target.length);
            var hook = Java.use(targetClass);
            var overloadCount = hook[targetMethod].overloads.length;
            console.log("traceMethod('" + target + " [" + overloadCount + " overload(s)]");
            for (var i = 0; i < overloadCount; i++) {
                hook[targetMethod].overloads[i].implementation = function () {
                    var retval = this[targetMethod].apply(this, arguments);
                    console.warn("\n*** entered " + target);
                    for (var j = 0; j < arguments.length; j++) {
                        console.log("arg[" + j + "]: " + arguments[j]);
                    }
                    console.log("\nretval: " + retval);
                    bytes2HexString("Method: ", retval);
                    if (bTraceStack) {
                        stacks(target);
                    }
                    console.warn("\n*** exiting " + target);
                    return retval;
                }
            }
        });
    }
}

export function dumpLua(path: string, name: string, buff: NativePointer, size: number) {
    console.log(`store script name - ${path + name}`);
    const file = new File(path, "w+");
    if (file && file != null) {
        console.log("store start");
        const buffer = buff.readByteArray(size);
        if (buffer) {
            file.write(buffer);
            file.flush();
        }
        file.close();
        console.log("store end");
    } else {
        console.error("file open failed!");
    }
}

export function dumpSo(soName: string) {
    if (Java.available) {
        Java.perform(function () {
            console.log("dump enter");
            let currentApplication = Java.use("android.app.ActivityThread").currentApplication();
            let dir = currentApplication.getApplicationContext().getFilesDir().getPath();
            console.log(`dir - ${dir}`);
            let libso = Process.getModuleByName(soName);
            if (libso) {
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
                console.log("dump leave");
                return;
            }
            console.error(`no load ${soName}`);
        });
    } else {
        console.error("Java vm false");
    }
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

export function bytes2HexString(tag: string, bytes: any) {
    if (Java.available) {
        var buffer = Java.array('byte', bytes);
        var content = tag + " length:" + buffer.length + " content:\r\n";
        Java.perform(function () {
            var Integer = Java.use("java.lang.Integer");
            var result = "";
            for (var i = 0; i < buffer.length; ++i) {
                result += "0x" + Integer.toHexString(buffer[i] & 0xFF) + ", ";
                if ((i + 1) % 16 == 0) {
                    result += "\r\n";
                }
            }
            content += result;
            console.log(content);
        });
    }
}

export function bytes2String(bytes: any): string | null {
    var buf = Java.array('byte', bytes);
    var content = "";
    for (var i = 0; i < buf.length; i++) {
        if (buf[i] >= 32 && buf[i] <= 126) {
            content += (String.fromCharCode(buf[i] & 0xff));
        } else {
            content += ".";
        }
    }
    return content;
}

export function enumLoadedClasses(target: string): boolean {
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

export function enumClassLoaders() {
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

export function hook_dlopen(search_so: string | null) {
    const dlopen_f = Module.findExportByName(null, 'dlopen');
    if (dlopen_f) {
        Interceptor.attach(dlopen_f, {
            onLeave: function (ret) {
                return ret;
            },
            onEnter: function (args) {
                const path = args[0].readCString();
                const mode = args[1].toUInt32();

                if (search_so && path?.indexOf(search_so) != -1) {
                    console.log(`[dlopen] path - ${path}, mod - ${mode}`);
                } else if (search_so == null) {
                    console.log(`[dlopen] path - ${path}, mod - ${mode}`);
                }
            }
        });
    }

    const dlopen_ext_f = Module.findExportByName(null, "android_dlopen_ext");
    if (dlopen_ext_f) {
        Interceptor.attach(dlopen_ext_f, {
            onLeave: function (ret) {
                return ret;
            },
            onEnter: function (args) {
                const path = args[0].readCString();
                const mode = args[1].toUInt32();
                if (search_so && path?.indexOf(search_so) != -1) {
                    console.log(`[android_dlopen_ext] path - ${path}, mod - ${mode}`);
                } else if (search_so == null) {
                    console.log(`[android_dlopen_ext] path - ${path}, mod - ${mode}`);
                }
            }
        });
    }
}

export function hook_signature(package_name: string) {
    if (Java.available) {
        Java.perform(function () {
            const proxy = Java.use("android.content.pm.IPackageManager$Stub$Proxy")
            proxy.getPackageInfo.implementation = function (packageName: string, flags: number, userId: number) {
                const ret = this.getPackageInfo(packageName, flags, userId);
                if (packageName.indexOf(package_name) != -1 && flags == 64) {
                    console.log(`[getPackageInfo] packageName - ${packageName},  flags - ${flags}, userId - ${userId}, packageInfo - ${ret}`);
                    const packageInfo_ins = Java.cast(ret, Java.use("android.content.pm.PackageInfo"));
                    const signatures_ins = packageInfo_ins.signatures.value;
                    if (signatures_ins != null) {
                        const signature = Java.cast(signatures_ins[0], Java.use("android.content.pm.Signature"));
                        bytes2HexString("mSignature: ", signature.mSignature.value);
                    }
                }

                return ret;
            }
        });
    }
}

export function show_maps() {
    // @ts-ignore
    const fopen = new NativeFunction(Module.findExportByName(null, "fopen"), 'pointer', ['pointer', 'pointer']);
    // @ts-ignore
    const fclose = new NativeFunction(Module.findExportByName(null, 'fclose'), 'int', ['pointer']);
    // @ts-ignore
    const fgets = new NativeFunction(Module.findExportByName(null, "gets"), 'pointer', ['pointer', 'int', 'pointer']);
    // @ts-ignore
    const feof = new NativeFunction(Module.findExportByName(null, "feof"), 'int', ['pointer']);

    const path = Memory.allocUtf8String("/proc/" + Process.id + "/maps");
    const mode = Memory.allocUtf8String("r");
    let buffer = Memory.alloc(1024);
    buffer.add(1023).writeU8(0);
    const fp = fopen(path, mode);
    console.log(`path - ${path.readCString()}, fp - ${fp}`);
    let eof = 0;
    if (fp != null) {
        while (eof <= 5) {
            eof = eof + 1;
            fgets(buffer, 1023, fp);
            console.log(`line - ${buffer.readCString()}`);
        }
        fclose(fp);
        return;
    }
    console.log(`fopen fail!`);
}


// 未完善
function handleScriptFile() {
    var ScriptEngine_EvalString = Module.findExportByName("libcocos2djs.so", "_ZN2se12ScriptEngine10evalStringEPKclPNS_5ValueES2_");
    console.log(`ScriptEngine_EvalString - ${ScriptEngine_EvalString}`);
    if (ScriptEngine_EvalString) {
        var _ScriptEngine_EvalString = new NativeFunction(ScriptEngine_EvalString, `pointer`, [`pointer`, `pointer`, `long`, `pointer`, `pointer`])
        // void *  ScriptEngine_EvalString_hook(void *thiz, const char *script, long length, void *Rval, const char *fileName)
        Interceptor.replace(_ScriptEngine_EvalString, new NativeCallback(function (thiz, script, length, Rval, fileName) {
            if (fileName != NULL) {
                console.log(`file name - ${fileName.readCString()}`);
            }
            var result = _ScriptEngine_EvalString(thiz, script, length, Rval, fileName);
            return result;
        }, `pointer`, [`pointer`, `pointer`, `long`, `pointer`, `pointer`]));
    }
}