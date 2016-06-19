
# Presentation




## TODO




* Combining decorators demo





* Angular 2 demo
 * Has the structure of a basic changed at all?
 * https://angular.io/docs/ts/latest/quickstart.html



* Just show slides of the following

* Express demo
 * https://shellmonger.com/2015/07/30/node-mvc-controllers-and-ecmascript-2015/
 * https://www.npmjs.com/package/express-decorators
 * https://www.npmjs.com/package/ts-express-decorators

* lodash demo
 * https://www.npmjs.com/package/lodash-decorators






* Start by showing the Angular 2 demo
 * "If you've seen decorators before, this might have been where you saw them."

* Need to add message that our decorator implementation is simplistic
 * Things get more complicated when properly handling chained decorators

* Introduction
 * What are decorators?
 * Why are they interesting?
 * How do they work?
  * Dispel the magic

* Walkthrough the demo app
 * Show the book titles that our app is tracking

* Method decorators are the simpliest to implement
* Property decorators require some extra work
 * Hidden backing value property
 * Fixing calls to JSON.stringify





* Prepare demos with code snippets
 * Copy completed code to the _demo folders
 * Remove completed code

* Put together slides
 * Pull slides and images from other presentations

* Rehearse and time
 * Copy the demo folders to the desktop (don't want to modify the starting point!)
 * Make sure that the presentation is 30 minutes or less
 * Update flow and make edits












## Schedule

TODO Update schedule???

0:00 - 0:05 -- What are decorators? (slides)
 * Declarative vs imperative
 * High level description
0:05 - 0:10 -- Log method decorator (demo)
 * Compare imperative to declarative thinking
 * What gets passed to a decorator?
 * What can a decorator do?
 * Generated polyfill breakdown is available offline
0:10 - 0:15 -- Class and property decorators (demo)
 * How do these differ from method decorators?
0:15 - 0:20 -- Decorator factory and passing parameters (demo)
 * Having separate decorators for each type is clumsy and messy
 * How to make a general purpose decorator factory
 * How to pass parameters to a decorator?
0:20 - 0:25 -- How are decorators being used? (code examples)
 * Angular 2
 * Aurelia
 * Other libraries (TBD)
0:25 - 0:30 -- What does the future hold? (slides)
 * TypeScript roadmap improvements
 * Proposal updates

* Be smart about the mixture between live coding and code snippets

## Introduction

## What are Decorators?

Give us a way to do declarative programming in JavaScript

## Declarative v Imperative

What do we mean by declarative programming?

## Declarative Programming

Say what you want

## Imperative Programming

Say how to get what you want

### Official Definition

A decorator is (from the proposal):

* An expression
* That evaluates to a function
* That takes the target, name, and decorator descriptor as arguments
* And optionally returns a decorator descriptor to install on the target object

## Not a New Idea

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
* Any browser that supports the Object.defineProperty and Object.getOwnPropertyDescriptor methods
* Chrome 5, Firefox 4, IE 9, Opera 12, Safari 5.1
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

### TypeScript Compiler Options

```
"compilerOptions": {
  "target": "es5",
  "experimentalDecorators": true
}
```

* Do you have to have the experimental decorators option enabled?
* Yes... or else you get a compiler warning :)

### Drift

* The decorators proposal has evolved since TS implemented it
 * Property descriptor has been replaced with a decorator descriptor
* I'll be covering the TS implementation
* Decorators will not be part of ES7

https://github.com/wycats/javascript-decorators

### How They're Used

* You'll typically use decorators more often then you'll create them

### Who’s Using Decorators?

* Angular 2
* Aurelia
* React (unofficially)
* More!!!

### Why Would You Care?

* Allows your code to be clearer and more focused 
 * Less clutter
 * More expressive 

## Demos

### Demo 1: Log Decorator Demo

### Emitted Helpers

* Give summary of what the emitted helpers are doing
* Point to commented breakdown of what the emitted helper is doing

### Demo 2: Angular 2 Demo

### Demo 3: Stack Them Up Demo

## Outro

### Decorator Libraries

* npm Packages
* Searching for `decorators` returns 760 results!

TODO Put together list of interesting looking libraries

### The Future

### TypeScript Roadmap

TypeScript 2.0

* Support for external helpers library
 * See https://github.com/Microsoft/TypeScript/issues/3364
* Decorators for function expressions/arrow functions

TypeScript 2.1

* Ambient/design-time-only decorators
 * See https://github.com/Microsoft/TypeScript/issues/2900

### Proposal

* Follow the proposal
* See https://github.com/wycats/javascript-decorators/blob/master/interop/reusability.md

### Getting Started with TypeScript

### Use the Editor of Your Choice

### Editors

* The TypeScript Language Service makes it possible to support the following across all of these editors
* Static checking
* Symbol-based navigation
* Statement completion
* Code refactoring

### Tool Chain Support

* Grunt
* Gulp
* webpack
* TSLint

### Resources

(see resources from the Introduction to TypeScript talk)

### TypeScript Meetup

* Come to our meetup
* Live stream for those of you who don't live in Portland

### Thanks

(grab contact information from previous presentation)

# Cutting Room Floor

### Removing Emitted Helper Methods

Note: This is probably not a good idea to do... just suggest that this issue should be fixed in 2.0

* The code for the emitted helpers can be found at https://github.com/Microsoft/TypeScript/blob/master/src/compiler/emitter.ts
* Configure the compiler to not emit helpers by setting the `noEmitHelpers` compiler option
* Move the helpers into their own module or global namespace
