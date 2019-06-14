---
menu: TypeScript
name: Developer's Guide
---

# Developer's Guide to TypeScript

## Types

For types, we have all our basic types and we can also have custom types.

There are two types, `primitive` and `object` - the `object` types itself can be what we define.

Why do we care? The compiler uses it to search for errors and it allows other engineers to understand what type of data is flowing around.

```javascript
interface Todo {
  id: number;
  completed: boolean;
};

const todo = obj.data as Todo;
```

## Declaring types examples

```javascript
let colors: string[] = ['a', 'b', 'c'];

class Car {}
let car: Car = new Car();

let point: { x: number, y: number } = {
  x: 10,
  y: 20
};
```
