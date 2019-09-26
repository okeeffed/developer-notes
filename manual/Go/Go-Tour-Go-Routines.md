---
menu: Go
name: Go Tour Goroutines
---

# Go Tour - Goroutines

A `goroutine` is a lightweight thread managed by the Go runtime.

```golang
go f(x, y, z)
```

...starts a new goroutine running

```golang
f(x, y, z)
```

The evaluation of f, x, y, and z happens in the current goroutine and the execution of f happens in the new goroutine.

Goroutines run in the same address space, so access to shared memory must be synchronized. The sync package provides useful primitives, although you won't need them much in Go as there are other primitives. (See the next slide.)

## Example

```golang
package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

Output:

```shell
world
hello
hello
world
world
hello
hello
world
world
hello
```

Note that what enables the `goroutine` in the above function to run is the `time.Sleep` function. Without it, the main go routine executes `say('hello')` and exits before the `go say('world')` runs.
