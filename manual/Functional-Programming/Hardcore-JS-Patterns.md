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
6. [Monoid Codepen Exercises](https://codepen.io/joumanae/pen/XWbEdbR?editors=0010)
7. [What are these Math Symbols?](https://www.intellecquity.com/what-does-mean-in-math)
8. [Function Modelling Codepen Exercises](https://codepen.io/drboolean/pen/qeqpgB?editors=0010)
9. [Fantasy-land figures](https://github.com/fantasyland/fantasy-land/blob/master/figures/dependencies.png)

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

## Creating a Validation Library

First, we go through a basic implementation using Either.

```javascript
import List from 'immutable-ext'
import {Either} from '../types'
const {Left, Right} = Either

const isPresent = x => !!x

const validate = (spec, obj) => {
  List.(Object.keys(spec)).foldMap(key => {
    spec[key](obj[key]) ? Right(obj) : Left(`${key} bad`)
  }, Either.of(obj))
}

const validations = {name: isPresent, email: isPresent}
const obj = {name: 'brian', email: 'brian@brian.com'}
const res = validate(validations, obj) // obj | []

res.fold(console.error, console.log)
```

This doesn't really do what we want it to do, so let's make our own `Success` and `Failure` types and these can be a "subclass" of a Validation type.

## Creating Success & Fail Monoids

```javascript
import List from 'immutable-ext'
import {Either} from '../types'
const {Left, Right} = Either

const isPresent = x => !!x

const Success = x => ({
  x,
  isFail: false,
  fold: (f, g) => g(x),
  concat: other => (other.isFail ? other : Success(x)),
});

const Failure = x => ({
  x,
  isFail: true,
  fold: (f, g) => f(x),
  concat: other => (other.isFail ? Fail(x.concat(other.x)) : Fail(x)),
});

const validate = (spec, obj) => {
  List.(Object.keys(spec)).foldMap(key => {
    spec[key](obj[key]) ? Success(obj) : Failure(`${key} bad`)
  }, Success.of(obj))
}

// just check if both are present for now
const validations = {name: isPresent, email: isPresent}
const obj = {name: 'brian', email: 'brian@brian.com'}
const res = validate(validations, obj) // obj | []

res.fold(console.error, console.log) // [{name: 'brian', email: 'brian@brian.com'}]

const obj2 = {name: 'brian', email: ''}
const res2 = validate(validations, obj2) // obj | []
res2.fold(console.error, console.log) // ['email bad']

const obj3 = {name: '', email: ''}
const res3 = validate(validations, obj3) // obj | []
res3.fold(console.error, console.log) // ['name bad', 'email bad']
```

You can then start to weigh up your options about how you want to go about things.

## Creating the Validation Monoid

```javascript
// any alternative approach to `isPresent` but loses the key.
const isPresent = Validation(key, x => !!x ? Success(x) : Fail([`${key} needs to be present`]))

const isEmail = Validation(key, x => /@/.test(x) ? Success(x) : Fail([`${key} needs to be an email`]))

// The validation super class we need
const Validation = run => ({
  run,
  concat: other => Validation((key, x) => run(key,x).concat(other.run(key.x)))
})

const validate = (spec, obj) => {
  List.(Object.keys(spec)).foldMap(key => {
    spec[key].run(obj[key])
  }, Success.of(obj))
}

const validations = {name: isPresent, email: isPresent.concat(isEmail)}
```

## Function Modelling

```javascript
// [1]
const { Either } = require('../types');

const toUpper = x => x.toUpperCase();
const exclaim = x => x.concat('!');

const Fn = run => ({
  run,
  map: f => Fn(x => f(run(x))),
  concat: other => Fn(x => run(x).concat(other.run(x))),
});

const res = Fn(toUpper)
  .concat(Fn(exclaim))
  .run('fp sux');
console.log(res); // 'FP SUXfp sux!'

// [2] After adding in the capability to chain and promote to a Monad.
// Note: This is forming the basis of what is known as the Reader Monad.
const { Either } = require('../types');

const toUpper = x => x.toUpperCase();
const exclaim = x => x.concat('!');

const Fn = run => ({
  run,
  chain: f => Fn(x => f(run(x)).run(x)),
  map: f => Fn(x => f(run(x))),
  concat: other => Fn(x => run(x).concat(other.run(x))),
});

Fn.of = x => Fn(() => x);

const res = Fn(toUpper)
  // This is called a Reader because we can transform
  // and still get back to the original
  .chain(upper => Fn(x => [upper, exclaim(upper)]))
  .run('hi');
console.log(res); // ['HI', 'hi!']

const res = Fn('hello')
  .map(toUpper)
  .chain(upper => Fn(x => [upper, exclaim(upper)]))
  .run('hi');
console.log(res); // ['HELLO', 'hi!']

// [3] Making the method more convenient - this becomes the Reader Monad!
Fn.ask = Fn(x => x);

const res = Fn(toUpper)
  // This is called a Reader because we can transform
  // and still get back to the original
  .chain(upper => Fn(x => [upper, exclaim(upper)]))
  .run('hi');
console.log(res); // ['HI', 'hi!']

const res = Fn('hello')
  .map(toUpper)
  .chain(upper => Fn.ask.map(config => [upper, config]))
  .run({ port: 3000 });
console.log(res); // ['HELLO', {port: 3000}]
```

> The idea is that you can do dependency injection in here. You could pass in things like the db or strategy etc.

## The Endo Functor

What if we would rather (instead of combining functions by running both and combining the results) is create a composition as concatenation?

```javascript
const toUpper = x => x.toUpperCase();
const exclaim = x => x.concat('!');

const Endo = run => ({
  run,
  concat: other => Endo(x => run(other.run(x))),
});

// this is using the identity function again so
// we do not have to pass an arg to Endo.empty
Endo.empty = () => Endo(x => x);

List([(toUpper, exclaim)])
  .foldMap(Endo, Endo.empty())
  .run('hello');

console.log(res); // Hello!
```

> It's called `Endo` because it only works with `Endomorphisms` which means it can only go from type `a -> a` ie `String -> String`.

## Contramap

These are useful for if there is a bunch of functions that you want to combine. Contramaps allow us to pull out values during the execution.

```javascript
const Reducer = run => ({
  run,
  contramap: f => Reducer((acc, x) => run(acc, f(x))),
});

// Example
Reducer(login)
  .contramap(pay => pay.user)
  .concat(Reducer(changePage).contramap(payload => payload.currentPage))
  .run(state, { user: {}, currentPage: {} });
```

> Contramap is called a `Contravariant Functor`. If you have a `map` and `contramap` where you can change the input AND the output it is called a `Profunctor`.

## Function Modelling Equivalences

```javascript
const login = (state, payload) =>
  payload.email
    ? Object.assign({}, state, { loggedIn: checkCreds(payload.email, payload) })
    : state;

const setPrefs = (state, payload) =>
  payload.prefs ? Object.assign({}, state, { prefs: payload.prefs }) : state;

// (acc, a) -> acc
// (a, acc) -> acc
// a -> (acc -> acc)
// a -> Endo(acc -> acc)

// Fn(a -> Endo(acc -> acc))
const Reducer = run => ({
  run,
  contramap: f => Reducer((acc, x) => run(acc, f(x))),
  concat: (acc, x) => run(acc, f(x)),
});

// instead of this, we can use our knowledge of equivalences
// mentioned above to rewrite this
const reducerNotIdeal = Reducer(login).concat(Reducer(setPrefs));

const state = { loggedIn: false, prefs: {} };
const payload = { email: 'admn', pass: 123, prefs: { bgColor: '#000' } };

console.log(reducer.run(state, payload));

// ... to this
const login = payload => Endo(state) =>
  payload.email
    ? Object.assign({}, state, { loggedIn: checkCreds(payload.email, payload) })
    : state;

const setPrefs = payload => Endo(state) =>
  payload.prefs ? Object.assign({}, state, { prefs: payload.prefs }) : state;

const reducer = Fn(login).concat(Fn(setPrefs));


const state = { loggedIn: false, prefs: {} };
const payload = { email: 'admn', pass: 123, prefs: { bgColor: '#000' } };

console.log(reducer.run(payload).run(state));

// or this
const login = payload => state =>
  payload.email
    ? Object.assign({}, state, { loggedIn: checkCreds(payload.email, payload) })
    : state;

const setPrefs = payload => state =>
  payload.prefs ? Object.assign({}, state, { prefs: payload.prefs }) : state;
const reducer = Fn(login).map(Endo)concat(Fn(setPrefs).map(Endo));
```

Knowing these functional equivalences gives you the ability to model things based on what is available in the APIs as well as structuring your APIs.

## Composing Functors

> For those familiar with `fold`, `extract` does not take a function and pass it to the function, it just takes it out.

The example given here is creating a function `TaskEither` by composition of functors `Task`, `Either`.

Here we get an issue that we cannot write a `chain` method.

## Monad Transformers

Helps us around the chaining issue that came up from composing functors.

```javascript
const users = []; // pretend an array of users
const following = []; // pretend an array of objects of user following user
const find = (table, query) =>
  Task.of(Either.fromNullable(_.find(table, query)));

const app = () =>
  find(users, { id: 1 }) // Task(Either(User))
    .chain(eu =>
      eu.fold(Task.rejected, u => find(following, { follow_id: u.id })),
    )
    .chain(eu => eu.fold(Task.rejected, fo => find(users, { id: fo.user_id })))
    .fork(console.err, eu => eu.fold(console.error, console.log));

app(); // returns User object ie {id: 2, name: 'Marc'}
```

So we note this sucks, so we want to transform this into a `TaskEither` monad:

```javascript
const { TaskT, Task, Either } = require('../types');
const { Left, Right } = Either;

// This thing knows how to "chain" chain
const TaskEither = TaskT(Either);
// an interesting tidbit - Task = TaskT(Id);

const users = []; // pretend an array of users
const following = []; // pretend an array of objects of user following user
const find = (table, query) =>
  TaskEither.lift(Either.fromNullable(_.find(table, query))); // gives Task(Either(x)) by lifting instead of Task(Either(Either(x)))

const app = () =>
  find(users, { id: 1 }) // Task(Either(User))
    .chain(u => find(following, { follow_id: u.id }))
    .chain(fo => find(users, { id: fo.user_id }))
    .fork(console.err, eu => eu.fold(console.error, console.log));

app(); // returns User object ie {id: 2, name: 'Marc'}
```
