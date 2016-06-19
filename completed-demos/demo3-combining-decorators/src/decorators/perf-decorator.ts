
import {wrapMethod, ensureProperty} from './decorator-helpers';

export default function perf(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  return wrapMethod(
    target,
    key,
    descriptor,
    function (...args) {
      ensureProperty(this, '__startTime', false);
      this.__startTime = Date.now();
    },
    function (result) {
      let endTime = Date.now();
      console.log(`${key} method execution time: ${endTime - this.__startTime}`);
    }
  )
}
