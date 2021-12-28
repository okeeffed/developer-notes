---
menu: Go
name: Go Tour Channels
---

# Go Tour Channels

Channels are a typed conduit through which you can send and receive values with the channel operator, <-.

```golang
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and
           // assign value to v.
```

(The data flows in the direction of the arrow.)

Like maps and slices, channels must be created before use:

```golang
ch := make(chan int)
```

By default, sends and receives block until the other side is ready. This allows goroutines to synchronize without explicit locks or condition variables.

The example code sums the numbers in a slice, distributing the work between two goroutines. Once both goroutines have completed their computation, it calculates the final result.

## Basic Example

```golang
package main

import "fmt"

func sum(s []int, c chan int) {
	fmt.Println("%v", s)
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
```

Prints:

```shell
%v [-9 4 0]
%v [7 2 8]
-5 17 12
```

## Buffered Channels

Channels can be buffered. Provide the buffer length as the second argument to make to initialize a buffered channel:

```golang
ch := make(chan int, 100)
```

Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty.

If you overflow the buffer, you'll be hit with a `deadlock` error.

```golang
package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
```

## Range and Close

A sender can close a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression: after

```golang
v, ok := <-ch
```

`ok` is false if there are no more values to receive and the channel is closed.

The loop for `i := range c` receives values from the channel repeatedly until it is closed.

Note: Only the sender should close a channel, never the receiver. Sending on a closed channel will cause a panic.

Another note: Channels aren't like files; you don't usually need to close them. Closing is only necessary when the receiver must be told there are no more values coming, such as to terminate a range loop.

```golang
package main

import (
	"fmt"
)

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```

This prints:

```shell
0
1
1
2
3
5
8
13
21
34
```

## Select

The select statement lets a goroutine wait on multiple communication operations.

A select blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.

```golang
package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
```

After looping through in the IIFE `go func`, it will send a 0 to the `quit` channel and `select` will handle by printing "quit" and returning from the infinite `for` loop.

## Default Selection

The default case in a select is run if no other case is ready.

Use a default case to try a send or receive without blocking:

```golang
select {
case i := <-c:
    // use i
default:
    // receiving from c would block
}
```

Example:

```golang
package main

import (
	"fmt"
	"time"
)

func main() {
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	for {
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}
}
```

## Example: Equivalent Binary Trees

```golang
package main

import (
  "golang.org/x/tour/tree"
  "fmt"
)

// Walk walks the tree t sending all values
// from the tree to the channel ch.
func Walk(t *tree.Tree, ch chan int) {
	defer close(ch) // <- closes the channel when this function returns
  var walk func(t *tree.Tree)
  walk = func(t *tree.Tree) {
      if t == nil {
          return
      }
      walk(t.Left)
      ch <- t.Value
      walk(t.Right)
  }
  walk(t)
}

// Same determines whether the trees
// t1 and t2 contain the same values.
func Same(t1, t2 *tree.Tree) bool {
	done := make (chan bool)
	defer close(done)

	ch1 := make(chan int)
	ch2 := make(chan int)
	go Walk(t1, ch1)
	go Walk(t2, ch2)

	go func() {
		for i := range ch1 {
			j := <-ch2
			fmt.Println("i: %v", i)
			fmt.Println("j: %v", j)

			if i != j {
				done <- false
			}
		}
		done <- true
	}()
	return <-done
}

func main() {
	ch := make(chan int)
	go Walk(tree.New(1), ch)

	for i := 1; i <= 10; i++ {
		fmt.Println(<-ch)
	}

	t1 := tree.New(1)
	t2 := tree.New(2)

	res1 := Same(t1, t1)
	fmt.Println("Res 1: %v", res1)

	res2 := Same(t1, t2)
	fmt.Println("Res 2: %v", res2)
}
```
