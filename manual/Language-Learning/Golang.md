---
menu: Language Learning
name: Golang
---

# Golang

## The "why" behind the language?

### Quora Top Answer

Google has two tremendous problems. One of them is compile time. Back in the 1980’s, reasonable sized projects took hours to do a clean build. There were whole server farms dedicated to recompiling. You got a new "nightly build" and made modifications to that.

Google builds things that are so ridiculously huge that it’s still like that in 2017. It takes 5 hours to rebuild chrome from scratch even on a big fat i7 system. The pain of compile time on these builds hurts so much that Google has invented build tools that separate the dependency analysis and compiling, just to gain a few per cent in build time using conventional languages. Go is designed for quick compilation without the need for dependency checking, so it addresses the build pain.

Google’s other problem is string processing. Google reads and analyzes a lot of web pages, which are text files. They do a lot of string manipulation, so it pays for this to be really efficient. Google built a rich library of string functions into Go, Garbage collecting makes strings in Go simple to think about, and efficient in ways some other string libraries are not (I’m talking to you, C++ committee).

Go has good concurrency support, which is essential for a language designed after 2002, and for companies who have a million servers waiting to be spun up. But it’s not breaking new ground in concurrency.

Go = C + strings + garbage collection + concurrency. If you want to build really big programs to analyze the whole freakin’ internet, Go would be a pretty good choice for you.

### From Rob Pike, one of Go's Creators

The Go programming language was conceived in late 2007 as an answer to some of the problems we were seeing developing software infrastructure at Google.

The computing landscape today is almost unrelated to the environment in which the languages being used, mostly C++, Java, and Python, had been created. The problems introduced by multicore processors, networked systems, massive computation clusters, and the web programming model were being worked around rather than addressed head-on.

Moreover, the scale has changed: today's server programs comprise tens of millions of lines of code, are worked on by hundreds or even thousands of programmers, and are updated literally every day. To make matters worse, build times, even on large compilation clusters, have stretched to many minutes, even hours.

Go was designed and developed to make working in this environment more productive. Besides its better-known aspects such as built-in concurrency and garbage collection, Go's design considerations include rigorous dependency management, the adaptability of software architecture as systems grow, and robustness across the boundaries between components.

References:

