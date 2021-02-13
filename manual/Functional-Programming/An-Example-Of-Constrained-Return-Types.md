---
menu: Functional Programming
name: Category Extension For Types
---

# Category Extension For Types

```ts
interface Person {
  firstName: string;
  lastName: string;
}

interface WorkPerson extends Person {
  id: number;
}

const upperCaseFirstName = (person: Person): Person => {
  const updatedPerson = {
    ...person,
    firstName: person.firstName.toUpperCase(),
  };
  return updatedPerson;
};
const addSpaceBetweenFirstName = (person: Person): Person => {
  const updatedPerson = {
    ...person,
    firstName: person.firstName.split('').join(' '),
  };
  return updatedPerson;
};

const compose = (...fns: Function[]) => <T extends Person>(arg: T) =>
  fns.reduceRight((prevValue, fn) => fn(prevValue), arg);

const upperCaseAndSplitName = compose(
  upperCaseFirstName,
  addSpaceBetweenFirstName,
);
const bob: WorkPerson = {
  id: 1,
  firstName: 'Bob',
  lastName: 'Jane',
};
const bobUpdated = upperCaseAndSplitName<WorkPerson>(bob);

console.log(bobUpdated);
```
