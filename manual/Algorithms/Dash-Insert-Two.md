---
menu: Algorithms
name: Dash Insert II
---

# Dash Insert II

## Answer

### Short Answer

```javascript
function DashInsertII(num) {
  const resString = num.toString(10);
  return resString
    .replace(/([2468])(?=[2468])/g, '$1*')
    .replace(/([13579])(?=[13579])/g, '$1-');
}
```

### Long Answer

```javascript
function DashInsertII(num) {
  // convert to string
  const str = num.toString();
  if (str.length < 2) {
    return str;
  }

  let dashString = '';
  // iterate through and compare prev to next
  for (let i = 1; i < str.length; i++) {
    // check odd, then check even
    if (str[i - 1] === '0' || str[i] === '0') {
      dashString += str[i - 1];
    } else if (str[i - 1] % 2 === 1 && str[i] % 2 === 1) {
      dashString += `${str[i - 1]}-`;
    } else if (str[i - 1] % 2 === 0 && str[i] % 2 === 0) {
      dashString += `${str[i - 1]}*`;
    } else {
      dashString += str[i - 1];
    }
  }

  // add final el
  dashString += str[str.length - 1];

  // return str
  return dashString;
}
```
