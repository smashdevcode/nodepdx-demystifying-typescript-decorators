"use strict";
var decorator_helpers_1 = require('./decorator-helpers');
function logMessage(message) {
    console.log(message);
}
function log(target, key, descriptor) {
    if (key === void 0) { key = null; }
    if (descriptor === void 0) { descriptor = null; }
    if (key === null && descriptor === null) {
        return logClass.apply(this, [target]);
    }
    else if (descriptor === null) {
        return logProperty.apply(this, [target, key]);
    }
    else {
        return logMethod.apply(this, [target, key, descriptor]);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = log;
function logClass(target) {
    console.log("The " + target.name + " has been declared");
    return decorator_helpers_1.wrapConstructor(target, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        logMessage(target.name + " constructor called with args: " + JSON.stringify(args));
    }, function (obj) {
        logMessage("New instance of the " + target.name + " class: " + JSON.stringify(obj));
    });
}
function logProperty(target, key) {
    var backingKey = '__' + key;
    // property getter
    var getter = function () {
        var val = this[backingKey];
        logMessage("Get: " + key + " => " + val);
        return val;
    };
    // property setter
    var setter = function (newVal) {
        logMessage("Set: " + key + " => " + newVal);
        decorator_helpers_1.ensureProperty(this, backingKey, false);
        this[backingKey] = newVal;
    };
    // delete the property
    if (delete target[key]) {
        // create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
function logMethod(target, key, descriptor) {
    return decorator_helpers_1.wrapMethod(target, key, descriptor, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        logMessage(key + " method called with args: " + JSON.stringify(args));
    }, function (result) {
        logMessage(key + " method return value: " + JSON.stringify(result));
    });
}
