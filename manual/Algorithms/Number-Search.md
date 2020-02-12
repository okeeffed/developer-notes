# Number Search

## Answer

```javascript
function NumberSearch(str) {
  let alpha = str.replace(/[^a-zA-Z]/gi, '').length;
  // safe base case
  if (alpha.length === 0) {
    return 0;
  }

  let num = str.replace(/[^0-9]/gi, '').split('');
  // ensure numbers exist
  num = num.length ? num.reduce((a, b) => parseInt(a) + parseInt(b)) : 0;
  return Math.round(num / alpha);
}
```
