---
menu: JavaScript
name: FP Composing Software
---

# FP Composing Software

## Resources

1. [Composing Software series - Eric Elliot](https://gist.github.com/Geoff-Ford/51024380f4426d2bdca633d9217f9bcc)
2. [Understanding Monads](https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8)

> "Once you understand monads, you immediately become incapable of explaining them to anyone else" Lady Monadgreen’s curse ~ Gilad Bracha (used famously by Douglas Crockford)

## Understanding Monads in JS

> A monad is a way of composing functions that require context in addition to the return value, such as computation, branching, or I/O. Monads type lift, flatten and map so that the types line up for lifting functions `a => M(b)`, making them composable. It's a mapping from some type `a` to some type `b` along with some computational context, hidden in the implementation details of lift, flatten, and map.

- Functions map: `a => b`
- Functors map with context: `Functor(a) => Functor(b)`
- Monads flatten and map with context: `Monad(Monad(a)) => Monad(b)`

What does "flatten", "map" and "context" mean?

- Map: Apply a function to a and return b. Given some input, return some output.
- Context: Computational detail of the monad's composition (including lift, flatten and map). The point of functors and monads is to abstract that context away so we don't have to worry about it while we're composing things. Mapping inside the context means that you apply a function from `a => b` to the value inside the context, and return a new value `b` wrapped inside the same kind of context. Ie `Array(a) => Array(b)`, `Observable(a) => Observable(b)`.
- Type lift: Lift a type into a context, blessing the value with an API that you can use to computer from that value, trigger contextual computations etc. `a => F(a)`.
- Flatten: Unwrap the value from the context.

The associated example from the blog that sets `Array` as the context and `x` as the value we're mapping over:

```javascript
const x = 20; // Some data of type `a`
const f = n => n * 2; // A function from `a` to `b`
const arr = Array.of(x); // The type lift.
// JS has type lift sugar for arrays: [x]
// .map() applies the function f to the value x
// in the context of the array.
const result = arr.map(f); // [40]
```

The example did not include an array of arrays, but that can still be flattened:

```javascript
[[1], [2, 3], [4]].flat(); // [1, 2, 3, 4] or
[].concat.apply([], [[1], [2, 3], [4]]); // [1, 2, 3, 4]
```

### The Essence of Monads

- Functions map: `a => b` which lets you compose functions of type `a => b`
- Functors map with context: `Functor(a) => Functor(b)`, which lets you compose functions `F(a) => F(b)`
- Monads flatten and map with context: `Monad(Monad(a)) => Monad(b)`, which lets you compose lifting functions `a => F(b)`

```javascript
// composing functiond
g:           a => b
f:                b => c
h = f(g(a)): a    =>   c

// composing functors
g:             F(a) => F(b)
f:                     F(b) => F(c)
h = f(g(Fa)):  F(a)    =>      F(c)

// composing functions without Monads - uh oh
g:                  a => M(b)
f:                       b => M(c)
h = composeM(f, g): a    =>   M(c)

// f was expecting b, but got M(b)
// so we us the flatten map process,
// often called .bind() or .chain()
g:             a => M(b) flattens to => b
f:                                      b           maps to => M(c)
h composeM(f, g):
               a       flatten(M(b)) => b => map(b => M(c)) => M(c)
```

Let's go a real world example of `compose` vs `composeM`:

```javascript
// Using compose
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const trace = label => value => {
  console.log(`${label}: ${value}`);
  return value;
};

const label = 'API call composition';
// a => Promise(b)
const getUserById = id =>
  id === 3 ? Promise.resolve({ name: 'Kurt', role: 'Author' }) : undefined;
// b => Promise(c)
const hasPermission = ({ role }) => Promise.resolve(role === 'Author');
// Try to compose them. Warning: this will fail.
const authUser = compose(
  hasPermission,
  getUserById,
);
// Oops! Always false!
authUser(3).then(trace(label));

// Using composeM
const composeM = chainMethod => (...ms) =>
  ms.reduce((f, g) => x => g(x)[chainMethod](f));
const composePromises = composeM('then');
const label = 'API call composition';
// a => Promise(b)
const getUserById = id =>
  id === 3 ? Promise.resolve({ name: 'Kurt', role: 'Author' }) : undefined;
// b => Promise(c)
const hasPermission = ({ role }) => Promise.resolve(role === 'Author');
// Compose the functions (this works!)
const authUser = composePromises(hasPermission, getUserById);
authUser(3).then(trace(label)); // true
```

### What Monads are made of

> A monad is based on a simple symmetry — A way to wrap a value into a context, and a way to unwrap the value from the context.

- Lift/Unit: A type lift from some type into a Monad context `a => M(a)`.
- Flatten/Join: Unwrapping the type from the context `M(a) => a`.

Since Monads are also functors, they can also map:

- Map: Map with context preserved: `M(a) -> M(b)`.

Combining flatten with map, you get `chain` - function composition for monad-lifting functions (Kleisli composition):

- FlatMap/Chain: Flatten + map: `M(M(a)) => M(b)`.

### Identity Monad

```javascript
// Identity monad
const Id = value => ({
  // Functor mapping
  // Preserve the wrapping for .map() by
  // passing the mapped value into the type
  // lift:
  map: f => Id.of(f(value)),
  // Monad chaining
  // Discard one level of wrapping
  // by omitting the .of() type lift:
  chain: f => f(value),
  // Just a convenient way to inspect
  // the values:
  toString: () => `Id(${value})`,
});
// The type lift for this monad is just
// a reference to the factory.
Id.of = Id;
```
