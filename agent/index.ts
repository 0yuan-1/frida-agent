import {hook_dlopen, stacks} from "./utils";

function hook_java() {
    if (Java.available) {
        Java.perform(function () {

        });
    }
}

function hook_native() {

}

setTimeout(function () {
    hook_java();
    hook_native();
}, 100);