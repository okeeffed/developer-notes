---
menu: TypeScript
name: TypeScript 3 Fundamentals v2
---

# TypeScript 3 Fundamentals v2

## Resources

1. [TS Resources](vhttps://frontendmasters.com/courses/typescript-v2)
2. [GitHub Resource](https://github.com/mike-works/typescript-fundamentals/)

## Variables

```typescript
// basic typing
let x: string = 'string';
x = 42; // ERROR
```

## Tuples

```javascript
let bb: [numer, string, string, number] = [
  123,
  'Fake Street',
  'Nowhere, USA',
  10110,
];

bb = [1, 2, 3]; // ERROR
bb.push(1, 2); // no type safety error :(
```

> Tuples will need the type specified at declaration, otherwise it could infer an array of the wrong type.

## Exhaustive Switches

```typescript
enum constants = {
  mrf = "mrf"
}

// doesn't need a default
const getValue = (value: constants) => {
  switch (value) {
    case constants.mrf:
      return 'value'
  }
}
```

## Intersectional and Union Types

```typescript
type A = {
  a: number;
};

type B = {
  b: number;
};

type IntersectionAB = A | B;
// valid
const aObj: IntersectionAB = {
  a: 32,
};

const bObj: IntersectionAB = {
  b: 32,
};

// invalid
const cObj: IntersectionAB = {
  a: 32,
  b: 32,
};

type UnionAB = A | B;
// invalid
const aObj: UnionAB = {
  a: 32,
};

const bObj: UnionAB = {
  b: 32,
};

// valid
const cObj: UnionAB = {
  a: 32,
  b: 32,
};
```

## Type Systems

There are two types:

1. Nominal Type Systems (Java): is x an instance of a class/type named `HTMLInputElement`?
2. Structural Type Systems (TS): cares only about shape.

```typescript
function validateInputField(input: HTMLInputElement) {
  /* ... */
}

validateInputField(x);
```

## Specificity

TypeScript uses "wider vs narrower" to describle specificity. That means that we go from wide `any` down to nothing `never` with everything else in between.

## Type Aliases & extends

> Allow us to give a type a name.

- Interfaces extend from interfaces, classes extend from classes.
- Interfaces cannot handle primitive types. JavaScript object and subobjects only (things with prototypes).
- Main difference is you cannot implement/extend a union type.

## Generics

> Generics parameterize types in the same way functions parameterize valus.

```typescript
// example of the parameterized function
function wrappedValue(x) {
  return {
    value: x,
  };
}

// example now as generic
// the common convention is T
interface wrappedValue<X> {
  value: X;
}

let val: WrappedValue<string> = { value: '' };
val.value; // expects string and shows that on the tooltip
```

### Type parameters

```typescript
// this sets the fallback to any
interface wrappedValue<X = any> {
  value: X;
}
```

> TypeScript can also infer type ahead in the tooltip. Very handy use.

### Constraints and scope

> Extending a generc means setting a minimum constraint that a generic must meet.

```typescript
// an example of ensure that T has an id
function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
  const out: {
    [k: string]: T;
  } = {};
  array.forEach(val => {
    out[val.id] = val;
  });
  return out;
}
```

Type parameters are also associated with scope:

```typescript
function startTuple<T>(a: T) {
  return function finishTuple<U>(b: U) {
    return [a, b] as [T, U];
  };
}
```

### Generics in use with interfaces

```typescript
interface Shape {
  sides: number;
}

interface Square extends Shape {
  width: number;
}

interface Circle extends Shape {
  radius: number;
}

// what makes it worth while is it means any interface
// that extends Shape
function drawShape<S extends Shape>(shapes: S[]): S[] {
  return; // fill in here
}

const test1: Shape = //...
const test2: Circle = //...
drawShape(test1) // valid
drawShape(test2) // valid
```

### Use cases for Generics

1. Generics are necessary when we want to describe a relationship between two or more types (i.e., a function argument and return type).
2. Aside from interfaces and type aliases, if a type parameter is used only once, it can probably be eliminated.

> Relating this ie `I take T and will give you back a Dictionary of type T`.

```typescript
interface Shape {
  draw();
}
interface Circle extends Shape {
  radius: number;
}

function drawShapes1<S extends Shape>(shapes: S[]) {
  shapes.forEach(s => s.draw());
}

// this is simpler. Above type param is not necessary
function drawShapes2(shapes: Shape[]) {
  shapes.forEach(s => s.draw());
}
```

### Interesting tidbit

The following is both acceptable as far as TS is concerned:

```typescript
// using interface
interface Shape {
  sides: number;
}

interface Circle extends Shape {
  radius: number;
}

interface Cube extends Shape {
  threeD: boolean;
}

function createCircle<T extends Shape>(shape: T): T {
  shape.sides = 1;
  return shape;
}

// using types
type Shape2 = {
  sides: number;
};

type Circle2 = Shape2 & {
  radius: number;
};

type Cube2 = Shape2 & {
  threeD: boolean;
};

function createCircle2<T extends Shape2>(shape: T): T {
  shape.sides = 1;
  return shape;
}
```

### Dictionary exercise

An example of creating a dictionary with the same type as the value.

```typescript
export type Dict<T> = {
  [K: string]: T | undefined;
};

// transforming from and then to
export function mapDict<T, S>(dict: Dict<T>, fn(arg: T, idx: number) => S): Dict<S> {
  const out: Dict<S> = {}
  Object.keys(dict).forEach((dKey, idx) => {
    const thisItem = dict[dKey]
    if (typeof thisItem !== undefined) {
      out[dKey] = fn(thisIdem, idx);
    }
  })
}
```

## Top and Bottom Types

Two top types:

1. `any`
2. `unknown` - can receive any value

```typescript
let myAny: any = 32;
let myUnknown: unknown = 'hello, unknown';

myAny.foo.bar.baz; // works okay
myUnknown.foo; // error thrown
```

When to use any?

- When you want to maintan flexibility.

When to use unknown?

- Good for "private" values.

```typescript
if (typeof myUnknown === 'string') {
  myUnknown.split(',');
}
if (myUnknown instanceof Promise) {
  myUnknown.then(x => console.log(x));
}

// note on return type
type HasEmail = {
  name: string;
  email: string;
};
function isHasEmail(x: any): x is HasEmail {
  return typeof x.name === 'string' && x.email === 'string';
}

if (isHasEmail(myKnown)) {
  // do things
}

// most common guard
function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== 'undefined';
}

const list = ['a', 'b', 'c', undefined];
const filtered = list.filter(isDefined);
```

## Unknowns and Branded Types

Branding and unbranding helps with unsafe issues. We cast to unknown and brand that enables us to cast without type errors.

Withthe differing types, we can still ensure that things do not accidentally get mismatched when branding or unbranding.

> This vs `private`? Private can only be used in classes.

This is useful for library authors who want to keep things away from other users to change up.

```typescript
interface BrandedA {
  __this_is_branded_with_a: 'a';
}

function brandA(value: string): BrandedA {
  return (value as unknown) as BrandedA;
}

function unbrandA(value: BrandedA): string {
  return (value as unknown) as string;
}

interface BrandedB {
  __this_is_branded_with_b: 'b';
}

function brandB(value: { abc: string }): BrandedB {
  return (value as unknown) as BrandedB;
}

function unbrandB(value: BrandedB): { abc: string } {
  return (value as unknown) as { abc: string };
}

let secretA = brandA('Secret value');
let secretB = brandA({ abc: 'Another secret value' });

secretA = secretB; // error: can't mix up
unbrandB(secretA); // cannot happen
unbrandA(secretB); // cannot happen
```

## Bottom Types

- never: If you create `never` type, you shouldn't be here.

```typescript
let x = 'abc' as string | number;

if (typeof x === 'string') {
  x.split(', ');
} else if (typeof x === 'number') {
  x.toFixed(2);
} else {
  // x is a never here
}
```

Here is an example creating an unreachable error:

```typescript
class UnreachableError extends Error {
  constructor(val: never, message: string) {
    super(`TypeScript thought we could never end up here ${message}`);
  }
}

let x = 4 as string | number;

if (typeof x === 'string') {
  x.split(', ');
} else if (typeof x === 'number') {
  x.toFixed(2);
} else {
  // if this isn't here, hates JavaScript debugging
  // x is a never here
  throw new UnreachableError(x, 'x should be string or number');
}

// What happens if x changes to string | number | boolean?
// It will throw a runtime error saying you need to handle the case.
```

> This error is used for a runtime error!

## Advanced Types

- `keyof` - gets the key
- `typeof` - gets the typeof an element
- Conditional type that uses a ternary.

```typescript
// Conditional ternany
type EventualType<T> = T extends Promise<infer S>
  ? S //extract the type the promise resolves to
  : T; // otherwise just let T pass through;
```

## Utility Types

- Partial: makes all optional
- Pick: choose specific properties

## Declaration Merging

You can stack class, namespace and interface on top each other and all will be exported under the same value and be interpretable based on use.
