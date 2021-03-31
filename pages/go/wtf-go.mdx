---
menu: Go
name: Wtf Go
---

# WTF Go

## Resources

1. [Gotchas and common mistakes in Go](http://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/)
2. [Common Mistakes - Golang GitHub](https://github.com/golang/go/wiki/CommonMistakes)

## Can't Use "nil" to Initialize a Variable Without an Explicit Type

Fails:

```golang
package main

func main() {
    var x = nil //error

    _ = x
}
```

> /tmp/sandbox188239583/main.go:4: use of untyped nil

Works:

```golang
package main

func main() {
    var x interface{} = nil

    _ = x
}
```

## Using "nil" Slices and Maps

It's OK to add items to a "nil" slice, but doing the same with a map will produce a runtime panic.

Fails:

```golang
package main

func main() {
    var m map[string]int
    m["one"] = 1 //error
}
```

Works:

```golang
package main

func main() {
    var s []int
    s = append(s,1)
}
```

## Map Capacity

You can specify map capacity when created, but you can't use the `cap()` function on maps.

```golang
package main

import (
   "fmt"
)

func main() {
   a := make([]int, 99)
   fmt.Println(cap(a)) // 99

   b := make(map[string]int, 99)
   fmt.Println(len(b)) // 0
   fmt.Println(cap(b)) // error: ./prog.go:12:17: invalid argument b (type map[string]int) for cap
}
```

## String can't be nil

Fails:

```golang
package main

func main() {
    var x string = nil //error

    if x == nil { //error
        x = "default"
    }
}
```

> /tmp/sandbox630560459/main.go:4: cannot use nil as type string in assignment
> /tmp/sandbox630560459/main.go:6: invalid operation: x == nil (mismatched types string and nil)

Works:

```golang
package main

func main() {
    var x string //defaults to "" (zero value)

    if x == "" {
        x = "default"
    }
}
```

## Array Func Args

If you are a C or C++ developer arrays for you are pointers. When you pass arrays to functions the functions reference the same memory location, so they can update the original data. Arrays in Go are values, so when you pass arrays to functions the functions get a copy of the original array data. This can be a problem if you are trying to update the array data.

Fails:

```golang
package main

import "fmt"

func main() {
    x := [3]int{1,2,3}

    func(arr [3]int) {
        arr[0] = 7
        fmt.Println(arr) //prints [7 2 3]
    }(x)

    fmt.Println(x) //prints [1 2 3] (not ok if you need [7 2 3])
}
```

Works:

```golang
package main

import "fmt"

func main() {
    x := [3]int{1,2,3}

    func(arr *[3]int) {
        (*arr)[0] = 7
        fmt.Println(arr) //prints &[7 2 3]
    }(&x)

    fmt.Println(x) //prints [7 2 3]
}
```

Another option is to use slices. Even though your function gets a copy of the slice variable it still references the original data.

```golang
package main

import "fmt"

func main() {
    x := []int{1,2,3}

    func(arr []int) {
        arr[0] = 7
        fmt.Println(arr) //prints [7 2 3]
    }(x)

    fmt.Println(x) //prints [7 2 3]
}
```

## Unexpected Values in Slice and Array "range" Clauses

[Continue](http://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/)

## Strings Are Immutable

Fails:

```golang
package main

import "fmt"

func main() {
    x := "text"
    x[0] = 'T'

    fmt.Println(x)
}
```

> /tmp/sandbox305565531/main.go:7: cannot assign to x[0]

```golang
package main

import "fmt"

func main() {
    x := "text"
    xbytes := []byte(x)
    xbytes[0] = 'T'

    fmt.Println(string(xbytes)) //prints Text
}
```
