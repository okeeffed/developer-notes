---
name: Go Cheat Sheet
menu: Go
---

# Go Cheat Sheet

Good refs:

https://github.com/a8m/go-lang-cheat-sheet

## In a nutshell

- Imperative language
- Statically typed
- Syntax tokens similar to C (but less parentheses and no semicolons) and the structure to Oberon-2
- Compiles to native code (no JVM)
- No classes, but structs with methods
- Interfaces
- No implementation inheritance. There's type embedding, though.
- Functions are first class citizens
- Functions can return multiple values
- Has closures
- Pointers, but not pointer arithmetic
- Built-in concurrency primitives: Goroutines and Channels

## Basics

```go

package main

import "fmt"

func main() {
    fmt.Println("Hello Go")
}
```

```shell
go run hello.go
```
