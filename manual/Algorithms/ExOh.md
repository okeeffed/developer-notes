---
menu: Algorithms
name: ExOh
---

# ExOh

## Answer

```javascript
function ExOh(str) {
  const xs = str.match(/x/gi);
  const os = str.match(/o/gi);

  let xCount, oCount;
  xCount = !xs ? 0 : xs.length;
  oCount = !os ? 0 : os.length;

  return xCount === oCount;
}
```
