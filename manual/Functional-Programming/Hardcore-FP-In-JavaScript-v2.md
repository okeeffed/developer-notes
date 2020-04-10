---
menu: Functional Programming
name: Hardcore FP In JavaScript v2
---

# Hardcore FP In JavaScript v2

## Resources

1. [Functional Programming](https://frontendmasters.com/courses/hardcore-js-v2/)
2. [Currying Codepen](https://codepen.io/drboolean/pen/OJJOQMx?editors=1010)
3. [Compose Codepen](https://codepen.io/drboolean/pen/zYYPmZO)
4. [Functor Codepen](https://codepen.io/drboolean/pen/poodxOm?editors=0010)
5. [Either Codepen](https://codepen.io/drboolean/pen/xgoeWR?editors=0010)
6. [Task Codepen](https://codepen.io/drboolean/pen/Mparbp?editors=0010)
7. [GitHub Repo for course](https://github.com/FrontendMasters/hardcore-functional-js-v2)

## Pure Functions

The definition of a function from set theory is that inputs singularly map to outputs ie one input has an output. A single-valued collection of pairs.

> Anything that is not one input to an output in the range fails the defintion of a function and things can be done deterministically. This is what makes it "deterministic".

Because of this relationship, you could build tables or map to a function graph (think sinusoidal wave) where a input from the domain maps to an output in the range.

A "total function" (as opposed to a "partial function") means that for every input there is a corresponding output.

The other requirement for a pure function is that there are no side effects (no observable effects besides computing a value). Of course there are side effects depending how deep you go into it, but it is a little up to user discression.

> An interesting example was that throwing an error was considering to not be a pure function, although a promise that rejects is. The speaker says you can debate whether this is functional or not.

A great example that came up:

```javascript
// not a function
const signUp = attrs => {
  let user = saveUser(attrs);
  welcomeUser(user);
};

// function
const signUp = attrs => () => {
  let user = saveUser(attrs);
  welcomeUser(user);
};
```

> "Kicking the side effect" down the road is a lot of the work arounds that they do to keep functions pure and composable etc.

## Why Pure Functions?

- Reliable
- Portable
- Reusable
- Testable
- Composable
- Properties/Contract

## Properties of FP

```javascript
// associative
add(add(x, y), z) == add(x, add(y, z));

// commutative
add(x, y) == add(y, x);

// identity
add(x, 0) == x;

// distributive
add(multiply(x, y), multiply(x, z)) == multiply(x, add(y, z));
```

## Currying

```javascript
// this
const add1 = (x, y) => x + y;
// could become
const add2 = ([x, y]) => x + y;

add1(x, y) == add2([1, 2]);

// so we could think of this
const toPair = f => ([x, y]) => add(x, y);
toPair(add)([1, 2]); // equates to the above

// we could also do
const fromPair = f => (x, y) => add([x, y]);

const res = fromPair(toPair(add))(1, 2);

// since we know the args are equivalent...
// proves isomorphism
const flip = f => (y, x) => f(x, y); // communative
const flipRes = flip(add)(1, 2);

// finally we get curry!
const curry = f => x => y => f(x, y);
const curriedAdd = curry(add);
const increment = curriedAdd(1);
const result = increment(2);
console.log(result);
```

> For curried functons, you should always leave the data as the last argument.

A nice final example given was currying a replace function:

```javascript
const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement),
);

const replaceVowels = replace(/[aeiou]/gi, '');
const reesult = getOdds('Hey this works');
console.log(result);
```

> "If you are tying data to all of your functions, then you are incidentally tying all of your functions to that domain." - This hints at point-free.

## Partial Application vs Currying

Currying expects one argument at a time. Partial Applications takes some of the arguments.

There is a capability with a `partial` functional to do this.

## Compose

Composing takes the idea of `(f, g) => (x) => f(g(x))` and works because of the properties of functional programming.

A scratch pad of this in action:

```javascript
import { curry, compose, map } from 'ramda';

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const curryAdd = curry(add);
const increment = curryAdd(1);

const curryMultiply = curry(multiply);
const double = curryMultiply(2);

const func = map(
  compose(
    double,
    increment,
  ),
);

func([1, 2]); // [ 4, 6]
```

You can even abstract any composition in any sub composition!

> Left-to-right pipe is the flip or compose.

## Functors

> "Things aren't so dot chainable out of the box."

We are going to introduce an identity functor called "Box".

```javascript
// we need Box to help dot chain this
const nextCharForNumberString = str => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = new Number(number + 1);
  return String.fromCharCode(nextNumber);
};

const result = nextCharForNumberString('  64 ');
console.log(result);

// the solution

// here we basically say run a function and keep it
// in the box
const Box = x => ({
  map: f => Box(f(x)),
  chain: f => f(x),
  fold: f => f(x),
  inspect: `Box(${x})` // just for logging purposes
});

// For example - Array is an example of keeping things "in the box"
const example = () =>
  ['a']
  .map(x => x.toUpperCase); // ['A'] <- still in the "box"
  .map(x => String.fromCharCode(x)); // ['\u0000'] <- still in the "box"

// the Box in action
const exampleWithBox = () =>
  Box('a')
  .map(x => x.toUpperCase); // Box('A') <- still in the "box"
  .map(x => String.fromCharCode(x)); // Box('\u0000') <- still in the "box"

// tying this all together
const nextCharForNumberStringSolution = str =>
  Box(str)
  .map(x => x.trim())
  .map(x => parseInt(x, 10))
  .map(x => new Number(x + 1))
  .fold(x => String.fromCharCode(x)) // could be String.fromCharCode by itself
```

> A Functor because it has a map method. Mathematically it is the operation and the ability to put back into the "box".

There is one curve ball that came from the exercises to "box" something:

```javascript
// Starting code - but it needs to be a Monad! Surprise!
const applyDiscount = (price, discount) => {
  const cents = moneyToFloat(price);
  const savings = percentToFloat(discount);
  return cents - cents * savings;
};

// the final code using the monad
const applyDiscount = (price, discount) => {
  // box inside of a box? wtf?
  Box(percentToFloat(price)).fold(cents =>
    Box(moneyToFloat(p)).fold(savings => cents - cents * savings),
  );
};
```

Box is both a monad and functor and this where we see we need a monad instead of a functor. `map` is not required, whereas `fold` is! The above is the scenario that monads are used for.

> When you have composition nested inside another composition, you want to flatten it. `fold` will do the flattening for us here. There is a method `chain` that we can use that will essentially flat map for us so we do not have to have these folds within folds.

```javascript
// the monad with chain
const applyDiscount = (price, discount) => {
  Box(percentToFloat(price))
    .chain(cents =>
      Box(moneyToFloat(p)).map(savings => cents - cents * savings),
    )
    .fold(x => x);
};
```

## Either Monad

This "box" is going to be a Functor that has a map method and a Monad that has a chain method and it is going to foldable.

```javascript
const findColor = name => ({ red: '#ff4444', blue: '#3b5988' }[name]);

const res = findColor('red').toUpperCase();
const res2 = findColor('redd').toUpperCase(); // uh-oh - how do we deal with this?

// the either monad
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: `Right(${x})`,
});

const Left = x => ({
  chain: f => Left(f(x)),
  // this keeps the error bubbling through!
  map: f => Left(f(x)),
  fold: (f, g) => f(x),
  inspect: `Left(${x})`,
});

const findColor2 = name => {
  const found = { red: '#ff4444', blue: '#3b5988' }[name];
  return found ? Right(found) : Left('dunno');
};

const res3 = findColor('red').map(x => x.toUpperCase());
const res4 = findColor('redd')
  .map(x => x.toUpperCase())
  .fold(() => 'no color!', color => color); // doesn't care - doesn't blow up!
```

You can think of `Right` and `Left` as subclasses of this super class we call `Either`. Note that the `fold` method on both take a specific function parameter to use.

### fromNullable utility

From nullable can abstract the Either monad subclass.

```javascript
const fromNullable = x => (x != null ? Right(x) : Left());
const findColor3 = name => fromNullabe({ red: '#ff4444', blue: '#3b5988' }[name])
};
```

> Note: You don't have to define this stuff yourself. There are libries out there that help us do that.

## Refactoring Node fs using the Either Monad

```javascript
// before
const getPort_ = () => {
  fs.readFileSync('config.json');
  try {
    const str = fs.readFileSync('config.json');
    const config = JSON.parse(str);
    return config.port;
  } catch (e) {
    return 3000;
  }
};

// after
const tryCatch = f => {
  try {
    return Right(f())
  } else {
    return Left(e)
  }
}

const getPort1 = () =>
  tryCatch(fs.readFileSync('config.json')); // assume 3000 in config.json
  .map(contents =>  JSON.parse(contents))
  .map(config => config.port)
  .fold(() => 8080, x => x) // 3000

const getPort2 = () =>
  tryCatch(fs.readFileSync('coneaig.json')); // blow up
  .map(contents =>  JSON.parse(contents))
  .map(config => config.port)
  .fold(() => 8080, x => x) // 8080

const result = getPort();
console.log(result);

// we can abstract further...
const readFileSync = path => tryCatch(() => fs.readFileSync(path)); // assume 3000 in config.json
const getPort1 = () =>
  readFileSync('config.json')
  .map(contents =>  JSON.parse(contents))
  .map(config => config.port)
  .fold(() => 8080, x => x) // 3000

// how about if JSON.parse was in a tryCatch?
const readFileSync = path => tryCatch(() => fs.readFileSync(path)); // assume 3000 in config.json
const parseJSON = contents =>  JSON.parse(contents)
const getPort1 = () =>
  readFileSync('config.json')
  .chain(contents => parseJSON(contents))
  .map(config => config.port)
  .fold(() => 8080, x => x) // 3000
```

> Adding Syntax vs Generalized Solutions: we can learn to use a syntax that works with all of them but the idea is to stay general and work with those functions.

Here was the solution for the first of the Either exercises:

```javascript
const streetName = user =>
  fromNullable(user)
    .chain(user => fromNullable(user.address))
    .chain(address => fromNullable(address.street))
    .map(street => street.name)
    .fold(() => 'no street', x => x);
```

> The presenter never uses the Maybe monad (crazy). Also mentioned is that the `fold` part shouldn't really be part of the function. The idea is to return the Either monad and allow the user to decide how to handle it with their own implementation of fold. Also interesting is that he mentioned that you cannot flatten an Either and a Maybe (similar to how can't flatten arrays of a different type). You can flatten an Either of an Either or a Maybe of a Maybe.

The second exercise:

```javascript
const parseDbUrl = cfg =>
  tryCatch() => JSON.parse(cfg)
  .map(c -> c.url.match(DB_REGEX))
  .fold(err => null, x => x)

// we could also do
const parseDbUrl = cfg =>
  Right(cfg) // has to be Right and not Left
  .chain(c => tryCatch(() => JSON.parse(cfg)))
  .map(c -> c.url.match(DB_REGEX))
  .fold(err => null, x => x)

// The correct way to handle it.
// It allows you to interface correctly.
const parseDbUrl = cfg =>
  Either.of(cfg)
  .chain(c => tryCatch(() => JSON.parse(cfg)))
  .map(c -> c.url.match(DB_REGEX))
  .fold(err => null, x => x) // again, you generally don't want to do this from the context
```

## Task Monad

We've seen one way to make a `Box` where we map and return a `Box(element)`, but there is another way to go and that is to take a function.

```javascript
const Box = f => ({
  map: g =>
    Box(
      compose(
        f,
        g,
      ),
    ),
  fold: f,
});

Box(() => 2)
  .map(two => two + 1)
  .fold(); // 2
```

> This is the basis of the Reader Monad. Knowing you can make a functor lazy by using a composition is a really useful thing to know.

So armed with this knowledge, let's move onto `Task` that maps in a similar way.

```javascript
// The definition from the types file
const Task = fork => ({
  fork,
  ap: other =>
    Task((rej, res) => fork(rej, f => other.fork(rej, x => res(f(x))))),
  map: f => Task((rej, res) => fork(rej, x => res(f(x)))),
  chain: f => Task((rej, res) => fork(rej, x => f(x).fork(rej, res))),
  concat: other =>
    Task((rej, res) =>
      fork(rej, x =>
        other.fork(rej, y => {
          console.log('X', x, 'Y', y);
          res(x.concat(y));
        }),
      ),
    ),
  fold: (f, g) =>
    Task((rej, res) =>
      fork(x => f(x).fork(rej, res), x => g(x).fork(rej, res)),
    ),
});
Task.of = x => Task((rej, res) => res(x));
Task.rejected = x => Task((rej, res) => rej(x));
Task.fromPromised = fn => (...args) =>
  Task((rej, res) =>
    fn(...args)
      .then(res)
      .catch(rej),
  );

// What is shown in the tutorial
Task.of(2).map(two => two + 1); // Task(2)
// Notice: this won't run (not due to error).
const t1 = Task((rej, res) => res(2))
  .map(two => two + 1)
  .map(three => three * 2);

// like fold, but fork because it will run stuff
t1.fork(console.error, console.log); // 6
```

### Refactoring Node IO with Task

We're going to refactor this bad boy:

```javascript
const fs = require('fs');

const app = () =>
  fs.readFile('config.json', 'utf-8', (err, contents) => {
    console.log(err, contents);
    if (err) throw err;

    const newContents = contents.replace(/3/g, '6');

    fs.writeFile('config1.json', newContents, (err, _) => {
      if (err) throw err;
      console.log('success!');
    });
  });

app();
```

Note, we're using Task since it does everything that IO will do but async. Using the Task, we can update to this:

```javascript
const { Task } = require('../types');
const fs = require('fs');

const readFile = (path, enc) =>
  Task((rej, res) =>
    fs.readFile(path, enc, (err, contents) => (err ? rej(err) : res(contents))),
  );

const writeFile = (path, enc) =>
  Task((rej, res) =>
    fs.writeFile(path, enc, (err, contents) =>
      err ? rej(err) : res(contents),
    ),
  );

const app = () =>
  readFile('config.json', 'utf-8') // Task(contents)
    .map(contents => contents.replace(/3/g, '6')) // Task(Task(contents))
    .chain(newContents => writeFile('config.json', newContents));

app().fork(console.error, () => console.log('Success'));
```

## Task Practices

> Note around here was that when talking Tasks during the practice questions, Brian refers to Monads as being pointed functors that don't just have chain but also an `of` method.

An interesting example at the end:

```javascript
const httpGet = (path, params) => Task.of(`${path}: result`);

const getUser = x => httpGet('/user', { id: x });
const getTimeline = x => httpGet('/timeline/${x}', {});
const getAds = () => httpGet('/ads', {});

// with promises you could...
Promise.all([getUser, getTimeline, getAds]); // [Promise]

// using tasks - this traverse and List come from Brian's library
// this gives us back a Promise[]
List([getUser, getTimeline, getAds])
  .traverse(Task.of, f => f())
  .fork(console.log, x => console.log(x.toJS()));
```

## Transforms and Monad Patterns

> Something interesting that came up here was when there was a `Either(List(Either))` and Brian mentioned that if we swapped List and Either then we could squash them down. He doesn't show this in the course.

## Creating a Weather Module

Notes from while he is doing the tasks:

- He is packaging up the arguments into one.
- There is a use case he doesn't going into during the exercise with a Writer monad.
- Brian creates a Weather data type when updating to functional programming.
