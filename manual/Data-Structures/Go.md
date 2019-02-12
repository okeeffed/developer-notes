---
name: Go Data Structures
menu: Data Structures
---

# Go Data Structures

## Fizzbuzz

```go
func fizzBuzz(i int) string {
  switch true {
    case i%3 == 0 && i%5 == 0:
        return "fizzbuzz"
    case i%3 == 0:
        return "fizz"
    case i%5 == 0:
        return "buzz"
    default:
        return strconv.Itoa(i)
  }
}
```

## Chunked Arrays

```go
func arrayChunk(arr []int, size int) [][]int {
	if len(arr) <= 0 {
		return nil
	}

	var tmp []int
	var chunkedArr [][]int
	for i, item := range arr {
		tmp = append(tmp, item)

		isFinal := len(arr)-1 == i
		if i%size == size-1 || isFinal {
			fmt.Printf("%v", tmp)
			chunkedArr = append(chunkedArr, tmp)
			tmp = nil
		}
	}

	return chunkedArr
}
```
