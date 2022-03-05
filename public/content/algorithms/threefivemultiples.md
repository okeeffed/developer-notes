---
menu: Algorithms
name: Three Five Multiples
---

# Three Five Multiples

## Answer

```javascript
function ThreeFiveMultiples(num) {
  if (num <= 3) {
    return 0;
  }

  let multiples = [];
  for (i = 3; i < num; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      multiples.push(i);
    }
  }

  return multiples.reduce((a, b) => a + b, 0);
}
```