- [Quora - Why Go?](https://www.quora.com/Why-did-Google-develop-Go)
- [Go at Google](https://talks.golang.org/2012/splash.article)

## Pros and cons of the language?

### Pros

- Ease of use: clean and accessible syntax for newcomers and not a lot of complex functions to learn. Similarities to those proficient in C++/C#.
- Great standard library.
- Strong security built in: strongly typed, garbage collected. Lack of generics means you need to be more diligent.
- Likely to stay part of Google's architecture for a good, long time.
- Smart documentation.

### Cons

- Sometimes too simplistic: lack of versitility. Some of the hottest languages pride themselves on complexity.
- Still young: has a long was to go in terms of library support.
- No virtual machine: the reason so many popular languages are based of VMs is to offer more efficient code, meaning Go file size often dwarf those of competing programming languages. Can chew through RAM.
- Hasn't quite found the niche.
- No GUI library

References:

- [Hackernoon Pros and Cons of Go](https://hackernoon.com/should-i-go-the-pros-and-cons-of-using-go-programming-language-8c1daf711e46)

## What are the use cases?

- DevOps: Go is being used within DevOps, for writing update scripts, server maintenance software, batch processing etc.
- WASM (WebAssembly) support is new and still experimental, but I see a bright future for Go in this category, due to Go’s excellent support for UTF-8, concurrency and ease of use.
- Cryptocurrency. Go has been used for the Bitcoin Lightning Network and Ethereum blockchain.
- Command Line Tools. Examples: Snappy the package manager for Linux that is taking over from APT in certain distros, is developed in Go.
- Any type of API using REST, GraphQL or gRPC. Examples are abundant, but both Dropbox, Uber and GitHub are known to have built API’s in Go.
- Any server-side service, including but not limited to, pub/sub servers and clients, caching mechanisms, integration layers, high-CPU utilisation jobs such as number crunching, statistics and cryptographic algorithms, jobs involving high levels of I/O and where there are extremely high requirements for simultaneous processing of thousands or millions of HTTP requests.
- High-performance scalable database implementations. Examples: CockroachDB, InfluxDB.
- Containerisation, ie. system-level software that interacts with the OS through its public API. Examples: Docker, Kubernetes.

## Testing / Benchmarking

The built-in `testing` package can be used for both testing and benchmarking.

Run `go test` to run tests and `go test -v --bench . --benchmem` for benchmarking.

See below.

```go
package greeting

import "testing"

// Define a function named HelloWorld that takes no arguments,
// and returns a string.
// In other words, define a function with the following signature:
// HelloWorld() string

func TestHelloWorld(t *testing.T) {
	expected := "Hello, World!"
	if observed := HelloWorld(); observed != expected {
		t.Fatalf("HelloWorld() = %v, want %v", observed, expected)
	}
}

// BenchmarkHelloWorld() is a benchmarking function. These functions follow the
// form `func BenchmarkXxx(*testing.B)` and can be used to test the performance
// of your implementation. They may not be present in every exercise, but when
// they are you can run them by including the `-bench` flag with the `go test`
// command, like so: `go test -v --bench . --benchmem`
//
// You will see output similar to the following:
//
// BenchmarkHelloWorld   	2000000000	         0.46 ns/op
//
// This means that the loop ran 2000000000 times at a speed of 0.46 ns per loop.
//
// While benchmarking can be useful to compare different iterations of the same
// exercise, keep in mind that others will run the same benchmarks on different
// machines, with different specs, so the results from these benchmark tests may
// vary.
func BenchmarkHelloWorld(b *testing.B) {
	for i := 0; i < b.N; i++ {
		HelloWorld()
	}
}
```

## Popular web servers for the language?

Go comes with a powerful inbuilt web server.

References:

- https://getgophish.com/blog/post/2018-12-02-building-web-servers-in-go/

## Hello, World!

```go
package greeting

// HelloWorld adheres to the developer norm!
func HelloWorld() string {
	return "Hello, World!"
}
```

## Documentation

The commandline tool primnts plain test docs to standard output.

`go doc fmt Println`

## What are the nuances of the language?

TODO

## How does package management work?

[Official Guide](https://github.com/golang/go/wiki/PackagePublishing)
[StackOverflow Response](https://stackoverflow.com/questions/17539407/golang-how-to-import-local-packages-without-gopath)

First, host it online.

```text
import "github.com/kylelemons/go-gypsy/yaml"
             ^         ^          ^     ^
             |         |          |     `-- Package name
             |         |          `-------- Project name
             |         `------------------- Author's handle
             `----------------------------- Hosting site
```

Go >= version 1 supports subdirectories of package repositories.

The tl;dr:

```shell
export GO111MODULE=on
go mod init
go mod vendor # if you have vendor/ folder, will automatically integrate
go build
```

Example generated `go.mod` file:

```shell
module github.com/okeeffed/module-data-structures-go-hello-world

go 1.12
```

Now you can run `go doc module-data-structures-go-hello-world HelloWorld` to check docs for that particular package.

## How does importing work?

References from the [Medium article](https://medium.com/golangspec/import-declarations-in-go-8de0fd3ae8ff).

```go
package main
import (
    "fmt"
    "math"
)
func main() {
    fmt.Println(math.Exp2(10))  // 1024
}
```

Other examples:

```go
import log "github.com/sirupsen/logrus"
```

With custom package names:

```go
# github.com/mlowicki/main.go
package main
import (
    "fmt"
    "github.com/mlowicki/b"
)
func main() {
    fmt.Println(c.B)
}
# github.com/mlowicki/b/b.go
package c
var B = "b"
```

## How does logging work?

Some examples [on Golang printing](http://xahlee.info/golang/golang_print.html)

```go
package logexample

import "fmt"

func main() {
  fmt.Println("Hello, world!")
  fmt.Printf("there are %v apples\n", 3)
  fmt.Printf("Name is %v, Age is %v \n", "john", 36)
}
```

Useful placeholders:

| Placeholder | Value                                     |
| ----------- | ----------------------------------------- |
| %v          | any value printed in human readable form  |
| %#v         | print in Golang syntax                    |
| %+v         | if value is struct, also show field names |
| %T          | type of the value                         |
| %%          | a literaly percent sign                   |

Note: `%T` is useful when learning Golang.

## Useful links/articles for tips and tricks

- [Golang tutorial](http://xahlee.info/golang/golang_index.html)

## Understanding Through Programs

Not all need to be done (pending what the language is useful for), but here are some useful ideas to get familiar with packages and testing for real world uses:

- Webserver that takes and returns JSON
- CLI tool that parses the markdown for this file and can be used as a helper
- A file reader/writer that parses common file types
