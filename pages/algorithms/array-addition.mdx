# Array Addition

## Question

Have the function ArrayAdditionI(arr) take the array of numbers stored in arr and return the string true if any combination of numbers in the array (excluding the largest number) can be added up to equal the largest number in the array, otherwise return the string false. For example: if arr contains `[4, 6, 23, 10, 1, 3]` the output should return true because `4 + 6 + 10 + 3 = 23`. The array will not be empty, will not contain all the same elements, and may contain negative numbers.

Use the Parameter Testing feature in the box below to test your code with different arguments.

## Answer

```javascript
function ArrayAddition(arr) {
  let maxValue = 0;
  for (let el of arr) {
    if (el > maxValue) {
      maxValue = el;
    }
  }

  const [maxElement] = arr.splice(arr.indexOf(maxValue), 1);
  const combos = [];
  // use a binary string representation to set the permutations
  for (let i = 0, max = Math.pow(2, arr.length); i < max; i++) {
    let binaryRepresentation = i.toString(2);
    // pad the number
    while (binaryRepresentation.length < arr.length) {
      binaryRepresentation = '0' + binaryRepresentation;
    }
    combos.push(binaryRepresentation);
  }

  for (let permutation of combos) {
    let sum = 0;
    for (let i = 0; i < permutation.length; i++) {
      if (permutation[i] === '1') {
        sum += arr[i];
      }
    }

    if (sum === maxElement) {
      return true;
    }
  }

  // code goes here
  return false;
}
```
