# Making TypeScript Stick

## Compiling TypeScript

### Will it compile?

```ts
// YES
let age = 38

age = Number.NaN

// YES - Unfortunately, because tuples are a specialized flavor of arrays (and at runtime, they actually are just regular arrays) they expose the entire array API. Look at the type signature of `.push()`
const vector3: [number, number, number] = [3, 4, 5]

vector3.push(6)

// NO - Duplicate identifier
type Color = {
  red: number
  green: number
  blue: number
}

interface Color {
  alpha: number
}

// NO - no initializer and is not definitely assigned in constructor
class Person {
  name: string
  friends: Person[]

  constructor(name: string) {
    this.name = name
  }
}

// NO - Property 'name' in type 'Student' is not assignable to the same property in base type 'Person'.
abstract class Person {
  public abstract name: string
}

class Student extends Person {
  public name: string | string[] = ['Mike North']
}

// NO - not assignable to type Color
interface Color {
  red: number
  green: number
  blue: number
}

function printColor(color: Color) {
  // ... //
}

printColor({
  red: 255,
  green: 0,
  blue: 0,
  alpha: 0.4,
})
```

## Challenges

### Typerdy

This section was a typing challenge.

## Type Challenges

This is a [repo](https://github.com/type-challenges/type-challenges) to practice your typing.

The difficulty is subjective, so don't get too frustrated if some of the medium come off as difficult.

Challenge 1:

```ts
// @errors: 2344

type Expect<T extends true> = T

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// ---cut---

// Implement this type

type If<C, T, F> = never

// Tests

type cases = [
  Expect<Equal<If<true, 'apple', 'pear'>, 'apple'>>,

  Expect<Equal<If<false, 'orange', 42>, 42>>
]
```

The answer:

```ts
// Implement this type

type If<C, T, F> = C extends true ? T : F
```

Challenge 2:

```ts
// @errors: 2344

type Expect<T extends true> = T

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// ---cut---

// Implement this type

type LengthOfTuple<T> = never

// Tests

const Fruits = ['cherry', 'banana'] as const

type cases = [
  Expect<Equal<LengthOfTuple<[1, 2, 3]>, 3>>,
  Expect<NotEqual<LengthOfTuple<[1, 2, 3]>, 2>>,
  Expect<Equal<LengthOfTuple<typeof Fruits>, 2>>,
  Expect<Equal<LengthOfTuple<[]>, 0>>
]
```

The answer:

```ts
// Implement this type

type LengthOfTuple<T> = T extends readonly any[] ? T['length'] : never
```
