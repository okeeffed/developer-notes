This is a course from Frontend masters https://frontendmasters.com/courses/intermediate-typescript-v2/

I am only including the sections that make sense to include.

Some follow-up courses:

- https://frontendmasters.com/courses/typescript-practice/
- https://frontendmasters.com/courses/fullstack-typescript/
- https://frontendmasters.com/courses/enterprise-typescript/
- https://frontendmasters.com/courses/react-typescript-v2/

## 2 Declaration Merging

https://www.typescript-training.com/course/intermediate-v2/02-declaration-merging/

In the example given from the link, we find something interesting happening with the export:

```ts
const banana: Fruit = {

name: "banana",

color: "yellow",

mass: 183,

}

/// ---cut---

interface Fruit {

// ^?

name: string

mass: number

color: string

}

  

function Fruit(kind: string) {

// ^?

switch (kind) {

case "banana": return banana

default: throw new Error(`fruit type ${kind} not supported`)

}

}

  

// the namespace

namespace Fruit {

// ^?

function createBanana(): Fruit {

// ^?

return Fruit('banana')

// ^?

  

}

}

  
  

export { Fruit }

// ^?
```

From the link:

First, what we see around `export { Fruit }` is that there’s identifier that’s three things in one:

- a value (class)
- a type
- a namespace

Second, we can see that when `Fruit` is used in a place where we expect to see _type information_, we see the `interface` and `namespace` information on the tooltip. 

When `Fruit` is used in a place where we expect to see a _value_, we see the `function` and `namespace` information. It appears there’s something at play that involves using single identifier in different contexts.

So in a case where we declare a class, we are actually creating both a type and a value. This is an example of declaration merging at play!

## 3 Top & Bottom Types

### Top types and almost top types

Type systems often have types representing the largest and smallest possible sets of values. These are called top and bottom types.

TypeScript has two top types:

1. any
2. unknown

It’s important to understand that `any` is not necessarily a problem — sometimes it’s exactly the right type to use for a particular situation. It just indicates _maximal flexibility_ and _the absence of a need to type-check before using the value_.

Values with an `unknown` type cannot be _used_ without first applying a type guard. Sometimes people refer to this property of `unknown` by describing it as “opaque”.

The `object` type represents the set `{ all possible values except for primitives }`. Primitive value types in JavaScript are `{ string, number, boolean, Symbol, null, undefined, BigInt }`. It is *almost* a primitive. It’s important to understand that this is _not quite_ the same concept of the “object types” term used to describe shapes that `interface`s can model.

The empty object type `{}` represents the set `{ all possible values, except for null and undefined }`.

Based on what we’re seeing here, `{} | null | undefined` is technically another top type, since now we’re back to a set of `{ all possible values }`.

### Bottom types

