---
menu: Algorithms
name: First Factorial
---

# First Factorial

## Resources

1. [CoderByte](https://www.coderbyte.com/information/First%20Factorial)

## Question

Have the function FirstFactorial(num) take the num parameter being passed and return the factorial of it. For example: if num = 4, then your program should return (4 _ 3 _ 2 \* 1) = 24. For the test cases, the range will be between 1 and 18 and the input will always be an integer.

## Examples

```shell
Input: 8
Output: 40340

Input: 4
Output: 24
```

## Answer

```javascript
function FirstFactorial(num) {
  if (num < 2) {
    return 1;
  }
  // code goes here
  return num * FirstFactorial(num - 1);
}
```
