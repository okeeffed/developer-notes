---
menu: Functional Programming
name: Hardcore FP in JavaScript
---

# Hardcore FP in JavaScrpt

There are notes taken from Frontend Masters course "Hardcore Functional Programming in JavaScrpt"

## Resources

1. [Frontend Masters course](https://frontendmasters.com/courses/functional-javascript/introduction/)

## Introduction

> "Separation and recognition" - the soul of functional programming.

The symptoms:

1. Custom names
2. Looping patterns
3. Glue code
4. Side effects

### Omit Needless Names

Variable declarations from within a function - is it needed? If not, omit and add as an argument.

### Separating Mutation From Calculation

Ask "where is the mutation happening?" For example, the `teaser` function in the example to chop down text in the call `map(teaser(50), all('p'))` is where the mutation is happening. It is important to understand where and how this mutation works for simplification.

In the above example, the `teaser` also ran `setText` from within the function with the mutated text, which is unnecessary for that function and can be abstracted out.

### Recognize Pure Functions

Functions that don't change anything are called "pure".

Their purity makes them:

1. Testable
2. Portable
3. Memoizable
4. Parallelizable

### Separate Functions From Rules

Functions are nouns. Each input (in the domain) should map to a specific output (in the range).

Separate arity from functions:

```javascript
function get(property, object) {
  return object[property];
}
var people = [{ name: 'example' }];

// args up front
function getPersonName(person) {
  return get('name', person);
}

var names = people.map(getPersonName);

// more args later
// - magic happens here -
var names = people.map(get('name'));

// the magic in detail
function curry(fn) {
  return function() {
    if (fn.length > argument.length) {
      var slice = Array.prototype.slice;
      var args = slice.apply(arguments);
      return function() {
        return fn.apply(null, args.concat(slice.apply(arguments)));
      };
    }
    return fn.apply(null, arguments);
  };
}

var get = curry(function(property, object) {
  return object[property];
});
```

Arity is the idea of separating functions and making them only give one thing at a time (currying).

The examples then used in this application where using Ramda.

### Compose

Function can "meld" aka compose. Compose is right-to-left, the opposite of Unix pipe which is left-to-right.

When you can understand the relationship between `map` and `compose` you can start to see the relationship between the two.

### Point Free

Points in this case mean arguments.

## The Voyage

### Category Theory

Here is a simply example: `add(1, 1) // => 2`

Mathematically, we know this:

```javascript
// associative
add(add(1, 1), 4) === add(1, add(1, 4));
// communitive
add(1, 4) === add(4, 1);
// identity
add(n, 0) === n;
// distributive
multiply(2, add(3, 4)) === add(multiply(2, 3), multiply(2, 4));
```

These theorems and formulas make the basis of our work.

```haskell
compose :: (b -> c) -> (a -> b) -> (a -> c)
id :: a -> a
```

You need both a composition AND an identity to form a `category`.

Note: The identity function is if you give it a value it will give it right back.

So we can get some category laws:

```javascript
// left identity
compose(
  id,
  f,
) === f;
// right identity
compose(
  f,
  id,
) === f;
// associativity
compose(
  compose(
    f,
    g,
  ),
  h,
) ===
  compose(
    f,
    compose(
      g,
      h,
    ),
  );
```

### Objects

How do we deal with errors, side effects etc? We use objects. Think of them like:

1. Container/Wrappers for values
2. No methods
3. Not nouns
4. Probably won't be making your own often

The container:

```javascript
var _Container = function(val) {
  this.val = val;
};

// helper for during compose use
var Container = function(x) {
  return new _Container(x);
};

Container(3);
// => _Container { val: 3}
```

In order to map over our container, we can add the following:

```javascript
var _Container.prototype.map = function(f) {
  // this is the important part - it is running
  // the function on the value in the container
  return Container(f(this.val))
}

Container("flamethrower").map(function(s) { return capitalize(s)})
Container("flamethrower").map(capitalize)
// => Container("Flamethrower")
```

> The general idea is that we go within the object and run a function on the object.
