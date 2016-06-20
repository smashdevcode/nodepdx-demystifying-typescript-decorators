"use strict";
var decorator_helpers_1 = require('./decorator-helpers');
function perf(target, key, descriptor) {
    return decorator_helpers_1.wrapMethod(target, key, descriptor, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        decorator_helpers_1.ensureProperty(this, '__startTime', false);
        this.__startTime = Date.now();
    }, function (result) {
        var endTime = Date.now();
        console.log(key + " method execution time: " + (endTime - this.__startTime));
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = perf;
