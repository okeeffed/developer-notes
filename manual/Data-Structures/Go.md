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
