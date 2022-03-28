import {dumpSo, stacks} from "./utils";

function hook_java() {
    console.log(`hook java enter!`);
    if (Java.available) {
        Java.perform(function () {
        });
    }
    console.log(`hook java end!`);
}

function hook_native() {
    console.log(`hook native enter!`);
    const dlopen_f = Module.findExportByName(null, 'dlopen');
    if (dlopen_f) {
        Interceptor.attach(dlopen_f, {
            onLeave: function (ret) {
                if (this.isHook == 1) {
                    console.log(`hook unity`);
                    const unity = Process.findModuleByName("libunity.so");
                    console.log(`base - ${unity?.base}`);
                    if (unity) {
                        Interceptor.attach(unity.base.add(0x1F938AC), {
                            onEnter: function (args) {
                                stacks("hook 0x1F938AC", this.context);
                            },
                            onLeave: function (ret) {
                                return ret;
                            }
                        });
                    }

                    // dumpSo("libunity.so");
                }

                return ret;
            },
            onEnter: function (args) {
                this.isHook = 0;
                const path = args[0].readCString();
                const mode = args[1].toUInt32();
                if (path && path.indexOf("unity") != -1 && mode == 2) {
                    this.isHook = 1;
                }

                if (path && path.indexOf("/data/app") != -1) {
                    console.log(`[dlopen] path - ${path}, mode - ${mode}`);
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
                if (path && path.indexOf("/data/app") != -1) {
                    console.log(`[dlopen] path - ${path}, mode - ${mode}`);
                }
            }
        });
    }

    let base: NativePointer | null = null;
    const pthread_create = Module.findExportByName("libc.so", "pthread_create");
    if (pthread_create) {
        const pthread_create_f = new NativeFunction(pthread_create, 'int', ['pointer', 'pointer', 'pointer', 'pointer']);
        Interceptor.replace(pthread_create_f, new NativeCallback(function (tid, attr, cb, arg) {
            if (base == null) {
                const unity = Process.findModuleByName("libunity.so");
                if (unity) {
                    base = unity.base;
                }
            }
            else
            {
                console.log(`[pthread_create] cb - ${cb}, offset - ${cb.sub(base)}`);
            }

            let ret = pthread_create_f(tid, attr, cb, arg);
            return ret;
        }, 'int', ['pointer', 'pointer', 'pointer', 'pointer']));
    }


    console.log(`hook native end!`);
}

// frida -U --no-pause -f com.bekko.yld.vivo -l .\_agent.js
setTimeout(function () {
    console.log(`\n`);
    // hook_java();
    hook_native();
}, 10);