
import {wrapConstructor, wrapMethod, ensureProperty} from './decorator-helpers';

function logMessage(message: string) {
  console.log(message);
}

export default function log(target: any, key: string = null, descriptor: TypedPropertyDescriptor<any> = null) {
  if (key === null && descriptor === null) {
    return logClass.apply(this, [target]);
  } else if (descriptor === null) {
    return logProperty.apply(this, [target, key]);
  } else {
    return logMethod.apply(this, [target, key, descriptor]);
  }
}

function logClass(target: any) {
  console.log(`The class ${target.name} has been declared`);

  return wrapConstructor(
    target,
    function (...args) {
      logMessage(`${target.name} constructor called with args: ${JSON.stringify(args)}`);
    },
    function (obj) {
      logMessage(`New instance of the ${target.name} class: ${JSON.stringify(obj)}`);
    });
}

function logProperty(target: Object, key: string) {
  const backingKey = '__' + key;

  // property getter
  var getter = function () {
    let val = this[backingKey];
    logMessage(`Get: ${key} => ${val}`);
    return val;
  };

  // property setter
  var setter = function (newVal) {
    logMessage(`Set: ${key} => ${newVal}`);
    ensureProperty(this, backingKey, false);
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

function logMethod(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  return wrapMethod(
    target,
    key,
    descriptor,
    function (...args) {
      logMessage(`${key} method called with args: ${JSON.stringify(args)}`);
    },
    function (result) {
      logMessage(`${key} method return value: ${JSON.stringify(result)}`);
    }
  )
}
