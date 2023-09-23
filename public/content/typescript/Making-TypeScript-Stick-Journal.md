# Making TypeScript Stick Journal

This is a journal to document any concepts I find difficult.

- What makes it difficult?
- How do I help work around that?
- What helped me to understand it?

## JS/TS Warm-up Quiz

What's the difference between this code?

```ts
export class Person {
  #name = ''
  private age = 1
}
```

- **`#name` is a JS private field**, and it’s actually inaccessible outside of the class at runtime. [More about JS private fields here.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#private_fields)
- **`age` is a TypeScript private field**, and while type-checking helps ensure we do not access it improperly, at runtime it’s accessible outside the class. [More about the TS `private` access modifier keyword here.](https://www.typescriptlang.org/docs/handbook/2/classes.html#private)

Which of the following variables (`a`, `b`, `c`, `d`, `e`) hold immutable values

```ts
const a = 'Frontend Masters'
let b = 'Frontend Masters'
const c = { learnAt: 'Frontend Masters' }
let d = { learnAt: 'Frontend Masters' }
const e = Object.freeze({ learnAt: 'Frontend Masters' })
```

**`a`, `b` and `e` hold immutable values**. Remember, `const` and `let` differ in terms of whether variables can be reassigned, but that has nothing to do with whether the values they hold can be modified.

`Object.freeze` prevents properties of an object from being changed, and prevents new properties from being added. This effectively is a “shallow immutability”.

## Recent Updates to TypeScript

### Variadic Tuple Types

TS 4.0 introduces support for *variadic tuples*. This relaxes the limitation shown above, and allows us to use `...T` in tuple types.

```ts
/**

* return an array containing everything except the first element

*/

function tail<T extends any[]>(arg: readonly [number, ...T]) {
  const [_ignored, ...rest] = arg

  return rest
}

const order1: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce']

const result = tail(order1) // Typing const result: [Sandwich, ...string[]]
```

It’s important to note that **only one `...rest[]` element is possible in a given tuple, but it doesn’t necessarily have to be the last element**:

```ts
type YEScompile1 = [...[number, number], ...string[]]

type NOcompile1 = [...number[], ...string[]] // A rest element cannot follow another rest element.

type YEScompile2 = [boolean, ...number[], string]
```

> An example of how [Rx.js simplified their types](https://github.com/ReactiveX/rxjs/pull/5859/files)

### Class Property Inference from Constructors

```ts
class Color {
  red // :number no longer needed! (property) Color.red: number
  green // :number no longer needed!
  blue // :number no longer needed!

  constructor(c: [number, number, number]) {
    this.red = c[0]
    this.green = c[1]
    this.blue = c[2]
  }
}
```

### Thrown values as unknown

Always do this:

```ts
try {
  somethingRisky()
} catch (err: unknown) {
  if (err instanceof Error) throw err
  else throw new Error(`${err}`)
}
```

### Template literal types

You can think of these like **template strings, but for types**.

```ts
type Statistics = {
  [K in `${'median' | 'mean'}Value`]?: number
}

const stats: Statistics = {}

stats.meanValue // TS suggests meanValue or medianValue as properties
```

Some interesting things you could do with it:

```ts
let winFns: Extract<keyof Window, `set${any}`> = '' as any // let winFns: "setInterval" | "setTimeout"
```

### Key remapping in mapped types

We now have some new syntax (note the `as` in the example below) that lets us transform keys in a more declarative way. This language feature works quite nicely with template literal types.

```ts
type Colors = 'red' | 'green' | 'blue'

type ColorSelector = {
  [K in Colors as `select${Capitalize<K>}`]: () => void
}

const cs: ColorSelector = {} as any

cs.selectRed() // suggests selectBlue, selectGreen, selectRed
```

## Typed Data Store Exercise

The resulting solution:

```ts
export interface DataEntity {
  id: string
}
export interface Movie extends DataEntity {
  director: string
}
export interface Song extends DataEntity {
  singer: string
}

export type DataEntityMap = {
  movie: Movie
  song: Song
}

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][]
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K]
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (
    entity: DataEntityMap[K]
  ) => DataEntityMap[K]
}

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== 'undefined'
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  }

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie)
      .map((movieKey) => this.#data.movie[movieKey])
      .filter(isDefined)
  }

  getAllSongs(): Song[] {
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey])
      .filter(isDefined)
  }

  getMovie(id: string): Movie {
    const movie = this.#data.movie[id]
    if (!movie) throw new Error('Not a movie')

    return movie
  }

  getSong(id: string): Song {
    const song = this.#data.song[id]
    if (!song) throw new Error('Not a song')

    return song
  }

  clearMovies(): void {
    this.#data.movie = {}
  }

  clearSongs(): void {
    this.#data.song = {}
  }

  addMovie(movie: Movie): Movie {
    this.#data.movie[movie.id] = movie
    return movie
  }

  addSong(song: Song): Song {
    this.#data.song[song.id] = song
    return song
  }
}

const ds: DataStoreMethods = {} as any
ds.addMovie({
  id: 'Movie',
  director: 'Director',
}) // This would automatically infer the above
```
