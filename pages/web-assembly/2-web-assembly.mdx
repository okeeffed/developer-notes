---
name: 2) Web Assembly
---

# Web Assembly

import { SimpleQuiz } from "../../components/SimpleQuiz"

A powerful low-level language that is meant to be a compile target of higher-level languages.

You are not meant to write web assembly directly.

It is a secure, sandbox area that can operate at near-native speed.

## Resources

1. [OpCodes](https://young.github.io/intro-to-web-assembly/wasm/stack)
2. [Interactive OpCode table](https://pengowray.github.io/wasm-ops/)

## Why a web assembly and not web worker?

Web assembly can be cached, whereas a web worker needs to be spun up everytime.

Web assembly is also not targeted to JavaScript engineers.

## Files types

Web assembly has two different types of files.

| File type | Does                                          |
| --------- | --------------------------------------------- |
| `.wasm`   | Actual assembly code in binary                |
| `.wat`    | Human-readable textual representation of code |

The `.wat` files are only used for editing/debugging and also compiles to WASM.

## Modules

The fundamental unit of code is a `module`. Within a module, we create functions to export which can be called by JavaScript.

Func params are known as _locals_ and we access them with either `get_local` or `local.get`:

```wasm
(module
    (func $name (param $param i32) (result i32)
    ;; Body
    )
)
```

> Web Assembly module is a tree-based structure known as an `S-expression`.

[Web Assmebly Studio](https://webassembly.studio/) can be used to write the first hello world.

Our function will take a 32-bit integer and return one:

```wat
;; main.wat
(module
  (func $helloworld (param $num1 i32) (result i32)
    get_local $num1
  )
  (export "helloworld" (func $helloworld)) ;; export helloworld out
)
```

Once written, we run `build` to output a `main.wasm` file.

Don't fret too much yet about what is happening in the JS file. It needs to be update to call `helloworld`:

```js
fetch("../out/main.wasm")
  .then((response) => response.arrayBuffer())
  .then((bytes) => WebAssembly.instantiate(bytes))
  .then((results) => {
    instance = results.instance
    document.getElementById(
      "container"
    ).textContent = instance.exports.helloworld(42)
  })
  .catch(console.error)
```

## Stack & OpCode

### Stack

WebAssembly is a stack machine. It is either pushed or popped off the stack.

> This is a machine stack, not what you are used to in JS land.

Code like `get_local` that we wrote will push the value onto the stack.

> There is no needs to allocate/deallocate with this simple machine stack.

### OpCodes

Operation codes are readable computer instructions representing machine language instructions.

Terms that we used map to these hexadecimal codes:

| OpCode | Hex Representation |
| ------ | ------------------ |
| get    | 0x20               |
| add    | 0x6A               |

A full list of codes can be found [here](https://pengowray.github.io/wasm-ops/).

> OpCodes are specific to the data type.

## Instruction Stack

All WA instructions read and write from the stack.

```wat
get_local 0 ;; push first parameter onto the stack
get_local 1 ;; push second parameter onto the stack
i32.mul ;; pop both values and execute operation
```

To push a value onto the stack use the i32.const instruction

```wat
i32.const 99 ;; push 99 onto the stack
```

## Minusone exercise

Creating a function that takes an i32 and substracts 1:

```wat
(module
  (export "minusone" (func $minusone))
  (func $minusone (param $x i32) (result i32)
      get_local $x
      i32.const 1
      i32.sub
  )
)
```

## "More complex" web assembly

The following JS:

```js
function example(n) {
  if (n === 2) {
    return n * 2
  }

  if (n === 3) {
    return n * 3
  }

  return n * n
}
```

Converts into this:

```wat
 (func $example (param $0 i32) (result i32)
  get_local $0
  i32.const 2
  i32.eq
  if
   get_local $0
   i32.const 2
   i32.mul
   return
  end
  get_local $0
  i32.const 3
  i32.eq
  if
   get_local $0
   i32.const 3
   i32.mul
   return
  end
  get_local $0
  get_local $0
  i32.mul
 )
```

This is not so intuitive to know, so for more complicated use-cases we can use `AssemblyScript`.
