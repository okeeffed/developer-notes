---
menu: Functional Programming
name: An Example of Higher-Order Functions for Entities
---

# An Example of Higher-Order Functions for Entities

```ts
interface Person {
  name: string;
}

const upperCaseString = (str: string) => str.toUpperCase();
const addSpaceBetweenLetters = (str: string) => str.split('').join(' ');

const compose = (...fns: Function[]) => <T>(arg: T) =>
  fns.reduceRight((prevValue, fn) => fn(prevValue), arg);

const upperCaseAndAddSpaceBetweenLetters = compose(
  upperCaseString,
  addSpaceBetweenLetters,
);

console.log(upperCaseAndAddSpaceBetweenLetters('Dennis'));

const higherOrderEntityHelper = (fn: Function) => <T>(
  entity: T,
  key: keyof T,
) => {
  return {
    ...entity,
    [key]: fn(entity[key]),
  };
};

const upperCaseAndAddSpaceBetweenLettersForEntity = higherOrderEntityHelper(
  upperCaseAndAddSpaceBetweenLetters,
);

const bob: Person = {
  name: 'bob',
};

const updatedBob = upperCaseAndAddSpaceBetweenLettersForEntity<Person>(
  bob,
  'name',
);

console.log(updatedBob);
/**
 * {
 *  name: "B O B "
 * }
 */
```
