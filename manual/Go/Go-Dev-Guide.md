---
name: The Complete Go Developer Guide
menu: Go
---

# The Complete Go Developer Guide

## Intro to the Go CLI

| Command  | Action                                 |
| -------- | -------------------------------------- |
| go build | Compiles go source files               |
| go run   | Compiles and executes one or two files |

## Hello World

Using the Go CLI, we can run a simple hello world as so.

```go
package main

import "fmt"

/**
 * Basic hello world.
 * Run using go -o
 */
func main() {
	fmt.Println("Hi there!")
}
```