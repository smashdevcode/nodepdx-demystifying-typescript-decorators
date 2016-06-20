
export function wrapConstructor(
  target: any,
  pre: (...args: any[]) => void,
  post: (obj: any) => void) {

  // create a new constructor that wraps the target constructor
  const newConstructor = function (...args: any[]) {
    if (pre) {
      pre.apply(this, args);
    }

    const obj = createInstance(target, args);

    if (post) {
      post.call(this, obj);
    }

    return obj;
  }

  // set the prototype on the new constructor 
  // so that the instanceof operator will behave as expected
  newConstructor.prototype = target.prototype;

  // return the new constructor
  return newConstructor;
}

function createInstance(constructor: Function, args: any[]) {
  const c: any = function () {
    return constructor.apply(this, args);
  }

  c.prototype = constructor.prototype;

  return new c();
}

export function wrapMethod(
  target: Object,
  key: string,
  descriptor: TypedPropertyDescriptor<any>,
  pre: (...args: any[]) => void,
  post: (result: any) => void) {

  // capture the original method
  const originalMethod = descriptor.value;

  // redefine the method
  descriptor.value = function (...args: any[]) {
    if (pre) {
      pre.apply(this, args);
    }

    const result = originalMethod.apply(this, args);

    if (post) {
      post.call(this, result);
    }

    return result;
  };

  // return the descriptor
  return descriptor;
}

export function ensureProperty(target: Object, key: string, 
  enumerable: boolean, initializeValue: () => any = null) {

  if (!target.hasOwnProperty(key)) {
    Object.defineProperty(target, key, {
      value: initializeValue ? initializeValue() : null,
      writable: true,
      enumerable: enumerable,
      configurable: true
    });
  }
}
