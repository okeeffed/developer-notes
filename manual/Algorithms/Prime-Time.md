---
menu: Algorithms
name: Prime Time
---

# Prime Time

## Question

Have the function `PrimeTime(num)` take the `num` parameter being passed and return the string true if the parameter is a prime number, otherwise return the string false. The range will be between 1 and 2^16.

## Answers

```javascript
function PrimeTime(num) {
  // base case
  if (num === 2) return true;
  if (num === 3) return true;

  for (let i = 4; i < num; i++) {
    if (num % i === 0) return false;
  }

  // code goes here
  return true;
}
```
