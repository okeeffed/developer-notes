---
menu: Algorithms
name: Tree Constructor
---

# Tree Constructor

## Answer

```javascript
function TreeConstructor(strArr) {
  // convert to intArr
  const convertedDataArr = strArr.map(leafSet =>
    leafSet
      .replace(/[\(\)]/gi, '')
      .split(',')
      .map(char => parseInt(char)),
  );

  let treeMap = {};
  let children = [];
  let parents = [];
  for (let [child, parent] of convertedDataArr) {
    if (!treeMap[parent]) {
      // set empty object
      treeMap[parent] = {};
      if (child < parent) {
        treeMap[parent].min = child;
      } else if (child > parent) {
        treeMap[parent].max = child;
      } else {
        return false;
      }
    } else {
      if (child < parent && !treeMap[parent].min) {
        treeMap[parent].min = child;
      } else if (child > parent && !treeMap[parent].max) {
        treeMap[parent].max = child;
      } else {
        return false;
      }
    }

    children.push(child);
    parents.push(parent);
  }

  // handle multiple parents not connected
  let diff = 0;
  for (let parent of parents) {
    if (!children.includes(parent)) {
      diff++;
    } else {
      diff--;
    }
  }

  if (diff > 1) {
    return false;
  }

  // code goes here
  return true;
}
```