A [bottom type](https://en.wikipedia.org/wiki/Bottom_type) (symbol: `⊥`) is a type that describes **no possible value allowed by the system**. To use our set theory mental model, we could describe this as a type representing the set `{ }` (intentionally empty).

TypeScript provides one bottom type: [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never).

At first glance, this may appear to be an _extremely abstract_ and _pointless_ concept, but there’s one use case that should convince you otherwise: exhaustive conditionals.

```ts
class Car {
	drive() {
		console.log("vroom")
	}
}

class Truck {
	tow() {
		console.log("dragging something")
	}
}

type Vehicle = Truck | Car

let myVehicle: Vehicle = obtainRandomVehicle()

// The exhaustive conditional

if (myVehicle instanceof Truck) {
	myVehicle.tow() // Truck
} else if (myVehicle instanceof Car) {
	myVehicle.drive() // Car
} else {
	// NEITHER!
	const neverValue: never = myVehicle
}
```

If we update `Vehicle` to support another type, we will get a lovely type error to indicate that our conditional logic needs to be updating since that other type can not be assigned to `never`.

This is normally recommended to be handled by throwing a runtime error.

### Unit types

Unit types are types that represent a set of exactly one value. An example of this is a literal type.

```ts
let num: 65 = 65
```

The types `null` and `undefined` are also unit types.

The `void` type is _almost_ a unit type, but it can check against `undefined` as well.

## 5 Modules and CJS Interop

For starters, TypeScript does what you expect from modern imports:

```ts
// named imports
import { Blueberry, Raspberry } from './berries'
import Kiwi from './kiwi' // default import
export function makeFruitSalad() {} // named export
export default class FruitBasket {} // default export
export { lemon, lime } from './citrus' // re-export
export * as berries from './berries' // re-export entire module as a single namespace
```

Although uncommon in the JS world, it is also possible to import an entire module as a namespace.

There was also a warning that came up here:

*If you need to enable the `esModuleInterop` and `allowSyntheticDefaultImports` compiler flags in order to allow your types to compile, anyone who depends on your types will also have no choice but to enable them, or their project’s types won’t compile.*

He calls these “viral options”, and take extra steps to avoid using them in my libraries. We solve this by avoiding the use of an ECMAScript import/export entirely. After all, the code we’re referring to here is not following the ES module spec.

```ts
// Before
import Melon from './melon'

// After
import Melon = require('./melon')
```

Let’s say you want to convert the `melon.js` file, without disrupting anything that imports it. This is a common concern for library authors, who want to incrementally convert to TypeScript without having to declare each release containing a few more TypeScript conversions a _major version_.

```ts
////////////////////////////////////////////////////////

// @filename: melon.ts

class Melon {

cutIntoSlices() { }

}

// This syntax here
export = Melon

////////////////////////////////////////////////////////

// @filename: index.ts

import Melon = require("./melon")

const melon = new Melon()

melon.cutIntoSlices()
```

This `export =` syntax is definitely a little odd. It certainly doesn’t conform to ES module syntax in any way, in part becasue this has been part of TypeScript longer than ES modules have existed as a standardized concept.

It would output the following:

```ts
"use strict";

class Melon {

cutIntoSlices() { }

}

module.exports = Melon;
```

### Native ES Module support

How to unambiguously indicate which type of module you’re authoring

- Files with the `.mjs` extension are treated as native ES modules
- Files with the `.cjs` extension are treated as CJS modules

You can also indicate whether `.js` files in your project should be treated as ES or CJS modules. In your `package.json` you may include a top-level `"type"` field with either of the following values

- `"module"` indicates that `.js` files should be run as ES modules
- `"commonjs"` indicates that `.js` files should be run as CommonJS

Note that even as of Node 20.8.0, **Node.js still assumes `.js` files are CommonJS if you specify no `"type"` field at all in your `"package.json"`**.

### TypeScript ES modules

TypeScript 5 supports native modules that follow the established conventions, replacing the `j` with a `t` (just as is done for `.jsx` and `.tsx` files). `.`

- `.mts` files are for TypeScript ES modules, and generate ES modules as output
- `.cts` files are for TypeSCript CJS modules, and generate CJS modules as output

Given that TypeScript gives you control of the module format in compiled output, you may wonder what the use case is for allowing this degree of flexibility

Imagine you have a large Node project, currently in CJS, and you want to incrementally start converting a few modules at a time. This flexibility would allow you use these two types of modules side-by-side as you incrementally migrate, without attempting a risky automatic conversion that could have ramifications on build output.

## 6 Generic Scopes and Constraints

#### `T extends` vs `class extends`

The `extends` keyword is used in object-oriented inheritance, and while not strictly equivalent to how it is used with type params, there is a conceptual connection:

> When a class extends from a base class, it’s guaranteed to _at least_ align with the base class structure. In the same way, `T extends HasId` guarantees that “T is at least a HasId”.

### Best practices

Best to check here https://www.typescript-training.com/course/intermediate-v2/06-type-param-scopes-and-constraints/

But basically the mention is to define type parameters as simply as possible, or you may lose type information.

```ts
// Will lose type information
function example1<T extends HasId[]>(list: T) {
	return list.pop()
}

// Preferred
function example2<T extends HasId>(list: T[]) {
	return list.pop()
}

const result1 = example1([  new Payment(),  new Invoice(),  new Payment()  ])  // TYPE const result1: HasId | undefined

const result2 = example2([  new Payment(),  new Invoice(),  new Payment()  ])  // TYPE const result2: Payment | Invoice | undefined
```

## 7 Conditional & mapped types

### Conditional types

```ts
class Grill {
	startGas() {}
	stopGas() {}
}

class Oven {
	setTemperature(degrees: number) {}
}

type CookingDevice<T> = T extends "grill" ? Grill : Oven

let device1: CookingDevice<"grill"> // let device1: Grill
let device2: CookingDevice<"oven"> // let device2: Oven
```

### Utility types that use conditional types

Here are some definitions from core types:

```ts
/**
* Exclude from T those types that are assignable to U
*/
type Exclude<T, U> = T extends U ? never : T

/**
* Extract from T those types that are assignable to U
*/
type Extract<T, U> = T extends U ? T : never
```

These utility types take advantage of, is that union-ing a type with `never` is essentially a no-op:

```ts
type OneNever = 1 | never // type OneNever = 1
```

#### Extract

```ts
type FavoriteColors =
| "dark sienna"
| "van dyke brown"
| "yellow ochre"
| "sap green"
| "titanium white"
| "phthalo green"
| "prussian blue"
| "cadium yellow"
| [number, number, number]
| { red: number; green: number; blue: number }

type StringColors = Extract<FavoriteColors, string> // every string option
```

We are extracting the type subset based on the second arg.

#### Exclude

The opposite of exclude.

### infer keyword

The `infer` keyword gives us an important tool to solve this problem — it lets us **extract and obtain** type information from larger types, by capturing pieces of types into a newly-declared type params.

```ts
/**
* If the type `P` passed in is some kind of `PromiseLike<T>`
* (where `T` is a new type param), extract `T` and return it.
* If `P` is not some subtype of `PromiseLike<any>`, pass the
* type `P` straight through and return it
*/

type UnwrapPromise<P> = P extends PromiseLike<infer T> ? T : P;
type test1 = UnwrapPromise<Promise<string>>
// type test1 = string
type test2 = UnwrapPromise<Promise<[string[], number[]]>>
// type test2 = [string[], number[]]
type test3 = UnwrapPromise<number>
// type test3 = number
```

Some utility types that use infer:

1. Parameters
2. ContructorParameters
3. ReturnType
4. InstanceType
5. ThisParameterType

### Mapped types

The basics:

```ts
type Fruit = {
	name: string
	color: string
	mass: number
}

// mapped type

type MyRecord = { [FruitKey in "apple" | "cherry"]: Fruit }

function printFruitCatalog(fruitCatalog: MyRecord) {
	fruitCatalog.cherry
	fruitCatalog.apple
	// ^ (property) apple: Fruit

	fruitCatalog.pineapple
	// ^ Property 'pineapple' does not exist on type 'MyRecord'.
}
```

The "thing" that looks like an index signature is what makes this a mapped type `{ [FruitKey in "apple" | "cherry"]: ... }`.

We can do some neat things:

```ts
type PickProperties<
	ValueType,
	Keys extends keyof ValueType
> = {
	[Key in Keys]: ValueType[Key]
}

type PartOfWindow = PickProperties<Window, "document" | "navigator" | "setTimeout">
// ^ type PartOfWindow = { document: Document; navigator: Navigator; setTimeout: (handler: TimerHandler, timeout?: number | undefined, ...arguments: any[]) => number; }
```

Which is in fact how the `Pick` type is defined:

```ts
/**
* From T, pick a set of properties whose keys are in the union K
*/

type Pick<T, K extends keyof T> = {
	[P in K]: T[P]
}

// Equivalent
type PickProperties<
	ValueType,
	Keys extends keyof ValueType
> = {
	[Key in Keys]: ValueType[Key]
}
```

Some other modifiers:
```ts
/**
* Make all properties in T optional
*/

type Partial<T> = {
	[P in keyof T]?: T[P]
}

/**
* Make all properties in T required
*/

type Required<T> = {
	[P in keyof T]-?: T[P]
}

/**
* Make all properties in T readonly
*/

type Readonly<T> = {
	readonly [P in keyof T]: T[P]
}
```

There is no built-in type for readonly removal, but you can create your own:

```ts
type NotReadonly<T> = {  
	-readonly [P in keyof T]: T[P]  
}
```

### Key mapping

```ts
interface DataState {

digits: number[]

names: string[]

flags: Record<"darkMode" | "mobile", boolean>

}

// setDigits, setNames, setFlags
type DataSDK = {

// The mapped type

[K in keyof DataState as `set${Capitalize<K>}`]:

(arg: DataState[K]) => void

}


function load(dataSDK: DataSDK) {

dataSDK.setDigits([14])

dataSDK.setFlags({ darkMode: true, mobile: false })

}
```

## 8 Variance Over Type Params

### Covariance

Our factory needs to model machines that _produce_ these items. We plan for there to be many types of snacks, so we should build a generalized abstraction for a `Producer<T>`

```ts
interface Producer<T> {  
	produce: () => T;  
}
```

|Cookie|direction|Snack|
|---|---|---|
|`Cookie`|--- is a --->|`Snack`|
|`Producer<Cookie>`|--- is a --->|`Producer<Snack>`|

> **Because both of these arrows flow in the same direction, we would say `Producer<T>` is _covariant_ on `T`**

TypeScript 5 gives us the ability to _state_ that we intend `Producer<T>` to be (and remain) _covariant on `T`_ using the `out` keyword before the typeParam.

```ts
interface Producer<out T> {
	produce: () => T;
}
```

Another example of code:

```ts
class Fruit {
	private name: string
	constructor(name: string = 'fruit') {
		this.name = name
	}
}

class Banana extends Fruit {
	// This causes the covariance
	public readonly coolness = 10
	constructor() {
		super('banana')
	}
}

  

interface Producer<out T> {
	produce: () => T
}

  

let fruitProducer: Producer<Fruit> = {
	produce: () => Math.random() > 0.5
		? new Banana()
		: new Fruit('other')
}

let bananaProducer: Producer<Banana> = {
	produce: () => new Banana()
}

fruitProducer = bananaProducer
bananaProducer = fruitProducer // ERRORS
```

### Contravariance

Now we need to model things that _package_ our snacks. Let’s make a `Packager<T>` interface that describes packagers.

```ts
interface Packager<T> {
	package: (item: T) => void;
}
```

|Cookie|direction|Snack|
|---|---|---|
|`Cookie`|--- is a --->|`Snack`|
|`Packager<Cookie>`|<--- is a ---|`Packager<Snack>`|

> **Because these arrows flow in opposite directions, we would say `Packager<T>` is _contravariant_ on `T`**

TypeScript 5 gives us the ability to _state_ that we intend `Packager<T>` to be (and remain) _covariant on `T`_ using the `in` keyword before the typeParam.

```
interface Packager<in T> {    
	package: (item: T) => void;  
}
``` 

### Invariance

What happens when `Producer<T>` and `Packager<T>` interfaces together?

```ts
interface ProducerPackager<T> {
	package: (item: T) => void;
	produce: () => T;
}
```


|Cookie|direction|Snack|
|---|---|---|
|`Cookie`|--- is a --->|`Snack`|
|`ProducerPackager<Cookie>`|x x x x x x|`ProducerPackager<Snack>`|

> This means that `ProducerPackager<T>` is _invariant_ on `T`. **Invariance means _neither_ covariance nor contravariance.**

### Bivariance

This was included for completeness but `strictFunctionTypes` needs to be turned off for it to work. 

## What variance helpers do for you

There are two reasons to use variance helpers in your code

- If you have recursive types in your project, these hints allow TypeScript to type-check significantly faster. Behinds the scenes, the compiler gets to skip a bunch of work, if it knows that a typeParam is purely `in` or `out`.
- It allows you to encode more of your intent, and (where useful) catch any changes to variance _in the interface declaration_ instead of at the places where the interface is used.

