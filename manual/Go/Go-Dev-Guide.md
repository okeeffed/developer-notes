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

The patter for declaring a return type is to name that return type after a func is called.

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

## Slices and For Loops

Go has two basic structures for handling lists: 

1. Array: fixed length list of things
2. Slice: an array that can grow or shrink

Every slice must also be of the same type.

For a slice, we create it like so:

```go
func main() {
  cards := []string{newCard()}
  cards = append(cards, "Six of Spades")
  
  for i, card := range cards {
  fmt.Println(i, card)
  }
}
```

Note that the cards variable is immutable and a new slice is returned when we use the `append` function to add to the slice.

We can use the `range` keyword to iterate over a slice.

## Object Oriented approach vs Go approach

Note that there are no classes in Go.

In Go, what we do is declare a new type and then create `functions with a receiver`. This is a common pattern that repeats throughout Go courses.

In practice, we can update the `main.go` file with a new type we create:

```go
// main.go
package main

func main() {
  cards := deck{newCard()}
  cards = append(cards, "Six of Spades")

  cards.print()
}

func newCard() string {
  return "Ace of spades"
}

// deck.go
package main

import "fmt"

// Create a new type of 'deck'
// which is a slice of strings
type deck []string

// Creating a receiver function
func (d deck) print() {
  for i, card := range d {
    fmt.Println(i, card)
  }
}
```

