---
menu: Functional Programming
name: Hardcore FP in JavaScript
---

# Hardcore Functional Programming in JavaScrpt

There are notes taken from Frontend Masters course "Hardcore Functional Programming in JavaScrpt"

## Resources

1. [Frontend Masters course](https://frontendmasters.com/courses/functional-javascript/introduction/)
2. [Course Slides](https://docs.google.com/presentation/d/1WmIH538r0ubjW5zfKh43I1_Up4OnqQnNhICETyDnhSI/)
3. [RamdaJS](https://ramdajs.com/)
4. [BaconJS](https://baconjs.github.io/)
5. [Fantasy IO](https://baconjs.github.io/)
6. [Pointfree Fantasy - for mjoin, chain etc](https://github.com/DrBoolean/pointfree-fantasy)
7. [Folktale - Either monad](https://github.com/origamitower/folktale)

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

1. Container/Wrappers for values (also known as Identity)
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

These themselves are what we know as a `functor`.

More example of this in action with the `ramda.map` function:

```javascript
map(match(/cat/g), Container('catsup'));
//=> Container(["cat"])
map(
  compose(
    first,
    reverse,
  ),
  Container('dog'),
);
//=> Container("g")
```

### Maybe Functor

> "An object or data structure you can map over" - a functor

Let's take an example that runs in null issues:

```javascript
var getElement = document.querySelector;
var getNameParts = compose(
  split(''),
  get('value'),
  getElement,
);

getNameParts('#full_name');
//=> ['Jonathan', 'Gregory', 'Brandis']
```

So, meeting our first Functor: `Maybe`.

1. Captures a null check
2. The value inside may not be there
3. Sometimes has two subclasses `Just / Nothing`
4. Sometimes called `Option` with subclassess `Some / None`

The idea is that you may or may not have a value in your container.

```javascript
var _Maybe.prototype.map = function(f) {
  return this.val ? Maybe(f(this.val)) : Maybe(null)
}

map(capitalize, Maybe("flame"))
//=> Maybe("Flame")
map(capitalize, Maybe(null))
//=> Maybe(null)
```

This in application:

```javascript
var firstMatch = compose(
  map(first),
  Maybe,
  match(/cat/g),
);
firstMatch('dogsup');
//=> Maybe(null)
```

Worthy inclusions from the course questions:

```javascript
const _ = require('ramda');
const inc = _.add(1);

map(inc, [4]); // [5]
map(inc, Identity(4)); // Identity(5)
map(map(inc), Identity([4])); // Identity([5])
```

This can also trip people up:

```javascript
var xs = Identity(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
var ex2 = map(_.head);
assertEqual(Identity('do'), ex2(xs)); // Note the identity gets passed in here!
```

### Either w/ subclasses Left or Right

Typically used for pure error handling. Like Maybe, but with an error message embedded. Has two subclasses: Left/Right. Mays the function over a Right, ignores the Left.

```javascript
map(function(x) {
  return x + 1;
}, Right(2));
//=> Right(3)
map(function(x) {
  return x + 1;
}, Left('some message'));
//=> Left('some message') for error handling
```

A more practical application:

```javascript
var determineAge = function(user) {
  return user.age ? Right(user.age) : Left('could not get age');
};
var yearOlder = compose(
  map(add(1)),
  determineAge,
);

yearOlder({ age: 22 });
//=> Right(23)

yearOlder({ age: null });
//=> Left("couldn't get age")
```

### IO

`IO` is a functor that puts a function inside it (not a string, number etc).

Facets of IO:

1. A lazy computation "builder"
2. Typically used to contain side effects
3. You must `runIO` to perform the operation
4. Map appends the function to a list of things to run with the effectful value

Examples:

```javascript
var email_io = IO(function() {
  return $('#email').val();
});
var msg_io = map(concat('welcome'), email_io);

runIO(msg_io);
//=> "welcome steve@foodie.net"
```

An example of building up an IO:

```javascript
var getBgColor = compose(
  get('background-color'),
  JSON.parse,
);
var bgPref = compose(
  map(getBgColor),
  Store.get('preferences'),
);

var app = bgPref();
//=> IO()

runIO(app);
//=> #efefef
```

### Other Functors

1. EventStream: Infinite list of results, dual of array, map is sometimes lazy, calls the mapped function each time an event happens. Similar-ish to RxJS. They used Bacon in this example.
2. Future: Has an eventual value, similar to a promise but "lazy", you must "fork" it to kick it off, it takes a function as its value, calls the function with it's result once it's there.

### Functor Law Properties

```javascript
// identity
map(id) === id;

// composition
compose(
  map(f),
  map(g),
) ===
  map(
    compose(
      f,
      g,
    ),
  );
```

An example functor:

```javascript
// reverse :: String -> String
// toArray :: a -> Array a
var toArray = function(x) {
  return [x];
};

compose(
  toArray,
  reverse,
)('bingo');
//=> [ognib]

compose(
  map(reverse),
  toArray,
)('bingo');
//=> [ognib]
```

`Natural Transformations` is when you take one functor to another without knowing anything about the values.

An example is `Maybe`:

```javascript
maybeToArray(Maybe(2));
maybeToArray(Maybe(null));
```

### Monads

Monads = Pointed Functors `of :: a -> F a` aka: pure, return, unit, point.

Anything with an `of` is a Pointed Functor:

```javascript
Container.of(split);
// Container(split)

Future.of(split);
// Future(split)

Maybe.of(split);
// Maybe(split)

EventStream.of(split);
// EventStream(split)
```

"Nest computations" - just a pointed functor with one the following functions: `mjoin`, `chain`.

```haskell
mjoin :: M M a -> M a
chain :: (a -> M b) -> M a -> M b
```

Example:

```javascript
mjoin(Container(Container(2))); //=> Container(2)

// in the given example
var getTrackingId = compose(
  Maybe,
  get('tracking_id'),
);
var findOrder = compose(
  Maybe,
  Api.findOrder,
);
var getOrderTracking = compose(
  mjoin,
  map(getTrackingId),
  findOrder,
);

var renderPage = compose(
  map(renderTemplate),
  getOrderTracking,
);
renderPage(379);
//=> Maybe(Html)
```

Converting deep nested maps:

```javascript
// safeGet returns a Maybe functor
var ex1 = compose(
  map(map(safeGet('name'))),
  map(safeGet('street')),
  safeGet('address'),
);

// with a mjoin, you could do...
var ex1 = compose(
  mjoin
  map(safeGet('name')),
  mjoin,
  map(safeGet('street')),
  safeGet('address'),
);

// but given we know chain is just "monad",
// then mjoin, we could...
var ex1 = compose(
  chain(safeGet('name')),
  chain(safeGet('street')),
  safeGet('address'),
);
```

There is also such thing as `mcompose` which will remove the need for the child `chain` function.
