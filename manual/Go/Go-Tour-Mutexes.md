---
name: Go Tour Mutexes
menu: Go
---

# Go Tour Mutexes

## sync.Mutex

We've seen how channels are great for communication among goroutines.

But what if we don't need communication? What if we just want to make sure only one goroutine can access a variable at a time to avoid conflicts?

This concept is called mutual exclusion, and the conventional name for the data structure that provides it is mutex.

Go's standard library provides mutual exclusion with `sync.Mutex` and its two methods:

- Lock
- Unlock

We can define a block of code to be executed in mutual exclusion by surrounding it with a call to `Lock` and `Unlock` as shown on the Inc method.

We can also use `defer` to ensure the mutex will be unlocked as in the `Value` method.

## Basic Mutex Example

```golang
package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	v   map[string]int
	mux sync.Mutex
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mux.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mux.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	fmt.Println(c.v) // map[]

	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second) // delay during async goroutine
	fmt.Println(c.Value("somekey")) // 1000
}
```
