# Array Addition

## Question

Have the function ArrayAdditionI(arr) take the array of numbers stored in arr and return the string true if any combination of numbers in the array (excluding the largest number) can be added up to equal the largest number in the array, otherwise return the string false. For example: if arr contains `[4, 6, 23, 10, 1, 3]` the output should return true because `4 + 6 + 10 + 3 = 23`. The array will not be empty, will not contain all the same elements, and may contain negative numbers.

Use the Parameter Testing feature in the box below to test your code with different arguments.

## Answer

```javascript
function ArrayAdditionI(arr) {
  let max = 0;
  let maxIndex = 0;

  // simple iteration to illustrate finding the max value + index
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }

  // destructure the max value and remove that value from arr
  const [maxValue] = arr.splice(maxIndex, 1);
  let combos = [];
  let size = arr.length;

  // create an array of possible combinations using 1s and 0s
  for (let i = 0, max = Math.pow(2, size); i < max; i++) {
    // convert number to binary
    let num = i.toString(2);
    // pad the rest of the string with 0s if less than arr.length
    while (num.length < size) {
      num = '0' + num;
    }
    // finally, push the permutation
    combos.push(num);
  }

  // iterate over all permutations
  for (let i = 0; i < combos.length; i++) {
    let sum = 0;
    for (let j = 0; j < combos[i].length; j++) {
      // if '1', add to sum for current permutation
      if (combos[i][j] === '1') {
        sum += arr[j];
      }
    }

    // finally - what we want to do, see if any combination
    // has summed to the max value of that array
    if (sum === maxValue) {
      return true;
    }
  }

  // if none have done so, return false
  return false;
}
```
