
# Presentation Cutting Room Floor

### Official Definition

A decorator is (from the proposal):

* An expression
* That evaluates to a function
* That takes the target, name, and decorator descriptor as arguments
* And optionally returns a decorator descriptor to install on the target object

### TypeScript Compiler Options

```
"compilerOptions": {
  "target": "es5",
  "experimentalDecorators": true
}
```

* Do you have to have the experimental decorators option enabled?
* Yes... or else you get a compiler warning :)

### How They're Used

* You'll typically use decorators more often then you'll create them

### Why Would You Care?

* Allows your code to be clearer and more focused 
 * Less clutter
 * More expressive 

### Removing Emitted Helper Methods

Note: This is probably not a good idea to do... just suggest that this issue should be fixed in 2.0

* The code for the emitted helpers can be found at https://github.com/Microsoft/TypeScript/blob/master/src/compiler/emitter.ts
* Configure the compiler to not emit helpers by setting the `noEmitHelpers` compiler option
* Move the helpers into their own module or global namespace

### Drift

* The decorators proposal has evolved since TS implemented it
 * Property descriptor has been replaced with a decorator descriptor
* I'll be covering the TS implementation
* Decorators will not be part of ES7

https://github.com/wycats/javascript-decorators
