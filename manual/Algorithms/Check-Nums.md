---
menu: Algorithms
name: Check Nums
---

# Check Nums

## Question

If number 2 is bigger than number 1, return true.
If number 2 is smaller than number 1, return false.
If equal, return - 1.

## Answer

```javascript
function CheckNums(num1, num2) {
  return num2 > num1 ? true : num1 === num2 ? -1 : false;
}
```
