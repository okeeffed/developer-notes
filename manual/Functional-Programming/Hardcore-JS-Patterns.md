---
menu: Functional Programming
name: Hardcore JS Patterns
---

# Hardcore JS Patterns

> The payoff of these patterns happens as our app scales.

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/hardcore-js-patterns)
2. [Course Slides](https://docs.google.com/presentation/d/1L5gxYQz2hyzbVJk5tkyNdDidf_cg4I1BlIGd_Y9jblU/edit#slide=id.g338d117be_040)
3. [What is a semigroup?](https://subscription.packtpub.com/book/application_development/9781785883880/8/ch08lvl1sec68/semigroup)
4. [What is a Set?](<https://en.wikipedia.org/wiki/Set_(abstract_data_type)>)
5. [FP Jargon: Semigroup](https://github.com/hemanth/functional-programming-jargon#semigroup)
6. [Monoid Exercises](https://codepen.io/joumanae/pen/XWbEdbR?editors=0010)
7. [What are these Math Symbols?](https://www.intellecquity.com/what-does-mean-in-math)

## Introduction

During the introduction, Brian refers to the Domain Driven Design book.

> First goal: Functions with defined contracts.

Brian demostracts a "composable contract for this generic function" with the function being `joinWithSpace`:

```javascript
const user = { firstName: 'Bobby', lastName: 'Fischer' };
const joinWithSpace = (...args) => args.join(' ');

joinWithSpace(user.firstName, user.lastName);
joinWithSpace('a', 'b', 'c'); // 'a b c'
joinWithSpace(joinWithSpace('a', 'b'), 'c'); // 'a b c'
joinWithSpace('a', joinWithSpace('b', 'c')); // 'a b c'

// becoming even more generic
joinWithSpaces = joinable => joinable.join(' ');
joinWithSpace([user.firstName, user.lastName]);
```

> The aim is that we want "highly generalized functions"

## Composition Architecture

When we use composition:

- Satisfy use cases
- Simple, understandable pieces
- Reuse
- Harder to change implementation
- Harder for user to compose

The opposite side when we are not using composition:

- Flexibility in implementation changes
- Less use cases to support
- Flags, is/else
- Won't satisfy all cases
- Less reuse

> Note: There is a reason to use both.

## Normalize Effect Types

Monads don't actually compose. Functors compose and monoids compose. We focus on normalizing everything into the one shape.

> Normalize effect types throughout the app.

## Semigroups

> In computer science, a Semigroup is an algebraic structure that has a set and a binary operation that takes two elements in the set and returns a Semigroup that has an associative operation. Note that the official definition of a Set is an abstract data type that can store unique values, without any particular order, although I believe Semigroups don't require a unique Set.

Closed means that we are going to get the same data type back that we're operating on.

```javascript
1 + 2 + 6; // this is associative but also closed meaning we can only use the data type
2 * 5 * 8; // again, closed under data type
10 / 4 / 2; // neither closed nor associative
true && true && false; // associative
```

> If you are closed and associative, then you are also parallel. This means you could chuck smaller compositions into multiple servers, get the results back and combine and you'll be peaches.

In addition to the official definition of semigroups, in programming a semigroup is an object that has a `concat` function that combines it with another object of the same type.

```javascript
[1].concat([2]); // [1, 2]
```

From the course:

```javascript
// semigroups defined
const Sum = x => ({
  x,
  concat: other => Sum(x + other.x),
});

Sum(3).concat(Sum(5)); // Sum(8)

const Product = x => ({
  x,
  concat: other => Product(x * other.x),
});

Product(3).concat(Product(5)); // Product(15)

// Any
const Any = x => ({
  x,
  concat: other => Any(x || other.x),
});

Any(true).concat(Any(false)); // Any(true)

// String Concat
const String = x => ({
  x,
  concat: other => String(x + other.x),
});

String('hi').concat(String('!')); // String('hi!')
```

## Monoids

> Monoids are just a semigroup with an "identity"

```javascript
// monoids
const Sum = x => ({
  x,
  concat: other => Sum(x + other.x),
});

Sum.empty = () => 0;
Sum(0).concat(Sum(5)); // Sum(5)
Sum.empty().concat(Sum(5)); // Sum(5)

const Product = x => ({
  x,
  concat: other => Product(x * other.x),
});

Product.empty = () => Product(1);

Product(1).concat(Product(10)); // Product(10)
Product.empty().concat(Product(10)); // Product(10) - programming to an interface, not a specific value

// Any
const Any = x => ({
  x,
  concat: other => Any(x || other.x),
});
Any.empty = () => false;

Any.empty().concat(Any(false)); // Any(false)
Any.empty().concat(Any(true)); // Any(true)
```

So why does identity matter here? Null values.

In our day-to-day, if I was to run through a list and reduce it down, if you don't have a starting value you will get a `null` or `undefined`, but if you have a starting value then these two correspond to reduce.

```javascript
const res1 = [1, 2, 3, 4, 5].map(Sum).reduce((acc, n) => acc.concat(n)); // 15
const res2 = [].map(Sum).reduce((acc, n) => acc.concat(n)); // uh oh! error
const res2 = [].map(Sum).reduce((acc, n) => acc.concat(n), Sum.empty()); // Ahhh safe! We got a zero.
```

In practice, we don't need the whole `[1, 2, 3, 4, 5].map(Sum).reduce((acc, n) => acc.concat(n), Sum.empty())` line. If we used something like `List` from immutable JS that has a `foldMap` method, we could run `List([1, 2, 3, 4, 5]).foldMap(Sum, Sum.empty())`.

## Semigroups vs Monoids

Here we show that you cannot promote a semigroup to a monoid with an identity.

```javascript
// Note: we cannot actually provide a identity for this.
const Intersection = x => ({
  x,
  // assume Lodash lib utility in
  concat: other => Intersection(_.intersection(x, other.x)),
});
```

In the above case, we note that we cannot promote an `Intersection` from a semigroup into a monoid.

## Identity Functor

```javascript
// assume types defined elsewhere
const { Id, Task, Either } = require('../types');
const { Left, Right } = Either;

const res = Id.of(Sum(2)).concat(Id.of(Sum(5))); // Id(Sum(5))
console.log(res.extract()); // the same as fold
```

> Id is a monoid if what it is holding is a monoid.

## Concat Method

Here we look at what it looks like to concat a few functors together:

```javascript
// assume types defined elsewhere
const { Id, Task, Either } = require('../types');
const { Left, Right } = Either;

const res1 = Right('hello ').concat(Right('world')); // Right('hello world')
res.fold(console.log, console.log);

const res2 = Right('hello ').concat(Left('arrhhihiuh')); // Left('arrhhihiuh')
res.fold(console.log, console.log);

const res3 = Task.of('hello ').concat(Task.of('cruel world')); // Task.of('hello cruel world')
res.fork(console.log, console.log); // 'hello cruel world'

const res3 = Task.of(['hello']).concat(Task.of(['cruel world'])); // Task.of(['hello', 'cruel world'])
res.fork(console.log, console.log); // ['hello', 'cruel world']

const res3 = Task.of(['hello']).concat(Task.rejected('error')); // Task.rejected('error')
res.fork(console.log, console.log); // 'error'
```

> Whenever you concat, make sure you never fall out of the type ie always return the result wrapped in the type.

```javascript
const Alternative = x => ({
  x,
  concat: other => Alternative(other.x.isLeft ? x : x.concat(other.x)),
});

const res = Alternative(Right('hi')).concat(Alternative(Left('bye')));
console.log(res.x.fold(id, id)); // 'hi'

const res = Alternative(Right('hi'))
  .concat(Alternative(Right('!!!!!')))
  .concat(Alternative(Left('bye')));
console.log(res.x.fold(id, id)); // 'hi!!!!!'

// reducing to be prettier
const res = List([Right('a'), Right('b'), Left('c')]).foldMap(
  Alternative,
  Alternative(Right('')),
); // mapping into Alternative but also providing the starting point (could be identity)
console.log(res.x.fold(id, id)); // 'ab'

const res = List([Right('a'), Left('b'), Right('c')]).foldMap(
  Alternative,
  Alternative(Right('')),
); // mapping into Alternative but also providing the starting point (could be identity)
console.log(res.x.fold(id, id)); // 'ac'
```

> You'll end up making your own monoids more than you'll end up making your own functors.

## Monoid Use Casses

Using it to concat responses from multiple server calls.

```javascript
// getting an array of Promises
const getAppAlerts = () => fetch('/alerts').then(x => x.json());
const getDirectMessages = () => fetch('/dm').then(x => x.json());

getAppAlerts().concat(getDirectMessages()); // Promise([{id: 1, msg: "Policy update"}, {id: 2, msg: 'hi from spain'}])

// map is a way to define a semigroup
const getPost = () =>
  fetch('/post')
    .then(x => x.json())
    .then(Map);
const getComments = () =>
  fetch('/comments')
    .then(x => x.json())
    .then(comments => Map({ comments }));

// thanks to concat, we can assign the comments to the blog post
getPost().concat(getComments()); // Promise(Map({id: 3, body: 'Redux is over', comments: []}))
```

Concating from files

```javascript
const readFile = promisify(fs.readFile);
const filepaths = ['one.txt', 'two.txt', 'three.txt'];
filepaths.foldMap(readFile, Promise.resolve(''));
```
