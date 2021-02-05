---
menu: TypeScript
name: Production-Grade TypeScript Course
---

# Production-Grade TypeScript Course

This course goes over some of the features from early on as opposed to the entire course.

## Resources

1. [Production-Grade TypeScript Course](https://frontendmasters.com/courses/production-typescript/)

## Optional Chaining & Nullish Coalescing

Optional chaining which is used for early termination from object access. Note that this adds complexity to managin the code.

```ts
const value = obj.levelOneKey?.value // levelOneKey may not be defined
```

Nullish Coalescing:

```ts
class Foo {
  name;

  constructor(rawName?: string) {
    this.name = rawName ?? '(no name)'
  }

  log() {
    console.log(this.name)
  }
}
```

## True Privacy

If you had `private name: string` in a class and someone runs a debugger, previously the variable would **still be visible**.

```ts
class Foo {
  #name;

  constructor(rawName?: string) {
    this.#name = rawName ?? '(no name)'
  }

  log() {
    console.log(this.#name)
  }
}
```

At runtime, it won't be there anymore, whereas with `private` it would be!

## Tuple Types & Recursive Type Aliases

```ts
type Foo<T extends any[]> = [boolean, ...T, boolean];
```

Before TS 4, you could only put `...T` at the end, however now you do not.

### Labelled tuple types

There are also **labelled tuple types**:

```ts
type Address = [number, string, number, string];

// take everything from address in order
function printAddress(...address: Address) {
  // omitted
}

// we get a terrible typing experience that doesn't explain much
printAddress()

// We can fix this with labelled tuple types!
type Address = [streetNumber: number, city: string, state: string, postal: number]

// take everything from address in order
function printAddress(...address: Address) {
  // omitted
}

// Happier experience that gives more information for the tuple!
printAddress()
```

### Type aliases and interfaces

A good example of this is now it can be used for JSON.

```ts
// old way from TS v3
type JSONValue = string | number | boolean | null | JSONArray | JSONObject;
interface JSONArray extends Array<JSONValues> {}

// new way from TS v4
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | {
      [k: string]: JSONValue;
    };
```

### Template type literals

```ts
type Corner = `${'top'|'bottom'}-${'left'|'right'}`
```

## TS Errors

`@ts-expect-error` helps suppress an error. That being said, if there IS no error, it will throw an error!

## Error Handling with Unknown

You SHOULD use `unknown` for throwing errors now.

```ts
function somethingRisky() {}

try {
  somethingRisky();
  // in case it removes itself, this should be `err: unknown`
} catch (err) {
  // DON'T forces us to handle the error type
  console.log(err.stack);
  // DO
  if (err instanceof Error) {
    console.log(err.stack);
  } else {
    console.log(err);
  }
}
```

We can also add a function **which should only be used for testing**.

```ts
// before TS 3.7
function isError(err: any): err is Error {
  return err instanceof Error
}

// after - described as something that should be more in a test suite
function assertIsError(err:any): asserts err is Error {
  if (!(err instanceof Error)) throw new Error(`Not an error: ${err}`)
}

function somethingRisky() {}

try {
  somethingRisky();
  // in case it removes itself, this should be `err: unknown`
} catch (err) {
  assertIsError(err)
  console.log(err.stack);
}
```

## Declaration Files & Type-only imports

You can now generate type files for JS.

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

### type-only import

```ts
import type { useAsyncDataEffect } from 'path/to/module'

// now just uses their type `useAsyncDataEffect`
```
