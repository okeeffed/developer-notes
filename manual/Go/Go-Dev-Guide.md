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
- Note that with slices vs structs, you can manipulate the slice directly without having to use a pointer, unlike structs.
- Slices with the underlying array get copied, but the array points to the same addresses.

### Reference vs Value Types

Use pointers for value types, don't worry about it for reference types.

| Value types | Reference types |
| ----------- | --------------- |
| int         | slices          |
| float       | maps            |
| string      | channels        |
| bool        | pointers        |
| structs     | functions       |

## Maps

Maps are similar to structs, but have some differences. These are basically `key:value` pairs.

These are comparable to `hash` in Ruby, `object` in JavaScript or `Dict` in Python.

For a map, the keys all need to be the same type, and the values all need to be the same type.

```go
package main

import (
  "fmt
)

func main() {
  // map: declare new map
  // [string]: keys are type string
  // string: values are type string
  colors := map[string]string {
    "red": "#ff0000",
    "green": "#4b9000"
  }

  fmt.Println(colors)
}
```

Creating a zero value map can be done basically in two ways:

```go
var colors map[string]string
colorsEq = make(map[string]string)

// adding in values
colorsEq["white"] = "#ffffff"
```

We MUST use square braces to access map values, NOT dot notation.

## Iterating Over Maps

```go
colors := map[string]string {
  "red": "#ff0000",
  "green": "#4b9000"
}


func printMap(c map[string]string) {
  for color, hex := range c {
    fmt.Println("Hex code for", color, "is", hex)
  }
}
```

## Maps Vs Structs

| Maps                                                | Structs                                               |
| --------------------------------------------------- | ----------------------------------------------------- |
| All keys must be same type                          | Values can be different types                         |
| Use to represent a collection of related properties | Need to know all the different fields at compile time |
| All values must be the same type                    | Keys don't support indexing                           |
| Don't need to know all keys at compile time         | Use to represent a `thing` with a lot of properties   |
| Keys are indexed - can iterate over them            | Value type!                                           |
| Reference type !                                    |                                                       |

## Interfaces

The following example shows similar types but returning different values.

```go
package main

type englishBot struct {}
type spanishBot struct {}

//
type bot interface {
  getGreeting() string
}

func main() {
  eb := englishBot()
  sb := spanishBot()

  printGreeting(eb)
  printGreeting(sb)
}

func (eb englishBot) getGreeting() string {
  // assume very custom logic to prove diff to spanishBot
  return "Hi There!"
}

func (sb spanishBot) getGreeting() string {
  // assume very custom logic to prove diff to spanishBot
  return "Hola!"
}

// any type that implements getGreeting is now an "honorary" member of type bot
func printGreet(b bot) {
  fmt.Println(b.getGreeting())
}
```

More complex interfaces in Go might have signatures like the following:

```go
type bot interface {
  getGreeting(string,int) (string, error)
}
```

If you want to set more "qualifiers" to conform to the interface, you can add more methods to the signature:

```go
type bot interface {
  getGreeting(string,int) (string, error)
  getBotVersion() float64
  respondToUser(user) string
}
```

You can only create values out of the concrete types and not interface types.

- Interfaces are not generic types (other langs have them, Go famously does not).
- Interfaces are "implicit", we don't have to say a custom type satisfies some interface.
- Interfaces are a contract to help us manage types.

## HTTP Package

Using http and getting a body response back and helping us understanding how structs work a little better.

