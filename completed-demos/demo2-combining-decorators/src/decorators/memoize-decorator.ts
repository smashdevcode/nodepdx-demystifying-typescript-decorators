
import {wrapMethod, ensureProperty} from './decorator-helpers';

const cacheKey: string = '__cache';

export default function memoize(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  // capture the original method
  const originalMethod = descriptor.value;

  // redefine the method
  descriptor.value = function (...args: any[]) {
    ensureProperty(this, cacheKey, false, function () {
      return {};
    });

    let cache = this[cacheKey][key];
    if (!cache) {
      this[cacheKey][key] = cache = {};
    }

    let valueKey = JSON.stringify(args);
    let result = null;

    if (cache.hasOwnProperty(valueKey)) {
      result = cache[valueKey];
      console.log(`Returning memoized value ${JSON.stringify(result)} for the ${key} method`);
    } else {
      result = originalMethod.apply(this, args);
      cache[valueKey] = result;
    }

    return result;
  };

  // return the descriptor
  return descriptor;
}
