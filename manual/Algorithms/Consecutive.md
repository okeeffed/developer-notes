---
menu: Algorithms
name: Consecutive
---

# Consecutive

## Resources

1. [CoderByte](https://www.coderbyte.com/information/Consecutive)

## Answer

```javascript
function Consecutive(arr) {
  const sortedArr = arr.sort((a, b) => a > b);
  const min = sortedArr[0];
  const max = sortedArr[sortedArr.length - 1];

  let count = 0;
  for (let i = min + 1; i < max; i++) {
    if (!sortedArr.includes(i)) count++;
  }

  return count;
}
```
