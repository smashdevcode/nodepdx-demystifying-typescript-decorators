
# Demos

## Preparation

* Copy the demo folders to the desktop
* Run `npm install` within each demo folder
* Test running each app "as is"

## Demo 1: Angular 2 Decorators

The Angular team has made a big bet on decorators. Let's look at a simple "hello world" Angular 2 app.

Our Angular 2 app consists of a single HTML page. Within that HTML page is an element named `my-app`.

If we look in the `app` folder, we'll see two files. The first file, `app.component.ts`, is our component containing all of the code related to our `app` component. The second file, `main.ts`, is responsible for bootstrapping our app.

If we run our app, you'll notice that we're currently getting an error.

```
No Directive annotation found on AppComponent
```

That's because we're attempting to bootstrap our AppComponent class but Angular doesn't recognize our component. We need to add the `Component` decorator.

```
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }
```

The `Component` decorator not only registers our component with Angular but also configures it.

This is just one example of how Angular 2 uses decorators.

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

### Summary

* Method decorators are the simpliest to implement
* Class and property decorators require some extra work
 * Properly wrapping a constructor function requires some effort
 * Decorating a property requires you to create a hidden backing value property and possibly fix calls to JSON.stringify

## Demo 3: Combining Decorators

This is the same app as before, except now we have an improved `log` decorator that can be used at the class, property, or method level.

How is this done?

Let's start by looking at the parameter lists for the three types of decorators that we're supporting (I'm intentionally omitting the fourth type, the parameter decorator).

* Class decorator - A single argument is passed: the constructor function
* Property decorator - Two arguments are passed: the constructor function's prototype and the property key
* Method decorator - Three arguments are passed: the constructor function's prototype, the property key, and property descriptor for the key

To create a decorator that can be used for all three types, we just need to create a factory method that has a signature that satisfies all three of the expected situations.

```
export default function log(target: any, key: string = null, descriptor: TypedPropertyDescriptor<any> = null) {
  if (key === null && descriptor === null) {
    return logClass.apply(this, [target]);
  } else if (descriptor === null) {
    return logProperty.apply(this, [target, key]);
  } else {
    return logMethod.apply(this, [target, key, descriptor]);
  }
}
```

Now we can add `log` decorators to our class and properties.

```
@log
export default class Book {
  @log title: string;
  @log publisher: string;
  ratings: Rating[] = [];

  constructor(title: string, publisher: string) {
    this.title = title;
    this.publisher = publisher;
  }

  @log
  addRating(username: string, rating: number, comment: string): Rating {
    // console.log(`addRating method called with args: ${JSON.stringify(arguments)}`);

    let ratingObj = new Rating(username, rating, comment);
    this.ratings.push(ratingObj);

    // console.log(`addRating method return value: ${JSON.stringify(ratingObj)}`);

    return ratingObj;
  }
}
```

If we run our app, we'll a lot more log messages!

You'll notice that calling `JSON.stringify` is not serializing all of our property values. If we look at the function that is decorating properties, we can see that we're installing a property that uses a getter and setter.

```
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
```

The getter and setter functions are defined on the prototype object, so they are shared across object instances. Unfortunately, `JSON.stringify` only enumerates visible properties, so we've lost our property values. We can restore those properties by providing our own implementation of the `toJSON` method.

```
toJSON() {
  return {
    title: this.title,
    publisher: this.publisher,
    ratings: this.ratings
  };
}
```

Logging is interesting and helpful, but what if we want to track the performance of a method? Here's a decorator that's designed to do just that.

```
@log
@perf
addRating(username: string, rating: number, comment: string): Rating {
  let ratingObj = new Rating(username, rating, comment);
  this.ratings.push(ratingObj);
  return ratingObj;
}
```

We can just add another decorator right below our `log` decorator. When we run our app, we see the `perf` decorator logging a message showing the execution time, but our method completes so quickly it's difficult to tell if it's working or not. Let's purposely block execution in order to test our `perf` decorator.

```
@log
@perf
addRating(username: string, rating: number, comment: string): Rating {
  sleep(1);
  let ratingObj = new Rating(username, rating, comment);
  this.ratings.push(ratingObj);
  return ratingObj;
}
```

Now that our method is performing poorly, what if we wanted to memoize the method in order to improve performance? Let's add our `memoize` decorator!

```
@log
@perf
@memoize
addRating(username: string, rating: number, comment: string): Rating {
  sleep(1);
  let ratingObj = new Rating(username, rating, comment);
  this.ratings.push(ratingObj);
  return ratingObj;
}
```

To see this decorator in action, we need to make another call to the `Book.addRating` method with the same arguments.

```
book1.addRating('johnsmith', 4, 'Love this book!');
book1.addRating('johnsmith', 4, 'Love this book!');
```

Now let's run our app.

Excellent! Our second call to the `addRating` method takes less time to execute because we are returning the cached value.
