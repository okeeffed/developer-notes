---
menu: Go
name: Go Tour Methods & Pointer Indirection
---

# Go Tour Methods & Pointer Indirection

Take the following code:

```golang
package main

import "fmt"

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &Vertex{4, 3}
	p.Scale(3)
	ScaleFunc(p, 8)

	fmt.Println(v, p)
}
```

Comparing the previous two programs, you might notice that functions with a pointer argument must take a pointer:

```golang
var v Vertex
ScaleFunc(v, 5)  // Compile error!
ScaleFunc(&v, 5) // OK
```

While methods with pointer receivers take either a value or a pointer as the receiver when they are called:

```golang
var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK
```

For the statement `v.Scale(5)`, even though v is a value and not a pointer, the method with the pointer receiver is called automatically. That is, as a convenience, Go interprets the statement `v.Scale(5)` as `(&v).Scale(5)` since the Scale method has a pointer receiver.

## Reverse direction

The equivalent thing happens in the reverse direction.

Take the following code:

```golang
package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func AbsFunc(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
	fmt.Println(AbsFunc(v))

	p := &Vertex{4, 3}
	fmt.Println(p.Abs())
	fmt.Println(AbsFunc(*p))
}
```

Functions that take a value argument must take a value of that specific type:

```golang
var v Vertex
fmt.Println(AbsFunc(v))  // OK
fmt.Println(AbsFunc(&v)) // Compile error!
```

While methods with value receivers take either a value or a pointer as the receiver when they are called:

```golang
var v Vertex
fmt.Println(v.Abs()) // OK
p := &v
fmt.Println(p.Abs()) // OK
```

In this case, the method call `p.Abs()` is interpreted as `(\*p).Abs()`.

# Choosing a value or pointer receiver

There are two reasons to use a pointer receiver.

The first is so that **the method can modify the value that its receiver points to**.

The second is **to avoid copying the value on each method call**. This can be more efficient if the receiver is a large struct, for example.

In this example, both `Scale` and `Abs` are with receiver type `*Vertex`, even though the Abs method needn't modify its receiver.

In general, all methods on a given type should have either value or pointer receivers, but not a mixture of both. (We'll see why over the next few pages.)
