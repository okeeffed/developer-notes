---
name: Basic Slice Functions
menu: Go
---

# Basic Slice Functions

Set up the folder with test and main file:

```go
// slices_test.go
package slices

import (
	"testing"
)

// slices.go
package slices
```

// Push append int to end of int slice
func Push(a []int, b int) []int {
return append(a, b)
}

// Pop return an integer from an array + array without last index
func Pop(a []int) (int, []int) {
x, b := a[len(a)-1], a[:len(a)-1]
return x, b
}

// Unshift append as first element and return new slice
func Unshift(a []int, b int) []int {
return append([]int{b}, a...)
}

// Shift remove from front and return int and new slice
func Shift(a []int) (int, []int) {

}
