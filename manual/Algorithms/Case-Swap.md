---
menu: Algorithms
name: Case Swap
---

# Case Swap

## Resources

1. [CoderByte - Kotlin](https://www.coderbyte.com/editor/Swap%20Case:Kotlin)

## Question

Have the function `SwapCase(str)` take the str parameter and swap the case of each character. For example: if str is "Hello World" the output should be `hELLO wORLD`. Let numbers and symbols stay the way they are.

## Examples

```shell
Input: "Hello-LOL"
Output: hELLO-lol
```

```shell
Input: "Sup DUDE!!?"
Output: sUP dude!!?
```

## Answer

In JavaScript:

```javascript
function SwapCase(str) {
  let retStr = '';
  for (let i = 0; i < str.length; i++) {
    if (/[a-z]/.test(str[i])) {
      retStr += str[i].toUpperCase();
    } else if (/[A-Z]/.test(str[i])) {
      retStr += str[i].toLowerCase();
    } else {
      retStr += str[i];
    }
  }
  // code goes here
  return retStr;
}
```

In Kotlin:

```kotlin
fun SwapCase(str: String): String {
  val regexLower = Regex(pattern = "[a-z]")
  val regexUpper = Regex(pattern = "[A-Z]")
  val list = mutableListOf<String>()

  for (i in str.indices) {
    if (regexLower.containsMatchIn(str[i].toString())) {
      list.add(str[i].toString().toUpperCase())
    } else if (regexUpper.containsMatchIn(str[i].toString())) {
      list.add(str[i].toString().toLowerCase())
    } else {
      list.add(str[i].toString())
    }
  }
  // code goes here
  return list.joinToString("").trim();
}

fun main(args: Array<String>) {
  println(SwapCase(readLine()))
}
```
