---
menu: Algorithms
name: Binary Converter
---

# Binary Converter

## Solution

```javascript
function BinaryConverter(str) {
  let res = 0;
  for (let i = str.length; i > 0; i--) {
    if (str[str.length - i] === '1') {
      res += Math.pow(2, i - 1);
    }
  }

  // code goes here
  return res;
}
```
