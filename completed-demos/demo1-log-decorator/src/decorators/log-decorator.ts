
export default function log(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  let originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`addRating method called with args: ${JSON.stringify(args)}`);

    let result = originalMethod.apply(this, args);

    console.log(`addRating method return value: ${JSON.stringify(result)}`);

    return result;
  }

  return descriptor;
}
