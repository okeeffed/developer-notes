---
menu: Algorithms
name: First Reverse
---

# First Reverse

## Question

Have the function FirstReverse(str) take the str parameter being passed and return the string in reversed order. For example: if the input string is "Hello World and Coders" then your program should return the string sredoC dna dlroW olleH.
Examples

## Examples

```shell
Input: "coderbyte"
Output: etybredoc
```

```shell
Input: "I Love Code"
Output: edoC evoL I
```

## Answer

```javascript
function FirstReverse(str) {
  // code goes here
  return str
    .split('')
    .reverse()
    .join('');
}
```
