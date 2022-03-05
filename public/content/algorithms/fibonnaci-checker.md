---
menu: Algorithms
name: Fibonacci Checker
---

# Fibonacci Checker

## Answer

```javascript
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

function FibonacciChecker(num) {
  // code goes here
  count = 1;
  fibN = 0;
  while (fibN <= num) {
    fibN = fib(count);
    if (fibN === num) return true;
    count++;
  }

  return false;
}
```
