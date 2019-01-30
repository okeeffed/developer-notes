---
name: The Complete Go Developer Guide
menu: Go
---

# The Complete Go Developer Guide

## Intro to the Go CLI

| Command    | Action                                                  |
| ---------- | ------------------------------------------------------- |
| go build   | Compiles go source files                                |
| go run     | Compiles and executes one or two files                  |
| go fmt     | Formats all go code in current directory                |
| go install | Compiles and "installs" a package                       |
| go get     | Downloads the raw source code of someone else's pacakge |
| go test    | Runs any tests associated with the current project      |

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

## Go Packages

When you see lines like `package main`, that's like a workspace. 

There are two types of packages in Golang: 

1. Executable: Generates a file that we can run.
2. Reuseable: Code used as "helpers" -- a good place to put reusable login.

Take for example three files:

```go
// main.go
package main

import "fmt"

func main() {
  fmt.Println("Hi there!")
}

// support.go
package main

func support() {
  fmt.Println("Hi support!")
}

// helper.go
package main

func helper() {
  fmt.Println("Hi helper!")
}
```

How can we tell the difference between whether we are creating a `executable` or `reuseable` type of package? It actually depends on whether you use the name `package main`. If you ran `go build` and you did not use `package main`, it will not spit out an executable file.

Any executable package also needs a func called `main`.

## Variable Declarations

Variables in Go can generally be inferred from the right hand side. Linters will generally help you out with this.

Shorthand declarations with initialisation can be done with `:=`, although it should be noted you can omit the `:` when declaring new values for variables.

```go
package main

func main() {
    var card string = "Ace of spades"
    easierCard := "Ace of hearts"
    easierCard = "Five of Diamonds"
}
```

## Functions and Return Types

```go
package main

import "fmt"

func main() {
  card := newCard()

  fmt.Println(card)
}

func newCard() string {
  return "Ace of spades"
}
```
