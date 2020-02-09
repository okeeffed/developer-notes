---
menu: Algorithms
name: Convert Time
---

# Time Convert

## Question

Take a number and convert it to `h:m` format ie 8 => `0:8`, 120 => `2:0`.

## Answer

```javascript
function TimeConvert(num) {
  const hour = (num - (num % 60)) / 60;
  const minute = num - hour * 60;
  return `${hour}:${minute}`;
}
```
