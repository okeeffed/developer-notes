---
menu: JavaScript
name: Functional-Light JavaScript v3
---

# Functional-Light JavaScript v3

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

The course is by Kyle Simpson - Getify. This course can be accompanied by the book `Functional-Light JS` by Kyle.

It is light as it is not trying to delve too deep in the mathematics.

## Resources

1. [FE Masters Course Link](https://frontendmasters.com/courses/functional-javascript-v3/)
2. [FE Course Slides](http://static.frontendmasters.com/resources/2019-05-06-functional-light-v3/functional-light-v3.pdf)
3. [GitHub Book](https://github.com/getify/Functional-Light-JS)
4. [Amazon Book](https://www.amazon.com/Functional-Light-JavaScript-Pragmatic-Balanced-FP-ebook/dp/B0787DBFKH)
5. [LeanPub Book](https://leanpub.com/fljs)

## Introduction

> Akin to a rock climber already being on the wall and yelling terms down to a newbie, functional programmng books and courses also constantly yell terms and words without context.

> "The curse of functional programming is that you can get so used to it that you cannot explain it."

## Why Functional Programming?

### Imperative vs declarative.

Imperative is non-functional, code that is focus on "how to do something". The future reader needs to "read the code" and "mentally execute it" to understand. It forces the reader to do something that they're not naturally gifted.

Declarative makes it obvious. It is the idea of simpling delaring what is happening to the code. Declarative programming itself can also be perspective. It's about shifting towards the simpler implementation.

### The journey

Kyle speaks to his personal journey and understanding that functional programming will be something that he'll be working towards for months and years, if not decades.

### Code is provable

While it looks very programming-eque, a lot of it is actually based on math.

> Even if can't prove a mathemtical principle, we can still take advantage of it.

Functional programmers since to get a joy from going through the formal proof, but that isn't required.

> "If I can reduce the surface area of what I need to focus on, it will make my code more effective."

### Course overview

1. Functions
2. Closure
3. Composition
4. Immutability
5. Recursion
6. Lists/Data Structures
7. Async
8. FP Libraries

## Function Purity

### Functions vs Procedures

> Functional programming is not all about the function keyword.

Are the following functions?

```javascript
// doesn't return outputs
function addNumbers(x = 0, y = 0, z = 0, w = 0) {
  var total = x * y + z * w;
  console.log(total);
}

// calls another procedure, therefore is a procedure
function extraNumbers(x = 2, ...args) {
  return addNummners(x, 40, ...args);
}

extraNumbers(); // 42
extraNumbers(3, 8, 11); // 62
```

Believe it or not, they are "procedures".

> Just because it uses the `function` keyword doesn't make it a function.

A function not only needs to take some inputs and do something with it, but also needs to return some outputs.

> Functions can only call other functions. As soon as they call procedures, they themselves are a procedure.

### Naming Semantics

```javascript
function tuple(x, y) {
  return [x + 1, y - 1];
}

var [a, b] = tuple(...[5, 10]);

a; // 6
b; //9
```

The above code is not in the spirit of a function. It matters if there is an obvious relationship between the two. The goal is to create relationships between the two.

<BlockMath math="f(x) = 2x^2 + 3" />

> A function is a relationship between the input and an output.

```javascript
function shippingRate(size, weight, speed) {
  return (size + 1) * weight * speed;
}
```

The above gives a relationship. Is the a semantic relationship between what we put in and what we get out.

### Side Effects

> For there to be a function, we cannot have side effects.

Here is an example of side effects:

```javascript
function shippingRate() {
  rate = (size + 1) * weight * speed;
}

var rate;
var size = 12;
var weight = 4;
var speed = 5;
shippingRate();
rate; // 57

size = 8;
sze = 6;
shippingRage();
rate; //42
```

This above code is affecting something somewhere else in the program. Not only must there be a relationship between the inputs and outputs, but they also need to be direct.

As soon as they are indirect (as they are above) then it is no longer a function.

> In JavaScript, there is no such thing as a "function". There is such thing as a "function call". It is the function call that matters. We cannot say it is a function without looking at the function call.

### Listing some Side Effects

1. I/O (console, files etc)
2. Database Storage
3. Network Calls
4. DOM
5. Timestamps
6. Random Numbers
7. CPU Heat
8. CPU Time Delay

The reality is, you can't cut all of these things.

> We we say "no side effects" we really mean "minimise side effects.

Side effects take away the benefits of functional programming. If we are going to do them, we need to be very intentional about them.

## Pure Functions

> Functions with a pure function call.

```javascript
// pure
function addTwo(x, y) {
  return x + y;
}

// impure
// z makes it impure as it is
// an indirect variables
function addAnother(x, y) {
  return addTwo(x, y) + z;
}
```

It is not just that we can't access variables from outside of itself, but this is a key "easy win".

In the following case, we can make the argument it is still functional:

```javascript
const x = 1;

// pure
function addTwo(x, y) {
  return x + y;
}

// impure
// z makes it impure as it is
// an indirect variables
function addAnother(x, y) {
  return addTwo(x, y) + z;
}

addAnother(20, 21); // 42
```

Because we can see all the code and that it is not re-assigned, we can declare that it is functional due to our understanding of the applicatons given the immutability.

Note that `addTwo` could always be re-assigned as well - this is an important case to make when arguing that `addAnother` is still functional.

There is an onus on us as coders to make it obvious that these things are constant.

### Reducing Surface Area

By reducing surface area, we can improve the readability of our code.

This is a partial application (aka currying).

```javascript
function addAnother(z) {
  return function addTwo(x, y) {
    return x + y + z;
  };
}

addAnother(1)(20, 21);
```

### Same Input, Same Output

If we were to call `getId` over and over again with the same object, how sure are at its predicatability?

```javascript
function getId(obj) {
  return obj.id;
}
```

Let's say we reveal more of the program.

```javascript
getId({
  get id() {
    return Math.random();
  },
});
```

Now that we've seen more of the code, we reduce our confidence given the getter uses a side effect.

The aim is to get to "same input, same output".

> Functional purity is a level of confidence, not a binary characteristic.

The point of functional programming in JS is about our level of confidence in behaving pure.

## Extracting Impurity

The key technique is to extract our the impurity. It doesn't remove that impure functionality, but to extract our the impurity and leave a pure function.

```javascript
// impure
function addComment(comment) {
  return {
    id: randomId()
    comment: comment
  }
}
const comment = addComment('Hello')

// now pure
function addComment(id, comment) {
  return {
    id: id
    comment: comment
  }
}

const id = randomId()
const comment = addComment(id, 'Hello')
```

The alternative is the contain impurity by reducing the surface area.

We have two methods explained to do this:

1. Create a Wrapper
2. Create an Adapter

```javascript
// convert from this...
var SomeAPI = {
  threshold: 13,
  isBelowThreshold(x) {
    return x <= SomeAPI.threshold;
  },
};
var numbers = [];

function insertSortedDesc(v) {
  SomeAPI.threshold = v;
  var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
  if (idx == -1) {
    idx = numbers.length;
  }
  numbers.splice(idx, 0, v);
}

insertSortedDesc(3);
insertSortedDesc(5);
insertSortedDesc(1);
insertSortedDesc(4);
insertSortedDesc(2);
numbers; // [5,4,3,2,1]

// ...to this...
// approach a (creating a Wrapper)
var SomeAPI = {
  threshold: 13,
  isBelowThreshold(x) {
    return x <= SomeAPI.threshold;
  },
};
var numbers = [];

function getSortedNums(nums, v) {
  // create side effect on local nums
  var numbers = nums.slice();
  insertSortedDesc(v);
  return numbers;

  function insertSortedDesc(v) {
    SomeAPI.threshold = v;
    var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
    if (idx == -1) {
      idx = numbers.length;
    }
    numbers.splice(idx, 0, v);
  }
}

numbers = getSortedNums(numbers, 3);
numbers = getSortedNums(numbers, 5);
numbers = getSortedNums(numbers, 4);
numbers = getSortedNums(numbers, 1);
numbers = getSortedNums(numbers, 2);
numbers; // [5,4,3,2,1]

// ...or to this
// approach b (creating an Adapter function)
var SomeAPI = {
  threshold: 13,
  isBelowThreshold(x) {
    return x <= SomeAPI.threshold;
  },
};
var numbers = [];

function insertSortedDesc(v) {
  SomeAPI.threshold = v;
  var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
  if (idx == -1) {
    idx = numbers.length;
  }
  numbers.splice(idx, 0, v);
}

// copy, then modify by side effects
// then return to orig state
function getSortedNums(nums, v) {
  var [origNumbers, origThreshold] = [numbers, SomeAPI.threshold];
  numbers = nums.slice();
  insertSortedDesc(v);
  nums = numbers;
  [numbers, SomeAPI.threshold] = [origNumbers, origThreshold];
  return nums;
}

numbers = getSortedNums(numbers, 3);
numbers = getSortedNums(numbers, 5);
numbers = getSortedNums(numbers, 4);
numbers = getSortedNums(numbers, 1);
numbers = getSortedNums(numbers, 2);
numbers; // [5,4,3,2,1]
```

## Argument Adapters

> Parameters and arguments refer to different things. Parameter is the number of the argument, while argument is the value.

The "shape of the function" can have some names ie unary, binary etc.

```javascript
// unary
function increment(x) {
  return sum(x, 1);
}

// binary
function sum(x, y) {
  return x * y;
}
```

HOF: Higher order function receives or returns one or more functions.

Taking a unary function to become a binary:

```javascript
function unary(fn) {
  return function one(arg) {
    return fn(arg);
  };
}

function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

function f(...args) {
  return args;
}

var g = unary(f);
var h = binary(f);

g(1, 2, 3, 4); // [1]
h(1, 2, 3, 4); // [1,2]
```

It is critical here to know that we can take an function and adapt its shape.

If you knows things do not fit, you need to be able to see how we can adapt a function to make it work the way we need. HOFs are key to functional programming.

> In functional programming, we want to fit in the lego pieces that apply to what we want. We should use the standard naming and utilities that are available.

### Spread adapter

`g` is the `apply` of `f`:

```javascript
function spreadArgs(fn) {
  return function spread(args) {
    return fn(...args)
  }
}

function f(a,b,c,d) {
  return a + b + c +d
}

function g = spreadArgs(f)

f([1,2,3,4]);
```

## Point-Free

> It is a style of defining a function without writing a function. We want to define a function without having to define its inputs.

```javascript
// person it the input point for the
// renderPerson function
getPerson(function onPerson(person) {
  return renderPerson(person);
});

// Since they have the same shape, we
// can just pass in the function.
// This is called equational reasoning.
// Now we haven't had to list the point.
getPerson(renderPerson);
```

Equational reasoning is when two functions have equivalent function shapes.

> If the code is not more readable and beneficial, then don't use point free and equational reasoning.

An example of a point free refactor:

```javascript
function isOdd(v) {
  return v % 2 == 1;
}

function isEven(v) {
  return !isOdd(v);
}

isEven(4); // true
```

Know that is functional programming, sometimes it is better to be a little repetitive. We are explicit here in the relationship between `isOdd` and `isEven`.

> When we have points, we have a explicit, imperative way of programming but we are moving towards the declarative code as it is more implicit.

We do this by adapter the shape of a fucntion.

```javascript
// sometimes called complement in FP
function not(fn) {
  return function negated(...args) {
    return !fn(...args)
  }
}
function isOdd(v) {
  return v % 2 == 1;
}

function isEven(v) = not(isOdd)

isEven(4); // true
```

### Advanced Point-Free

Functional programmers care a lot about the shape of the fuctions. Not just the number of args, but also the order.

```javascript
function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}
```

We now use this to `isOdd` this way:

```javascript
var mod2 = mod(2);
var eq1 = eq(1);

// this is moving a big way
// from operators to functions
function isOdd(x) {
  return eq1(mod(x));
}
```

From here, we have a more specialised function that we can compose to make point-free:

```javascript
var mod2 = mod(2);
var eq1 = eq(1);

// this is moving a big way
// from operators to functions
function isOdd(x) {
  return eq1(mod(x));
}

// compare this to isOdd using
// equational reasoning
function compose(fn2, fn1) {
  return fucntion composed(v) {
    return fn2(fn1(v))
  }
}

// we can declare isOdd based on the
// equational reasoning
var isOdd = compose(eq1,mod2)

// final point-free definition
var isOdd = compose(eq(1), mod(2))
```

## Closure

> Definition: Closure is when a function "remembers" the variabels around it even when that function is executed elsewhere.

```javascript
// example of closure
function makeCounter() {
  var counter = 0;
  return function increment() {
    return ++counter;
  };
}

var c = makeCounter();

c(); // 1
c(); // 2
c(); // 3
```

Note that closure is not functionally pure, but it ca be used. The closure in the above example is impure because it doesn't return the same output.

Here is one of the examples of closure that we saw:

```javascript
function unary(fn) {
  return function one(arg) {
    return fn(arg);
  };
}
```

## Lazy vs Eager Execution

When to understand the idea of deferring when things are executing.

```javascript
function repeater(count) {
  return function allTheAs() {
    return ''.padStart(count, 'A');
  };
}

var A = repeater(10);
A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"
```

This example is known as deferring/lazy we we defer the execution until `A` is called. By adding the extra layer for deferring, we can ensure execution happens later.

What happens if the above is expensive work? Currently, `A` is being lazy and the expense always occurs. We can be `eager` to prevent all the work from happening:

```javascript
function repeater(count) {
  var str = ''.padStart(count, 'A');
  return function allTheAs() {
    return str;
  };
}

var A = repeater(10);
A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"
```

There are pros and cons to using `lazy` or `eager` closures. That is a trade off.

How can we occur if the work had be done before and not do it again? We can use `memoization`:

```javascript
// We are closed over something that s
// is changeing - this should give flags
// that is could be impure.
// The code itself is pure once we
// look further into how the code is
// used. It has a high degree of
// confidence.
function repeater(count) {
  var str;
  return function allTheAs() {
    if (str == undefined) {
      str = ''.padStart(count, 'A');
    }

    return str;
  };
}

var A = repeater(10);
A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"
```

How can we achieve this level of performance without shooting ourselves in the foot?

```javascript
// much more obviously pure
function repeater(count) {
  return memoize(function allTheAs() {
    return ''.padStart(count, 'A');
  });
}

var A = repeater(10);
A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"
```

There is a cost for `memoization` - it will take up memory. You need to understand if the usage pattern says you would benefit from the performance.

## Referential Transparency

Finally - we are ready to get the answer of what a pure function is. Here is the canonical definition:

> If I can take the return value of that function call and replace the function call with the return. There is a special term for this, called `referential transparency`.

Referential transparency is key in Haskell given the guarentee of the language.

The "real" benefit of referential transparency is the readability to the user.

### Generalised to specialised

This is concept of taking a generalised function and creating a clearer relationship.

Is there a way to define more specialised functions without creating clutter?

> Remember: Parameter Order is very important with the aim of going left with the most general to the most specific. The example used here is why the array is passed before the callback in `map`.

## Partial Applications & Currying

One way to go about specialisation is partial application.

> Partial application is partially adding an argument of a functional a step at a time.

```javascript
function ajax(url, data, cb) {
  /* ... */
}

var getCustomer = partial(ajax, CUSTOMER_API);
var getCurrentUser = partial(getCustomer, { id: 42 });
getCustomer({ id: 42 }, renderCustomer);
getCurrentUser(renderCustomer);
```

Currying is the more common form of specialisation.

```javascript
function ajax(url, data, cb) {
  return function getData(data) {
    return function getCB(cb) {
      /* ... */
    };
  };
}

// "manual currying" - calling the function
ajax(CUSTOMER_API)({ id: 42 })(renderCustomer);

// specialising
getCustomer = ajax(CUSTOMER_API);
getCurrentUser(renderCustomer);
```

> In Haskell, all functions are unary, and currying is the requirement.

We have a `curry` utility that can do all of this for us:

```javascript
// takes how many arguments you expect to receieve
// then the function
var ajax = curry(3, function ajax(url, data, cb) {
  /* ... */
});

// specialising
getCustomer = ajax(CUSTOMER_API);
getCurrentUser(renderCustomer);
```

### Partial Application vs Currying

1. Both are specialisation techniques.
2. Partial Application presents some arguments now, receives the rest on the next call.
3. Currying doesn't preset any arguments. Receives each argument on at a time.

There is a notion of strict vs loose currying. If you provide only one input at a time, that is know as `strict currying`. The `loose currying` is to provide multiple inputs in one call.

### Changing function shape with currying

If we use currying, we can then be point free at how we're running.

```javascript
function add(x, y) {
  return x + y;
}

[0, 2, 4, 6, 8].map(function addOne(v) {
  return add(1, v);
});
// [1,3,5,7,9]

// adapting to become point free
add = curry(add);
[(0, 2, 4, 6, 8)].map(add(1));
// [1,3,5,7,9]
```

## Composition

The following code we're going to use to try illustrate the benefit of composition:

```javascript
function minus2(x) {
  return x - 2;
}
function triple(x) {
  return x * 3;
}
function increment(x) {
  return x + 1;
}

// add shipping rate
var tmp = increment(4);
tmp = triple(tmp);
totalCost = basePrice + minus2(tmp);
```

Composition works from right-to-left. The analogy used is the machines that transform elements at differing parts of the conveyor belt journey.

We abstract to create a separation of concerns.

```javascript
function minus2(x) {
  return x - 2;
}
function triple(x) {
  return x * 3;
}
function increment(x) {
  return x + 1;
}

function shippingRate(x) {
  // composing the functions used for the rate
  return minus2(triple(increment(x)));
}

// add shipping rate
totalCost = basePrice + shippingRate(4);
```

### Piping vs Composition

```javascript
function minus2(x) {
  return x - 2;
}
function triple(x) {
  return x * 3;
}
function increment(x) {
  return x + 1;
}

var f = compose(
  minus2,
  triple,
  increment,
);
var p = compose(
  increment,
  triple,
  minus2,
);

f(4); // 13
p(4); // 7

var g = pipeThree(v);
g(4); // 7
```

### Associaitivity

`1 + 2 + 3` - the plus operator is associative, so doesn't matter the order that we put it in.

The same is said with composition.

### Composition With Currying

Because functions generally give one return value, it is vastly more useful to curry and pass unary functions.

## Immutabililty

> The idea that something doesn't change unexpectantly.

Assigment immutability: a variable that cannot be reassigned.

```javascript
var basePrice = 89.99;
const shippingCost = 6.5;
```

In JavaScript however, an array, functions and objects can be mutated (even with the `const` keyword). The `const` keyword just means the assignment is not going to change.

### Value immutability

> Kyle has mentioned that accidental reassignment is never an issue thats come up.

So we can use `Object.freeze` to make a value "read-only". However, this will only make a fatal error.

```javascript
let orderDetails = {
  orderId: 42,
  total: basePrice + shipping,
};

if (orderedItems.length > 0) {
  orderDetails.items = orderedItems;
}

processOrder(Object.freeze(orderDetails));
```

### Read-Only Data Structures

> Data structures that never need to be mutated.

Don't mutate, copy. You should ALWAYS assume that things are read-only and you cannot mutate it. We do this by making a copy of any object.

In real life, we want to mitigate the cost of storing in memory, CPU, garbage collection etc. Immutable data structures in turn tend to store a diff of changes and point back to the original object.

### Immutable.js

This library is here in the interim (from Facebook). The other preferred library is `Mori`. Both have a similar endgoal.

Both libraries handle the optimisation.

The three things we should think about the the immutability:

1. Annotate with `Object.freeze`.
2. Assume any data structure received is read-only.
3. If you need to track changes to data structures, that's what you should do with immutable data structures.

## Recursion

> Not as complicated as it is made to be.

The example shows an iterative loop to go through a sentence. The issue that you have to read the for-loop and mentally execute it to understand what is going.

> Recursion: reducing the problem set.

The idea is to make the problem set smaller and smaller. Ie, check the first element of the string, then the rest of the smaller string.

Recursive definition:

1. Understand the base case.
2. Handle the remaining pattern.

```javascript
function countVowels(str) {
  // base condition
  if (str.length == 0) return 0;

  var first = isVowel(str[0]) ? 1 : 0;
  return first + countVowels(str.slice(1));
}

countVowels('This is the sentence that we want to test');
```

> Recursion is designed to be a declarative approach.

There are some recursion patterns that are common:

1. Solve the subproblems
2. Divide and conquer

There are more to it, but it is worth noting.

### Stack Frames and Memory Limits

In the practical sense, recursion doesn't often get placed into production.

The practical limitation can be understood by understanding memory.

If you're in the middle of function A, but then call function B, you need to somehow store everything from function A. We call it a stack frame, because we have a stack that is growing from these recursive calls. In the stack frame we store local variables, program counter etc.

### Optimisation: Tail Calls

> Tail call: we don't need the current stack frame, so dispatch to another call. Only holds for calls made in the tail position.

Tail calls may not necessarily run faster, but the memory usage is improved.

JavaScript has had in place to not run so far to even run out of memory. There is a limit to how many function calls can be done in depth.
