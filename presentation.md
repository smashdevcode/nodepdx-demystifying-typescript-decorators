
# Presentation

## Overview

### Decorators

Give us a way to do declarative programming in JavaScript

### Declarative v Imperative

What do we mean by declarative programming?

### Declarative Programming

Say what you want

### Imperative Programming

Say how to get what you want

### Demo 1: Angular 2 App

If you've seen decorators before, this might have been where you saw them

### Not a New Idea

* Java Annotations
* C# Attributes
* Python Decorators

Of these three Python Decorators are the most similar to how decorators work in JavaScript. Where Java Annotations and C# Attributes allow you to attach metadata to classes and class members, Python and JavaScript decorators provide a mechanism for modifying the class or class member that they are attached to.

### Programming Model

Method decorators can...

* Wrap the method being installed

Property decorators can...

* Change the property being installed
* Install other properties along side it

Class decorators can...

* Respond to the declaration of a class
* Wrap the constructor (when compiling to ES5)

### Browser Support

Do decorators work in all browsers?

* No browsers natively support decorators at this point in time
* So you need to transpile to ES5/ES6

### Object.defineProperty + Object.getOwnPropertyDescriptor

* Any browser that supports the Object.defineProperty and Object.getOwnPropertyDescriptor methods
* Chrome 5, Firefox 4, IE 9, Opera 12, Safari 5.1

### Transpilers

* TypeScript and Babel both support decorators

### What is TypeScript?

TypeScript can be summarized into three things

### #1 Superset of JavaScript

* You can start with your existing JavaScript, change the file extension, and you have TypeScript
* TypeScript is not trying to change what makes JavaScript great

### #2 Optional Static Typing

* You aren’t required to specify types… but you should

### #3 Features from the Future

* ES6, ES7, ES++
* Similar to other transpilers like Babel
* Allows you to start using new JS language features before the browsers have implemented them

### Use the Editor of Your Choice

### Editors

* The TypeScript Language Service makes it possible to support the following across all of these editors
* Static checking
* Symbol-based navigation
* Statement completion
* Code refactoring

## Demos

So, how do decorators work? Let's find out by creating our own decorator.

### Demo 2: Log Decorator

### Demo 3: Combining Decorators

## Wrap Up

### Decorator Libraries

* Searching for `decorators` on npm returns 760 results!

### Express Decorators

* [https://www.npmjs.com/package/express-decorators](https://www.npmjs.com/package/express-decorators)
* [https://www.npmjs.com/package/ts-express-decorators](https://www.npmjs.com/package/ts-express-decorators)

### Lodash Decorators

* [https://www.npmjs.com/package/lodash-decorators](https://www.npmjs.com/package/lodash-decorators)

### React Decorators

* This example will listen to changes in FooStore and BarStore and pass foo and bar as props to the Component when it is instantiated.
* [https://github.com/yahoo/fluxible/blob/master/packages/fluxible-addons-react/docs/api/connectToStores.md](https://github.com/yahoo/fluxible/blob/master/packages/fluxible-addons-react/docs/api/connectToStores.md)

### Word of Caution

* Decorators are an ECMAScript proposal, not a finalized feature of JavaScript
* The proposal recently changed, but the external syntax stayed the same
* Using external libraries of decorators, like with Angular 2, is safer to do than developing your own

### The Future

### TypeScript Roadmap

TypeScript 2.0

* Support for external helpers library
 * See [https://github.com/Microsoft/TypeScript/issues/3364](https://github.com/Microsoft/TypeScript/issues/3364)
* Decorators for function expressions/arrow functions

TypeScript 2.1

* Ambient/design-time-only decorators
 * See [https://github.com/Microsoft/TypeScript/issues/2900](https://github.com/Microsoft/TypeScript/issues/2900)

### Proposal

* Follow the proposal
* See [https://github.com/wycats/javascript-decorators/blob/master/interop/reusability.md](https://github.com/wycats/javascript-decorators/blob/master/interop/reusability.md)

### Thanks

James Churchill
Twitter: @SmashDev
GitHub: smashdevcode

[https://github.com/smashdevcode/nodepdx-demystifying-typescript-decorators](https://github.com/smashdevcode/nodepdx-demystifying-typescript-decorators)
