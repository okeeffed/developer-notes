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

## Push

```go
// slices_test.go
func TestPushToIntSlice(t *testing.T) {
	s := []int{1, 2, 3}
	i := 4

	exp := []int{1, 2, 3, 4}
	res := Push(s, i)
	for idx, val := range res {
		if exp[idx] != val {
			t.Fatalf("Expected %+v, got %+v", exp, res)
		}
	}
}

// Push append int to end of int slice
func Push(a []int, b int) []int {
	return append(a, b)
}
```

## Pop

```go
// slices_test.go
func TestPopIntFromSliceSlice(t *testing.T) {
	s := []int{1, 2, 3, 4}

	expArr := []int{1, 2, 3}
	exp := 4

	res, resArr := Pop(s)
	for idx, val := range resArr {
		if expArr[idx] != val {
			t.Fatalf("Expected %+v, got %+v", exp, res)
		}
	}

	if exp != res {
		t.Fatalf("Popped integer not as expected")
	}
}

// Pop return an integer from an array + array without last index
func Pop(a []int) (int, []int) {
	x, b := a[len(a)-1], a[:len(a)-1]
	return x, b
}
```

## Unshift

```go
// slices_test.go

// Unshift append as first element and return new slice
func Unshift(a []int, b int) []int {
	return append([]int{b}, a...)
}
```

## Shift

```go
// slices_test.go

// Shift remove from front and return int and new slice
func Shift(a []int) (int, []int) {

}
```
