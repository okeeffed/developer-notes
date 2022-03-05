---
menu: Algorithms
name: Simple Mode
---

# Simple Mode

## Answer

```javascript
function SimpleMode(arr) {
  let map = {};

  for (let el of arr) {
    if (map[el]) map[el]++;
    else map[el] = 1;
  }

  let max = 1;
  let maxRes = -1;
  for (let [k, v] of Object.entries(map)) {
    if (v > max) {
      maxRes = k;
      max = v;
    }
  }

  if (max === 1) return -1;

  for (let el of arr) {
    if (map[el] === max) {
      maxRes = el;
      break;
    }
  }

  // code goes here
  return maxRes;
}
```
