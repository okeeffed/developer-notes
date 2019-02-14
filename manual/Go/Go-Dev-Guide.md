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

It is important to note that if your other `package main` files are not in the `$GOPATH` that you need to include them during your run state ie `go run main.go deck.go`.

## Slice range syntax

```go
// [StartingAt : UpToButNotInclusive]
slice := ["one", "two", "three"]
// Get "one", "two"
sliceRange := slice[0:2]
// Same as...
sliceRangeTwo  := [:2]
// Get just the last
sliceRangeThree := [2:]
```

## Returning multiple values

```go
// Use slices
func deal(d deck, handSize int) (deck, deck) {
  return d[:handSize], d[handSize:]
}

func main() {
  cards := newDeck()

  // init and assign return values
  hand, remainingDeck := deal(cards, 5)
  hand.print()
  remainingDeck.print()
}
```

## Converting to bite slices (type conversion)

```go
byteSlice := []byte("Hi there")
```

## Writing to file

```go
// main.go
package main

func main() {
  cards := newDeck()
  cards.saveToFile("my_cards")
}

// deck.go

// omit newDeck()
func (d deck) saveToFile(filename string) error {
   return ioutil.WriteFile(filename, []byte(d.toString()), 0666)
}
```

## Reading from hard drive

```go
// main.go
// main.go
package main

func main() {
  cards := newDeckFromFile("my_cards")
  cards.print()
}

// deck.go
func newDeckFromFile(filename string) deck {
	// bs = byteSlice
	bs, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	s := strings.Split(string(bs), ",")
	return deck(s)
}
```

## Shuffling a Deck

There is no inbuilt function to randomise a slice.

```go
// main.go
package main
import (
  "math/rand"
  "time"
)

// Use slices
func deal(d deck, handSize int) (deck, deck) {
  return d[:handSize], d[handSize:]
}

func (d deck) shuffle() {
  source := rand.NewSource(time.Now().UnixNano())
  r := rand.New(source)

  for i := range d {
    newPosition := r.Intn(len(d) - 1)

    // fancy one line swap
    d[i], d[newPosition] = d[newPosition], d[i]
  }
}

func main() {
   func main() {
     cards := newDeck()

     // init and assign return values
     cards.shuffle()
     cards.print()
   }
}
```

## Testing with Go

```go
// deck_test.go
package main

import "testing"

func TestNewDeck(t *testing.T) {
  d := newDeck()

  if len(d) != 16 {
    t.Errorf("Expected deck length of 16, but got %v", len(d))
  }
}
```

### Asserting Elements 

```go
// deck_test.go
package main

import "testing"

func TestNewDeck(t *testing.T) {
  d := newDeck()

  if len(d) != 16 {
    t.Errorf("Expected deck length of 16, but got %v", len(d))
  }

  if d[0] != "Ace of Spaces" {
    t.Errorf("Expected first card of Ace of Spaces, but got %v", d[0]);
  }

  if d[len(d-1)] != "Four of Clubs" {
    t.Errorf("Expected first card of Four of Clubs, but got %v", d[len(d-1)]);
  }
}
```

### Clean up for file writing

```go
// deck_test.go
package main

import (
  "testing"
  "os"
)

func TestNewDeck(t *testing.T) {
  d := newDeck()

  if len(d) != 16 {
    t.Errorf("Expected deck length of 16, but got %v", len(d))
  }

  if d[0] != "Ace of Spaces" {
    t.Errorf("Expected first card of Ace of Spaces, but got %v", d[0]);
  }

  if d[len(d-1)] != "Four of Clubs" {
    t.Errorf("Expected first card of Four of Clubs, but got %v", d[len(d-1)]);
  }
}

// although long name, the test 
func TestSaveToDeckAndNewDeckFromFile(t *testing.T) {
  os.Remove("_decktesting")

  d := new Deck()
  d.saveToFile("_decktesting")

  loadedDeck := newDeckFromFile("_decktesting")

  if len(loadedDeck) != 16 {
    t.Errorf("Expected 16 cards in deck, got %v", len(loadedDeck))
  }

  os.Remove("_decktesting")
}
```

## Structs in Go

Structs are a collection of different properties linked with a particular purpose.

If we want to convert the string "Ace of Spaces" to become more flexible and as a structure, we could create a struct:

If you init a struct with no values, the zero values are assigned as the following:

| Type   | Zero Value |
| ------ | ---------- |
| string | ""         |
| int    | 0          |
| float  | 0          |
| bool   | false      |

```go
type card struct {
  house string
  value string
}

// usage
func main() {
  card := card{"Spaces", "Ace"}
  // being more definitive
  cardTwo := card{house: "Spaces", value: "Ace"}
  fmt.Println(card)

  // non-init - sets the zero value
  // %+v will print out all field names and values
  var cardThree card
  fmt.Printf("%+v", cardThree)
}
```

## Embedding Structs

```go
type contactInfo struct {
  email string
  zipCode int
}

type person struct {
  firstName string
  lastName string
  contactInfo
}

func main() {
  jim := person{
    firstName: "Jim",
    lastName: "Party",
    contactInfo: contactInfo{
      email: "jim@gmail.com",
      zipCode: 94000
    }
  }

  fmt.Printf("%+v", jim)
  // same as
  jim.print()

  // Update name
  jim.updateNameIncorrect("jimmy")
  jim.print() // still shows jim instead of jimmy

  // Correct
  jimPointer := &jim
  jimPointer.updateName("jimmy")
  jim.print() // prints jimmy

  // Also works - shortcut for the receiver
  jim.updatename("jimmy")
  jim.print()
}

func (p person) print() {
  fmt.Printf("%+v", p)
}

// updateName without a pointer
func (p person) updateNameIncorrect(newFirstName string) {
  p.firstName = newFirstname
}

// updateName correctly
// note that taking *type means we're working with a pointer
// *variable means we want to manipulate the value it is pointing at
func (p *person) updateName(newFirstName string) {
  (*p).firstName = newFirstname
}
```

## Pointer operations

- Turn `address` into `value` with `*address`
- Turn `value` into `address` with `&value`
- 