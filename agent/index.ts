import {hook_dlopen, stacks} from "./utils";

function hook() {
    if (Java.available) {
        Java.perform(function () {

        });
    }

    /*
    const __openat = Module.findExportByName("libc.so", "__openat");
    console.log(`__openat - ${__openat}`);
    if(__openat)
    {
        Interceptor.attach(__openat, {
            onLeave:function (ret){
                return ret;
            },
            onEnter:function (args) {
                const _file_name = args[1].readCString();
                // console.log(`file name = ${_file_name}`)
                if( _file_name && _file_name?.indexOf("/data/user/0/com.xhs.xddld.aligames/shared_prefs/localhost.xml") != -1)
                {
                    stacks("__openat");
                }
            }
        });
    }
    //*/

    /*
    // FILE *fopen(const char *filename, const char *modes)
    const fopen = Module.findExportByName("libc.so", "fopen");
    console.log(`fopen - ${fopen}`);
    if (fopen) {
        Interceptor.attach(fopen, {
            onLeave: function (ret) {
                return ret;
            },
            onEnter: function (args) {
                const path = args[0].readCString();
                if (path?.indexOf("main.js") != -1) {
                    stacks("main.js", this.context);
                    console.log(`path = ${path}`)
                }
            }
        });
    }
    //*/

    /*
    // FILE *freopen(const char *path, const char *mode, FILE *stream);
    const freopen = Module.findExportByName("libc.so", "freopen");
    console.log(`freopen - ${freopen}`);
    if(freopen)
    {
        Interceptor.attach(freopen, {
            onLeave:function (ret){
                return ret;
            },
            onEnter:function (args) {
                const path = args[0].readCString();
                console.log(`path = ${path}`)
            }
        });
    }
    //*/

    /*
    // size_t fread(void *restrict ptr, size_t size, size_t nmemb, FILE *restrict stream);
    const fread = Module.findExportByName("libc.so", "fread");
    console.log(`fread - ${fread}`);
    if (fread) {
        const fread_f = new NativeFunction(fread, `size_t`, [`pointer`, `size_t`, `size_t`, `pointer`]);
        Interceptor.replace(fread_f, new NativeCallback(function (buf, size, nmemb, fp) {
            const ret = fread_f(buf, size, nmemb, fp);
            console.log("start:")
            console.log(hexdump(buf, {length: size.toNumber()}));
            console.log("end!")
            return ret;
        }, `size_t`, [`pointer`, `size_t`, `size_t`, `pointer`]));
    }
    //*/

    /*
    //ssize_t sendto(int sockfd, const void *buf, size_t len, int flags, const struct sockaddr *dest_addr, socklen_t addrlen);
    const sendto = Module.findExportByName("libc.so", "sendto");
    console.log(`sendto - ${sendto}`)
    if (sendto) {
        const sendto_f = new NativeFunction(sendto, `ssize_t`, [`int`, `pointer`, `size_t`, `int`, `pointer`, `uint32`]);
        Interceptor.replace(sendto_f, new NativeCallback(function (sockfd, buf, len, flags, dest_addr, addrlen) {
            console.log(`hook sendto`);
            const result = sendto_f(sockfd, buf, len, flags, dest_addr, addrlen);
            console.log(`sockfd - ${sockfd}, buf - ${buf}, len - ${len}, flags -${flags}, dest_addr - ${dest_addr}, addrlen - ${addrlen}`);
            console.log(hexdump(buf,{length:len.toNumber()}));
            return result;
        }, `ssize_t`, [`int`, `pointer`, `size_t`, `int`, `pointer`, `uint32`]));
    }
    //*/

    ///*
    const dlopen_ext_f = Module.findExportByName(null, "android_dlopen_ext");
    if (dlopen_ext_f) {
        Interceptor.attach(dlopen_ext_f, {
            onLeave: function (ret) {
                if (this.is_hook) {
                    const egret = Process.findModuleByName("libegret.so");
                    console.log(`egret - ${egret?.base}`)
                    if (egret) {
                        /*
                        // 读取js文件，转为内存数据的函数
                        Interceptor.attach(egret.base.add(0x13AA64 + 1), {
                            onEnter: function (args) {
                                const func = args[0].readPointer().add(0x18).readPointer();
                                const offset = func.sub(egret.base);
                                console.log(`call_func = ${func}, offset = ${offset}`);
                            },
                            onLeave: function (ret) {
                                return ret;
                            }
                        });

                        Interceptor.attach(egret.base.add(0x115274 + 1), {
                            onEnter: function (args) {
                                const a1 = args[0].readCString();
                                const a5 = args[4].readCString();
                                console.log(`a1 - ${a1}, a5 - ${a5}`);
                            },
                            onLeave: function (ret) {
                                return ret;
                            }
                        });

                        // 运行脚本内存数据的函数
                        Interceptor.attach(egret.base.add(0x13C640 + 1), {
                            onEnter: function (args) {
                                const script = args[1].readCString();
                                const link_addr = args[2].readCString();
                                console.log(`script = ${args[1]}, link_addr = ${link_addr}`);
                            },
                            onLeave: function (ret) {
                                return ret;
                            }
                        });
                        */

                        ///*
                        // 尝试通过curl推导收发包
                        //CURLcode curl_easy_perform(CURL *handle);
                        const curl_easy_perform = egret.findExportByName("curl_easy_perform");
                        console.log(`curl_easy_perform = ${curl_easy_perform}`)
                        if (curl_easy_perform) {
                            Interceptor.attach(curl_easy_perform, {
                                onEnter:function (args) {
                                    console.log(`[curl_easy_perform] enter`);
                                },
                                onLeave:function (ret) {
                                    return ret;
                                }
                            })
                        }
                        //*/
                    }
                }
                return ret;
            },
            onEnter: function (args) {
                this.is_hook = 0;
                const path = args[0].readCString();
                const mode = args[1].toUInt32();
                if (path?.indexOf("libegret.so") != -1) {
                    console.log(`[android_dlopen_ext] path - ${path}, mod - ${mode}`);
                    this.is_hook = 1;
                }
            }
        });
    }
    //*/


    /*
    //CURLcode curl_global_init(long flags);
    const
    //*/
}

setTimeout(function () {
    hook();
    // hook_dlopen(null);
}, 100);