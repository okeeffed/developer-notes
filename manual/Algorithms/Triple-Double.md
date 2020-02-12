---
menu: Algorithms
name: Triple Double
---

# Triple Double

```javascript
function TripleDouble(num1, num2) {
  let checks = '';
  const matchTriples = num1.toString().match(/([0-9])\1\1/gi);
  if (!matchTriples) {
    return 0;
  }

  for (let match of matchTriples) {
    checks += match[0];
  }

  const matchDoubles = num2.toString().match(/([0-9])\1/gi);
  if (!matchDoubles) {
    return 0;
  }

  for (match of matchDoubles) {
    if (checks.includes(match[0])) return 1;
  }

  // if cases don't match
  return 0;
}
```
