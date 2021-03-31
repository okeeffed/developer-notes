---
menu: JavaScript
name: The Hard Parts v2
---

# The Hard Parts v2 Course

1. [FE Masters course link](https://frontendmasters.com/courses/javascript-hard-parts-v2/)
2. [JS course slides](https://static.frontendmasters.com/resources/2019-09-18-javascript-hard-parts-v2/javascript-hard-parts-v2.pdf)
3. [Callback exercises](http://csbin.io/callbacks)
4. [Closures article](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)
5. [If Hemingway Wrote JS](https://nostarch.com/hemingway)
6. [Closure exercises](http://csbin.io/closures)

## Thread of Execution

When JS runs code, it:

1. Goes through the code line-by-line and runs/executes each line - known as the thread of execution.
2. Save 'data' like strings and arrays so we can use that data later - in its memory.

### Functions

Code we save ('define') functions & can use (call/invoke/execute/run) later with the function's name & ().

### Execution Context

Created to run the code of a function - has 2 parts:

- Thread of execution
- Memory

> There is a global execution context, while other functions have an execution context.

> Threads of execution - you only have one that performs work.

### Call Stack

The bottom of the call stack is always the global execution context.

As functions are invoked, they are put onto the call stack and evaluated.

## Functions and Callbacks

### Generalized Functions

- Functions give us the ability to remain DRY
- Higher order functions follow the same principle. We may not want to decide exactly what some of our functionality is until we run our function.

### Higher order functions

The example used is a function `copyArrayAndDivideBy2`:

```javascript
// not flexible
function copyArrayAndDivideBy2(array) {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] / 2);
  }
  return output;
}

// the example used
function copyArrayAndManipulate(array, instructions) {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(i));
  }
  return output;
}

function multiplyBy2(input) {
  return input * 2;
}

const result = copyArrayAndManipulate([1, 2, 3], multipleBy2);

// my personal curried preference
function copyArrayAndManipulate(instructions) {
  return function(array) {
    const output = [];
    for (let i = 0; i < array.length; i++) {
      output.push(instructions(i));
    }
    return output;
  };
}
```

> Note that in relation to memory, the local memory generated from `copyArrayAndManipulate` has a reference to the value of `instructions` (n this case, `multiplyBy2`).

In the above example, `copyArrayAndManipulate` is the higher-order function. `multiplyBy2` is the callback function.

### Anonymous vs arrow functions

- Improve immediate legibility of our code.
- But at least for our purposes here they are `syntactic sugar` - we'll see their full effects later.
- Understanding how they're working under-the-hood is vital to avoid confusion.

> "Readability comes before insignificant, marginal performance gains."

Here is a [link](http://csbin.io/callbacks) to the callback exercises.

## Closure

- Most esoteric of JS concepts.
- Enables powerful pro-level functions like "once" and "memoize".
- Many JavaScript design patterns including the module pattern use closure.
- Build iterators, handle partial application and maintain state in an async world.

> "If you understand closures in JS, you understand JS."

Functions with memories:

- When funcs are called, we create a live data store for the func's execution context.
- When func finishes executing, local mem is deleted (except returned value).
- What if our functions could hold on to live data between executions? Would let our func definitions have an associated cache/persistent memory.

The above all starts with returns a function from another function.

```javascript
function createFunction() {
  function multiplyBy2(num) {
    return num * 2
  }
  return multiplyBy2
}

const genFunc = createFunction()
const result = generatedFunc)(3)
```

> It is imperative that you understand the data store and execution contexts that come from the function. Remember: after a function runs, all the local memory is erased except for the returned value from that function's execution context.

With closures, the local context that it was called in comes back with it when the closure is returned. A "backpack" of live data. This data can be updated and given back to the global context after the local context of the closure is run every time.

The other benefit is the "privisation" of variables in the closure scope that you cannot access directly.

> During the Q&A, there is a short answer on decoration on using closures with functions that have access to the local data context.

### Technical Definition + Review

So what is the name of this "backpack"? The `variable environment`. Another name is `COVE` - closed over variable environment. The last acronym used in this talk is `PLSRD`: Persistent lexically or static scope reference data. We can also simply call it the `closure`.

There is a link to a great artcile on [closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8).

> JavaScript is a lexically (or static) scoped langauge.

### Practical Applications

Closures give a new toolkit for writing professional code.

1. Helper functions: Helper funcs like "once" and "memoize".
2. Iterators and generators: Use lexical scoping and closure to achieve the most contemporary patterns for handling data in JS.
3. Module pattern: Preserve state for the life of an application without polluting the global namespace.
4. Async JS: Callbacks and Promises rely on closure to persist state in an async environment.

The closure exercises are [here](http://csbin.io/closures)

## Async JS

### Single threaded execution

The core JS engine has 3 parts:

1. Thread of execution
2. Memory/variable environment
3. Call stack

But we need more:

1. Web Browser APIs/Node background APIs
2. Promises
3. Event loop, Callback/Task queue and micro task queue

### Async browser features

1. Logging
2. Network requests (fetch, XHR)
3. Sockets
4. Dev tools
5. Timeer (setTimeout)
6. HTML DOM (document)
7. Storage (local storage)

> Understanding the browser features are imperative to understanding the asynchronous web queues and execution context.

The behaviours that happen due to this asynchronousity requires interaction with a world outside of JS now.

### Callback Queue & Event Loop

The example here questions what happens on `setTimeout(() => console.log('hello'), 0)`.

```javascript
// what happems?
function printHello() {
  console.log('hello');
}
function blockForOneSec() {
  // block for one sec logic
}

setTimeout(printHello, 0);
blockerForOneSec(); // blocks thread
console.log('me first'); // this still runs before printHello due to the rules of the callback queue
```

It explains how after the timeout has run, the callback function is first put onto the "callback queue". The event loop after `blockForOneSec` still runs the `console.log` function as the callback queue priority is put to the back of the event queue.

> You could have 1m `console.log` calls, and they would all run before anything runs from the callback queue. Until ES6, this was everything for async JS.

> Note the `event loop` runs the entire time while the thread is still blocked to check and know if the blocking timer as finished.

Some of the problems with the callback queue:

1. Deprioritised callbacks from the callback queue.

## Promises

> There is an immediate consqueunce when the background work is one.

The ES6 solution to priority: Promises. Using two-pronged "facade" functions that both:

1. Initiate background web browser work; and
2. Return a placeholder object (promise) immediately in JS.

```javascript
function display(data) {
  console.log(data);
}

// one consequence: immediately pulls out special Promise object with a value and an onFufilled property (empty array).
// the second: Web browser API createds a network request
const futureData = fetch(url);
futureData.then(display);

console.log('me first!');
```

When the data comes back from the response, it will go into the Promise object `value` property.

The empty array can have an functions triggered to run when the `data` comes back in to the `value` property. The data back is put in as the parameter for that function being run from the `onFulfillment` array that is filled from the `then` keyword.

> There is also a `onRejection` function array to handle errors.

Here is the example given for the call order once the function comes back:

```javascript
function display(data) {
  console.log(data);
}
function printHello() {
  console.log('Hello');
}
function blockForOneSec() {
  // block for one sec logic
}

setTimeout(printHello, 0); // runs last as the call comes from the callback queue
const futureData = fetch(url);
futureData.then(display); // display takes priorty over callbacks due to the microtask queue

blockForOneSec();
console.log('me first!'); // still runs first
```

> Once the sychronous code runs in an execution context, the event loop checks the `microtask` queue and call those tasks before the `callback queue`.

> Another interesting concept was "starving the callback queue" - if you keep filling the microtask queue, you can endlessly delay the callback queue from running.

### The rules of the queues

Hold promise-deferred functions in the microtask queue and callback function in the task queue (callback queue). When the Web Browser Feature (API) finishes, add the function to the call stack (ie run the func) when the call stack is empty & all global code run (have the event loop check this condition).

Prioritize functons in the microtask queue over the Callback queue.

### Other terms related to async

- Non-blocking applications: we don't have to wait in a single thread and don't vlock further code from running.
- However long it takes: We cannot predicate when our Browser feature's work will finish so we let JS handle automatically runnng the function on its completion.
- Web applications: Async JS is the backbone of the modern web - letting us build fast 'non-blocking' applications.

## Classes & Prototypes (OOP)

- A popular paradigm for structuring complex code.
- Prototype chain - has embulance of OOP.
- Understanding the differences between `__proto__` and prototype.
- The `new` and `class` keywords such as tools to automate our object & method creation.

### Objects store functions with associated data

This is the principle of encapsulation.

```javascript
const user1 = {
  name: 'Will',
  score: 3,
  increment: function() {
    user1.score++;
  },
};

user1.increment();
```

You could also use `Object.create(null)` then assign properties to the object if it is assigned to a variable.

## Factory Functions

Factory functions are used to build out objects.

```javascript
function userFactory(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.increment = function() {
    newUser.score++;
  };
  return newUser;
}

const user1 = userFactory('Jill', 0);
const user2 = userFactory('Jack', 2);
user1.increment();
```

> The factory follows the previous knowledge that we understand about closures, the variable environment and returns from the local execution context.

## Prototype Chain

Is the better way than putting a copy of functions onto every single object?

We can use the Prototype chain. We have the interpreter - if it doesn't find the function on the object (in this case, the user) - look up that protoype object to see if it is there.

```javascript
function userFactory(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const userFunctionStore = {
  increment: function() {
    newUser.score++;
  },
  login: function() {
    console.log('Logged in');
  },
};

const user1 = userFactory('Jill', 0);
const user2 = userFactory('Jack', 2);
user1.increment();
```

### The Prototypal Link

Under the hood, there is a hidden property on the objects we've been creating `__proto__` and it has a link to `userFunctionStore`.

> The argument for `Object.create` is always the `__proto__` property.

### hasOwnProperty Method

We can use `hasOwnProperty` which comes from the head honcho, the `Object prototype` that all objects link to at the top of the prototype chain.

If we use an exammple of `user1.hasOwnProperty('store')`, it will move up the prototype chain looking for that value.

> The parent Object type at the top of the chain has property `__proto__` which will have a `null` value.

### this Keyword

The default value for `this` is from the global namespace.

> There is the historical reference for the `that = this` assignment that objects used to use to keep context.

If you use `.call` (or `.apply`) with `this` as the argument, it would keep the scope as well.

This can now be avoided with the `this` assignment being lexically scope by ES6's arrow functions.

> Lexically scoped = it is from the scope of where this was defined.

### new Keyword

The `new` keyword can be used to automate the factory function.

```javascript
userFactory.prototype.increment = function() {
  this.score++;
};

const user1 = new userFactory('Jack', 2);
```

This automatically sets the `__proto__` value and an empty object at `this` as well. The `__proto__` points to a prototype object of `userFactory` in the above example.

### class Keyword

This section introduced the idiomatic way to define when the `new` keyword needs to be used to instantiate an object. In addition, the syntactic sugar of the class keyword is discussed, and how it really is no different under the hood than what was demonstrated in previous sections.

Developers use the convention of the capital letter to help developers know that the `new` keyword should be used for a factory function.

```javascript
class UserCreator {
  // Syntactic sugar for the factory
  // function.
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  // These methods are syntactic sugar for the
  // prototype ie this transpiles to
  // UserCreator.prototype.increment.
  increment() {
    this.score++;
  }

  login() {
    console.log('login');
  }
}

const user1 = new UserCreator('Eva', 0);
user1.increment();
```
