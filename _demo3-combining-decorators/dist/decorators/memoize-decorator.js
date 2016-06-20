"use strict";
var decorator_helpers_1 = require('./decorator-helpers');
var cacheKey = '__cache';
function memoize(target, key, descriptor) {
    // capture the original method
    var originalMethod = descriptor.value;
    // redefine the method
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        decorator_helpers_1.ensureProperty(this, cacheKey, false, function () {
            return {};
        });
        var cache = this[cacheKey][key];
        if (!cache) {
            this[cacheKey][key] = cache = {};
        }
        var valueKey = JSON.stringify(args);
        var result = null;
        if (cache.hasOwnProperty(valueKey)) {
            result = cache[valueKey];
            console.log("Returning memoized value " + JSON.stringify(result) + " for the " + key + " method");
        }
        else {
            result = originalMethod.apply(this, args);
            cache[valueKey] = result;
        }
        return result;
    };
    // return the descriptor
    return descriptor;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = memoize;
