---
menu: Algorithms
name: Simple Symbols
---

# Simple Symbols

Every letter in a string must be surrounded by `+` symbols.

## Answer

```javascript
function SimpleSymbols(str) {
  // base case
  if (/[a-zA-Z]/gi.test(str[0]) || /[a-zA-Z]/gi.test(str[str.length - 1])) {
    return false;
  }

  for (let i = 1; i < str.length - 1; i++) {
    if (
      /[a-zA-Z]/gi.test(str[i]) &&
      (str[i - 1] !== '+' || str[i + 1] !== '+')
    ) {
      return false;
    }
  }
  return true;
}
```
