"use strict";
function wrapConstructor(target, pre, post) {
    // create a new constructor that wraps the target constructor
    var newConstructor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (pre) {
            pre.apply(this, args);
        }
        var obj = createInstance(target, args);
        if (post) {
            post.call(this, obj);
        }
        return obj;
    };
    // set the prototype on the new constructor 
    // so that the instanceof operator will behave as expected
    newConstructor.prototype = target.prototype;
    // return the new constructor
    return newConstructor;
}
exports.wrapConstructor = wrapConstructor;
function createInstance(constructor, args) {
    var c = function () {
        return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
}
function wrapMethod(target, key, descriptor, pre, post) {
    // capture the original method
    var originalMethod = descriptor.value;
    // redefine the method
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (pre) {
            pre.apply(this, args);
        }
        var result = originalMethod.apply(this, args);
        if (post) {
            post.call(this, result);
        }
        return result;
    };
    // return the descriptor
    return descriptor;
}
exports.wrapMethod = wrapMethod;
function ensureProperty(target, key, enumerable, initializeValue) {
    if (initializeValue === void 0) { initializeValue = null; }
    if (!target.hasOwnProperty(key)) {
        Object.defineProperty(target, key, {
            value: initializeValue ? initializeValue() : null,
            writable: true,
            enumerable: enumerable,
            configurable: true
        });
    }
}
exports.ensureProperty = ensureProperty;
