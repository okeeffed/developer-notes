---
name: 3) AssemblyScript
---

# AssemblyScript

import { SimpleQuiz } from "../../components/SimpleQuiz"

## Resources

1. [AssemblyScript setup](https://young.github.io/intro-to-web-assembly/assembly-script/setup)
2. [Working repo](https://github.com/young/intro-to-web-assembly/tree/main/lessons/assembly-script/exercises/1/iwasm)
3. [Loading AssemblyScript - Browser](https://young.github.io/intro-to-web-assembly/assembly-script/loading-browser)
4. [Memory in WebAssembly](https://young.github.io/intro-to-web-assembly/assembly-script/memory)
5. [Further resources and reading](https://young.github.io/intro-to-web-assembly/closing)

## Writing AssemblyScript

Looking into the exercise 1 folder `iwasm`, we can note a few things:

1. The main file is a `.ts` file.
2. The `tsconfig.json` extends `assemblyscript/std/assembly.json`.
3. The is a basic test after requiring a module.
4. A loader is used on the base `index.js` file `"@assemblyscript/loader"`
5. The build command is `asc assembly/index.ts --target debug && asc assembly/index.ts --target release`
6. There is a `asconfig.json` file that contains the targets.

With `AssemblyScript`, we need to be explicit for each step so that our `OpCodes` can be mapped correctly.

### asconfig.json

```json
{
  "targets": {
    "debug": {
      "binaryFile": "build/untouched.wasm",
      "textFile": "build/untouched.wat",
      "sourceMap": true,
      "debug": true
    },
    "release": {
      "binaryFile": "build/optimized.wasm",
      "textFile": "build/optimized.wat",
      "sourceMap": true,
      "optimizeLevel": 3,
      "shrinkLevel": 1,
      "converge": false,
      "noAssert": false
    }
  },
  "options": {}
}
```

### tsconfig.json

```json
{
  "extends": "assemblyscript/std/assembly.json",
  "include": ["./**/*.ts"]
}
```

## Running compiled AssemblyScript

Assuming our function is like so:

```ts
export function minusOne(n: i32): i32 {
  return n - 1
}
```

We can run `npm run asbuild` to output the compiled files.

We can then run `node` to validate.

```s
$ node
Welcome to Node.js v15.8.0.
Type ".help" for more information.
> const { minusOne } = require('./index.js')
undefined
> minusOne(22)
21
```

## AssemblyScript in the Browser

Because browsers don't understand all the "glue code", we need to approach loading `AssemblyScript` in the Browser.

More info [here](https://young.github.io/intro-to-web-assembly/assembly-script/loading-browser).

### Fetching wasm

We're fetching wasm from our server so let's use `instantiate()` and `instantiateStreaming()` to make a utility class for fetching and compiling our wasm.

```js
// iwasm/js/loader.js
class WasmLoader {
  constructor() {}

  async wasm(path) {
    console.log(`fetching ${path}`)

    if (!WebAssembly.instantiateStreaming) {
      return this.wasmFallback(path)
    }

    const { instance } = await WebAssembly.instantiateStreaming(fetch(path))

    return instance?.exports
  }

  /**
   * Fallback for Safari :/
   */
  async wasmFallback(path) {
    console.log("using fallback")
    const response = await fetch(path)
    const bytes = await response?.arrayBuffer()
    const { instance } = await WebAssembly.instantiate(bytes)

    return instance?.exports
  }
}
```

To have this loaded we can run a `index.html` file:

```html
<!DOCTYPE html>
<html>
<body>
  <div id="main"></div>
  <script src=/js/loader.js></script>
  <script>
      const WL = new WasmLoader();
      WL.wasm('/build/optimized.wasm')
      .then(instance => {
        const { minusOne } = instance;

        document.write(minusOne(44));
      });

  </script>
</body>
</html>
```

> Note that in general, you need the correct content type to be served back. This led the example to be run in Express that automatically resolves WASM types for you.

## Import native modules into AssemblyScript

Here we are going to import `abort` which is a native module to AssemblyScript.

```ts
export function minusOne(n: i32): i32 {
  abort()
  return n - 1
}
```

In the loader, we need to add them to the loader:

```js
class WasmLoader {
  constructor() {
    this._imports = {
      env: {
        abort() {
          throw new Error("Abort called from wasm file")
        },
      },
    }
  }

  async wasm(path, imports = this._imports) {
    console.log(`fetching ${path}`)

    if (!WebAssembly.instantiateStreaming) {
      return this.wasmFallback(path, imports)
    }

    const { instance } = await WebAssembly.instantiateStreaming(
      fetch(path),
      imports
    )

    return instance?.exports
  }

  async wasmFallback(path, imports) {
    console.log("using fallback")
    const response = await fetch(path)
    const bytes = await response?.arrayBuffer()
    const { instance } = await WebAssembly.instantiate(bytes, imports)

    return instance?.exports
  }
}
```

## Debugging WASM

AssmeblyScript serves sourcemaps, so we can map directly to the source that we are writing.

> In the Chrome Settings, you should also click on the WebAssembly debugging experiment.

## Import custom modules into AssemblyScript

```ts
declare function log(n: i32): void

export function minusOne(n: i32): i32 {
  log(n)
  return n - 1
}
```

Updating the loader:

```js
class WasmLoader {
  constructor() {
    this._imports = {
      env: {
        abort() {
          throw new Error("Abort called from wasm file")
        },
      },
      index: {
        log(n) {
          console.log(n)
        },
      },
    }
  }

  async wasm(path, imports = this._imports) {
    console.log(`fetching ${path}`)

    if (!WebAssembly.instantiateStreaming) {
      return this.wasmFallback(path, imports)
    }

    const { instance } = await WebAssembly.instantiateStreaming(
      fetch(path),
      imports
    )

    return instance?.exports
  }

  async wasmFallback(path, imports) {
    console.log("using fallback")
    const response = await fetch(path)
    const bytes = await response?.arrayBuffer()
    const { instance } = await WebAssembly.instantiate(bytes, imports)

    return instance?.exports
  }
}
```

The `index` comes from the namespace that it is imported from.

The `env` from before comes from the AssemblyScript native module namespace.

## Importing the AssmeblyScript Loader

This is an example of writing something a bit more complex.

```ts
// assembly/index.ts
declare function log(n: i32): void

export function minusOne(n: i32): i32 {
  log(n)
  return n - 1
}

export function fizzbuzz(n: i32): String | null {
  if (n % 15 === 0) {
    return "fizzbuzz"
  }

  if (n % 3 === 0) {
    return "fizz"
  }

  if (n % 5 === 0) {
    return "buzz"
  }

  return null
}
```

If we call fizzbuzz, we run into an issue where the returned value is a number (memory location).

What we need to do is tell assembly script that it is a pointer to a memory location.

We can just use the AssemblyScript loader to take care of a lot of that for us from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js"></script>
```

Instead of using the built-in libraries, we can lean on the loader package:

```ts
// loader is not available on the top-level scope
class WasmLoader {
  constructor() {
    this._imports = {
      env: {
        abort() {
          throw new Error("Abort called from wasm file")
        },
      },
      index: {
        log(n) {
          console.log(n)
        },
      },
    }
  }

  async wasm(path, imports = this._imports) {
    console.log(`fetching ${path}`)

    if (!loader.instantiateStreaming) {
      return this.wasmFallback(path, imports)
    }

    // destructuring removed, export all
    const instance = await loader.instantiateStreaming(fetch(path), imports)

    return instance?.exports
  }

  async wasmFallback(path, imports) {
    console.log("using fallback")
    const response = await fetch(path)
    const bytes = await response?.arrayBuffer()
    // destructuring removed, export all
    const instance = await loader.instantiate(bytes, imports)

    return instance?.exports
  }
}
```

We also need to update our build scripts:

```json
"asbuild:untouched": "asc assembly/index.ts --target debug --exportRuntime",
"asbuild:optimized": "asc assembly/index.ts --target release --exportRuntime",
```

> Note that the output WebAssembly code becomes far larger with the included glue code. Jem does not include the runtime unless absolutely needed.

Now to bring things full circle, we user the help `__getString` function to get the string from memory:

```html
<!DOCTYPE html>
<html>
<body>
  <div id="main"></div>
  <script src="https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js"></script>
  <script src=/js/loader.js></script>
  <script >
      const WL = new WasmLoader();
      WL.wasm('/build/optimized.wasm')
      .then(instance => {
        const { fizzbuzz, __getString } = instance;
        const str = __getString(fizzbuzz(3));
        document.write(str);
      });

  </script>
</body>
</html>
```

Under the hood you can see `__getString` [here](https://young.github.io/intro-to-web-assembly/assembly-script/loader-usage).

## Memory in Web Assembly

A link to more notes [here](https://young.github.io/intro-to-web-assembly/assembly-script/memory).

Memory in Web Assembly is linear. The easiest way to visualize it is to think of a long unbroken chain of 0's and 1's. When we instantiate a wasm module, a fixed portion of memory is allocated to the process and all data passed between wasm and JavaScript takes place in this fixed portion of space. This contrasts with JavaScript memory which utilizes both a stack and heap.

In contrast: A heap is dynamic, non-linear memory used by a program to arbitrarily read and store data.

WebAssembly uses an `ArrayBuffer` which is an object that represents raw binary data.

A `SharedArrayBuffer` is an `ArrayBuffer` that represents a fixed-length portion of memory that can be shared by multiple processes. `WebAssembly.Memory` is the name of the memory shared by JavaScript and WebAssembly that is used to pass data back and forth.

Because `ArrayBuffer` and `SharedArrayBuffer` are merely representations of raw binary data, we need to use a `TypedArray` to properly coerce the raw data into something useable by our processes.

### Memory and TypeArrays

Example of creating an `ArrayBuffer` and allocating one page of memory:

```ts
// Create an ArrayBuffer and allocate 1 page (64Kb) of memory
const memory = new WebAssembly.Memory({ initial: 1, shared: true })
// Create an array-like object where each index is a pointer to a 16-bit unsigned integer
const u16Array = new Uint16Array(memory.buffer)
// We can now directly write into memory and the number 42 will be accessible by both JavaScript and Web Assembly
u16Array[0] = 42
```

### Memory in AssemblyScript

```ts
// index.ts
// assembly/index.ts
// Grow memory by 2 pages (128Kb)
memory.grow(2)
// Save 21 at index 0
store<u8>(0, 21)
// Save 99 at index 1
store<u8>(1, 99)

export function readMemory(n: i32): i32 {
  return load<u8>(n)
}

// index.html
const { readMemory, memory } = instance

const memoryArray = new Uint8Array(memory.buffer)
// Read from memory at index 1
// Returns 99
document.write(memoryArray[1])
document.write("<br/>")
// Write to memory at index 2
memoryArray[2] = 42
// Returns 42
document.write(readMemory(2))
```

## JS vs WASM

As a final exercise, we will see the speed differences for calling prime numbers with Performance comparison:

```ts
// index.ts
export function isPrimeWasm(x: u32): bool {
  if (x < 2) {
      return false;
  }

  for (let i: u32 = 2; i < x; i++) {
      if (x % i === 0) {
          return false;
      }
  }

  return true;
}
// index.html
<!DOCTYPE html>
<html>
<body>
  <input id="primeIn"/>
  <script src="https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js"></script>

  <script src=/js/loader.js></script>
  <script>
    const el = document.getElementById("primeIn");

    function isPrimeJS(x) {
          if (x < 2) {
              return false;
          }

          for (let i = 2; i < x; i++) {
              if (x % i === 0) {
                  return false;
              }
          }
          return true;
      }

      const WL = new WasmLoader();
      WL.wasm('/build/optimized.wasm')
      .then(instance => {
        const { isPrimeWasm } = instance;
        el.addEventListener('keyup', () => {
          console.table(run(el.value))
        })
        function run(n) {
        const results = [];
          for (let i = 0; i < 1000; i++) {
          const timeStartWasm = performance.now();
          isPrimeWasm(n);
          const wasmTime = performance.now() - timeStartWasm;


          const timeStartJS = performance.now();
          isPrimeJS(n);
          const jsTime = performance.now() - timeStartJS;

          if (jsTime < wasmTime) {
            results.push('JavaScript');
          } else {
            results.push('WASM');
          }
        }

        return results.reduce((acc, item) => {
            if (item === 'JavaScript') {
                acc['JavaScript']++
            }
            if (item === 'WASM') {
                acc['WASM']++
            }
            return acc;
        }, {'JavaScript': 0, 'WASM': 0})

    }

      });
  </script>
</body>
</html>
```

> This will just check if a number is prime.

Once you run the code we can see that JavaScript can be faster - it depends on what you are doing. There is a cost to talking across the memory bridge.

JavaScript has great abstractions though to keep things simple.

> In the cases for simpler abstractions, use web workers. If you have a game or are writing pixels or manipulating bytes direct (image/video), use WASM.

Why between web workers and WASM? As mentioned before, it is what can be cached and web workers are expensive. The use case for web workers are complicated manipulation on objects and data structures.
