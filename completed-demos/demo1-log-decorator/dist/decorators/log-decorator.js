"use strict";
function log(target, key, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log("addRating method called with args: " + JSON.stringify(args));
        var result = originalMethod.apply(this, args);
        console.log("addRating method return value: " + JSON.stringify(result));
        return result;
    };
    return descriptor;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = log;
