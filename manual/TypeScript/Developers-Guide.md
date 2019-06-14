---
menu: TypeScript
name: Developer's Guide
---

# Developer's Guide to TypeScript

## Types

For types, we have all our basic types and we can also have custom types.

There are two types, `primitive` and `object` - the `object` types itself can be what we define.

Why do we care? The compiler uses it to search for errors and it allows other engineers to understand what type of data is flowing around.

```javascript
interface Todo {
  id: number;
  completed: boolean;
};

const todo = obj.data as Todo;
```

## Declaring types examples

```javascript
// array
let colors: string[] = ['a', 'b', 'c'];

// class
class Car {}
let car: Car = new Car();

// object literal
let point: { x: number, y: number } = {
  x: 10,
  y: 20
};

// functions
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};
```

The object literal gets a bit nasty, but we have ways around this using `types` and `interfaces`.

## The 'any' type

```javascript
const json = '{"x":10, "y": 20}';
const coordinates = JSON.parse(json); // by default gets any time

// this is the better
const coor: { x: number, y: number } = JSON.parse(json);
```

## The 'void' and 'never' return types

```javascript
// Returns nothing
const logger = (message: string): void => console.log(message);

// Never returns
const throwError = (message: string): never => throw new Error(message);
```

## Interfaces

```javascript
interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true
};

const printVehicle = (vehicle: Vehicle): void => {};
```

## Abstract Classes

Good for classes that we only want to use to extend. Think expectation vs reality.

Abstract classes:

1. Cannot create objects directly
2. Only used as a parent class
3. Can contain real implementations of some methods
4. Can refer to methods that don't exist yet

```javascript
abstract class Examlpe {
  // promises we will create this func later
  abstract requireFunc(argA: number): void;

  swap = (a:number) => requireFunc(a);
}
```

## Abstract classes vs Interfaces

- Interfaces promot loose coupling, Abstract/Inheritance is for strong coupling
- Interfaces for very different objects we want to work together, Abstract/Inheritance for when we want to build up a definition of an object

## Enums

```javascript
enum Result {
  Win = 'W',
  Loss = 'L',
  Draw = 'D'
}
```

## Generics

- Like function args, but for types in class/function definitions
- Allow us to define the type of a property/argument/return value at a future point
- Used heavily when writing useable code

```javascript
class HoldAnything<TypeOfData> {
  data: TypeOfData;
}

const holdNumber = new HolderAnything<number>();
const holdString = new HolderAnything<string>();

interface Coordinates {
  x: number;
  y: number;
}

const holdCoordinates = new HolderAnything<Coordinates>();

// TypeOfData can actually be called anything
// Convention is normally T, but then we go alphabetical order if we need multiple generics

class holdMultipleAnything<T,U,V> {
  firstThing: T;
  secondThing: U;
  thirdThing: V;
}

const holdAllTheThings = new holdMultipleAnything<string, number, Coordinates>();
```

### Constraints with Generics

- Cannot call base methods on generics since there is no guarantee without a interface
-

```javascript
class Car {
  print() {
    console.log('Car');
  }
}

class House {
  print() {
    console.log('House');
  }
}

interface Printable {
  print(): void;
}

function printWhatever<T extends Printable>(el: T) {
  el.print();
}

printWhatever(new Car());
printWhatever(new House());
```
