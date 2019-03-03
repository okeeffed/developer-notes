---
name: Count Vowels
menu: Data Structures
---

# Count Vowels

Given a string arg, count the vowels and return the number.

## Go

```go
package countvowels

import "regexp"

// CountVowels should have a comment documenting it.
func CountVowels(arg string) int {
	return len(regexp.MustCompile(`[^aeiouAEIOU]`).ReplaceAllString(arg, ""))
}
```

## Java

```java
class CountVowels {
    Integer run(String inputString) {
        return inputString.replaceAll("[^aeiouAEIOU]", "").length();
    }
}
```