![Diagram of how to access return body](https://res.cloudinary.com/gitgoodclub/image/upload/v1550201024/developer-notes/Screen_Shot_2019-02-15_at_2.22.59_pm.png)

If we use an interface as a property of a struct, we can add any property there as long as it conforms to the interface.

```go
type example interface {
  Reader
}

type resp struct {
  propOne example
}
```

We can also assemble multiple interfaces together to create another interface where all requirements need to be satisfied:

```go
type reader interface {}
type closer interface {}

type readCloser interface {
  reader
  closer
}
```

For an application of this in action with the http.Get func:

```go
package main

import (
  "fmt"
  "net/http"
  "os"
  "io"
)

func main() {
  resp, err := http.Get("https://google.com")
  if err != nil {
    fmt.Println("Error:", err)
    os.Exit(1)
  }

  // Note: Reader interface manipulates byte slice -- it doesn't return it. Go also has easier help functions to simply reading responses.
  bs := make([]byte, 99999)
  resp.Body.Read(bs)
  fmt.Println(string(bs))
}
```

In order to prevent ourselves from having to manually create a byte slice each time, we can use the `io.Copy` function instead. The method signature for this requires a destination that implements the `Writer` interface and a source that implements the `Reader` interface.

```go
package main

import (
  "fmt"
  "net/http"
  "os"
  "io"
)

func main() {
  resp, err := http.Get("https://google.com")
  if err != nil {
    fmt.Println("Error:", err)
    os.Exit(1)
  }

  // Updated code to simplify the process and print the resp.Body to Stdout
  io.Copy(os.Stdout, resp.Body)
}
```

With everything that we have learned so far about how `io.Copy` works, let's create something that implements the `Writer` interface:

```go
package main

import (
  "fmt"
  "net/http"
  "os"
  "io"
)

type logWriter struct {}

func main() {
  resp, err := http.Get("https://google.com")
  if err != nil {
    fmt.Println("Error:", err)
    os.Exit(1)
  }

  lw := logWriter{}

  // Updated code to simplify the process and print the resp.Body to Stdout
  io.Copy(lw, resp.Body)
}

func (logWriter) Write(bs []byte) (int, error) {
  fmt.Println(string(bs))
  fmt.Println("Just wrote this many bytes", len(bs))
  return len(bs), nil
}
```

## Channels and Go Routines

Both channels and go routines are used for cocurrency programming.

The project for this particular example will use a status checker.

![Project layout](https://res.cloudinary.com/gitgoodclub/image/upload/v1550533610/developer-notes/Screen_Shot_2019-02-19_at_9.59.38_am.png)

```go
package main

import (
  "io/http"
)

func main() {
  ws := []string{"http://google.com", "http://amazon.com", "http://facebook.com"}

  for _, link := range ws {
    checkLink(link)
  }
}

// this implementation will be synchronous
func checkLink(link string) {
  _, err := http.Get(link)
  if err != nil {
    fmt.Println(link, "might be down!")
    return
  }

  fmt.Println(link, "is up!")
}
```

If we think of the main function as the `main go routine`, we can start to imagine the above working sequentially as a result. In order to create new go routines, we can use the keyword `go`.

```go
package main

import (
  "io/http"
)

func main() {
  ws := []string{
    "http://google.com",
    "http://amazon.com",
    "http://facebook.com"
  }

  for _, link := range ws {
    // creates new Go routine
    go checkLink(link)
  }
}

// this implementation will be synchronous
func checkLink(link string) {
  _, err := http.Get(link)
  if err != nil {
    fmt.Println(link, "might be down!")
    return
  }

  fmt.Println(link, "is up!")
}
```

### Go Scheduler Behind The Scenes

![Go scheduler](https://res.cloudinary.com/gitgoodclub/image/upload/v1550533611/developer-notes/Screen_Shot_2019-02-19_at_10.46.20_am.png)

Not that with one CPU, the Go scheduler runs `one` routine until finished or hits a blocking call. If a blocking call is hit, the scheduler pausing execution on a routine and starts the next one.

If we insteads have multiple cores, the scheduler runs one thread on each "logical" core. This then truly runs multiple routines at the same time.

By default, Go tries to use one core.

In Go, you will constantly see `concurrency is not parallelism`. Concurrency is the case of multiple threads executing code. 

If one thread blocks, another one is picked up and worked out. Parallelism is the use of multiple physical CPU cores at the same time.

### Returning from Go routines

In order to get back to the `main` routine from child routines, we need to update the code to handle channels for communication.

Each `channel` communicates with a particular type - something incredibly important.


### Sending Data with Channels

| Syntax                    | Action                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `channel <- 5`            | Send value 5 into this channel                                                              |
| `myNumber <- channel`     | Wait for value to be sent into the channel. When we get one, assign the value to 'myNumber' |
| `fmt.Println(<- channel)` | Wait for value to be sent into channel. When we get one, log it out immediately             |

```go
package main

import (
  "io/http"
)

func main() {
  ws := []string{
    "http://google.com",
    "http://amazon.com",
    "http://facebook.com"
  }

  // creating a channel
  c := make(chan string)

  for _, link := range ws {
    // creates new Go routine - pass in a channel link
    go checkLink(link, c)
  }

  fmt.Println(<- c)
}

// this implementation will be synchronous
// you must now declare the channel and channel type
func checkLink(link string, c chan string) {
  _, err := http.Get(link)
  if err != nil {
    fmt.Println(link, "might be down!")
    c <- "Might be down I think"
    return
  }

  fmt.Println(link, "is up!")
  c <- "Yep it's up"
}
```