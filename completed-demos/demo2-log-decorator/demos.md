
# Demos

## Demo 1: Angular 2 Decorators

TODO

## Demo 2: Log Decorator

Imagine that we want to debug what is happening inside of the `Book.addRating` method. We could use the debugger or we could add `console.log` statements to the method.

```
addRating(username: string, rating: number, comment: string): Rating {
  console.log(`addRating method called with args: ${JSON.stringify(arguments)}`);

  let ratingObj = new Rating(username, rating, comment);
  this.ratings.push(ratingObj);

  console.log(`addRating method return value: ${JSON.stringify(ratingObj)}`);

  return ratingObj;
}
```

Adding log statements can be tedious and repetitive work. What would be ideal is if we could just add a `@log` decorator like this.

```
@log
addRating(username: string, rating: number, comment: string): Rating {
  // console.log(`addRating method called with args: ${JSON.stringify(arguments)}`);

  let ratingObj = new Rating(username, rating, comment);
  this.ratings.push(ratingObj);

  // console.log(`addRating method return value: ${JSON.stringify(ratingObj)}`);

  return ratingObj;
}
```

Let's implement our `@log` decorator.

1. Add a `decorators` folder.

2. Add a `log-decorator.ts` file in that folder.

```
export default function log(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {

}
```

The `target` is the constructor function's prototype, the `key` is the name of the method property, the `descriptor` is the property descriptor for the method that is currently installed for the provided key.

Where does the `descriptor` parameter value come from? Let's go look at the compiled JavaScript for the `Book` class.

After the constructor function is defined and the prototype methods are declared, the `__decorate` method is called. The `__decorate` method is a helper method emitted by the TypeScript compiler.

```
__decorate([
    log_decorator_1.default
], Book.prototype, "addRating", null);
```

The parameter is an array of the decorators that have been applied to this member.

In the `__decorate` method, `Object.getOwnPropertyDescriptor(target, key)` is called in order to get the property descriptor for the provided key. The array of decorators are enumerated in reverse order, so that the decorator that is defined closest to the member is applied first. Each decorator function is called, receiving the target, key, and property descriptor. The property descriptor that is returned from the last decorator is installed on the target.

Let's implement the log decorator!

1. We want to wrap the existing method, so we'll start by grabbing a reference to that method. How do we do that? Let's look at the TypedPropertyDescriptor type.

```
interface TypedPropertyDescriptor<T> {
    enumerable?: boolean;
    configurable?: boolean;
    writable?: boolean;
    value?: T;
    get?: () => T;
    set?: (value: T) => void;
}
```

This interface describes the native PropertyDescriptor object. See the documentation for the `object.defineProperty` method at [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

We can get a reference to the method from the `value` property.

```
let originalMethod = descriptor.value;
```

2. Now we can redine the method by assigning a new function to the descriptor's `value` property. We want our method to gracefully handle any number of arguments, so we'll use the rest operator to get the arguments.

Then we can call the original method and capture the return value into a local variable. Don't forget to return the result!

```
descriptor.value = function(...args: any[]) {

  let result = originalMethod.apply(this, args);

  return result;
}
```

3. Now we can run whatever code we want before or after the method call. Let's add our log statements.

```
descriptor.value = function(...args: any[]) {
  console.log(`addRating method called with args: ${JSON.stringify(args)}`);

  let result = originalMethod.apply(this, args);

  console.log(`addRating method return value: ${JSON.stringify(result)}`);

  return result;
}
```

And here's our completed `log` decorator.

```
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
```

## Demo 3: Combining Decorators
