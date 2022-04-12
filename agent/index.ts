import {bytes2HexString, bytes2String, dumpSo, enumIntent, show_maps, stacks} from "./utils";

function hook_java() {
    if (Java.available) {
        Java.perform(function () {

        });
    }
}

function hook_native() {

}

setTimeout(()=>{
    dumpSo("libgvradio.so");
}, 1000);


setImmediate(() => {
    // hook_java();
    // hook_native();
});