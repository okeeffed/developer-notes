---
menu: Go
name: Go for JS Devs
---

# Go for JS Devs

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/go-for-js-devs/documentation/)
2. [Course Slides](https://static.frontendmasters.com/resources/2019-09-24-golang/golang.pdf)
3. [Golang.org](https://golang.org/)

## Documentation

Breanna shows 3 useful resources from the [Go website](golang.org):

1. Documents
2. Packages
3. Blog

### Documents

The general big picture of Go. Breanna recommend the "Effective Go" link.

You can also run `go doc <search>`.

## Go vs JS

Two major differences:

1. Typing.
2. Structures: Go is based on Structs, Pointers, Methods and Interfaces.
3. Error handling: Golang requires it to be explicit. JS is built in ie you'll get yelled at regardless.
4. Go has Strong Opinions, JS is relatively weak.

## Anatomy of a Go file

1. Requires a package.
2. Import requirements.
3. `func main` for a main function. This is the entry point for the program.

## Printing Exercise

```golang
package main

import "fmt"

func main() {
  fmt.Printf("Hi! My name is %s. I have lived in %s.", "Dennis", "O'Keeffe")
}
```

## Syntax

Breana uses the `reflect` page to find the types that come out.

```golang
package main

import (
  "fmt"
  "reflect"
)

func main() {
  var x = 4
  fmt.Printf(reflect.TypeOf(float64(x) * 5.5))
}
```

## Go Toolkit

```s
go run main.go # compile and run
go install # behaves almost identically to go build , but instead of leaving the executable in the current directory
go build # build binary
go fmt main.go # format file
go list # show packages establish in the code package
go list ./... # show all packages in this directory
go doc fmt.Println # show go doc for file
go get golang.org/x/lint/golint # install Go packages
golint # run linter
go vet # Go source code and reports suspicious constructs
```

## Go Packages

Breana creates a file `utils/math.go` to use as a utility for the main package.

```golang
// math.go
package utils

import "fmt"

// Add takes n ints and returns sum
func Add(nums ...int) int {
  total := 0
  for _,v := rage nums {
    total += v
  }
}

// packages.go
package main

import (
  "fmt"
  math "root/path/to/utils" // alias to math
)

func calculateImportantData() int {
  totalValue := math.Add(1,2,3,4)
  return totalValue
}

func main() {
  fmt.Println("packages!")

  total := calculateImportantData()
  fmt.Println("Total", total)
}
```

## Panic, Recover & Defer

```golang
f, err := os.Open(filename)
defer f.Close() // run at the end of the block scope

panic(err.Error()) // throw error
```

Defer also in a "last-in-first-out" structure.

Panic is called during a run time error and fatally kill the program. Recover tells Go what to do when that happens.

Recover MUST be paired with defer, which will fire even after a panic.

```golang
func recoverFromPanic() {
  if r := recover(); r
}

func doThings() {
  defer recoverFromPanic()
  for i := 0; i < 5; i++ {
    fmt.Println(i)
    if i == 2 {
      panic("PANIC!")
    }
  }
}
```
