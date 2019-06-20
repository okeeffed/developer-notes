---
menu: Design Patterns
name: Iterator
---

# Iterator

A behavioural pattern that is used to access the elements of a collection object in sequential manner without a required understanding of the underlying representation.

## Components

- ConcreteIterator: An interface to define how the `next` and `hasNext` methods work.
- ConcreteCollection: A collection that has knowledge of the iterator and creates the iterator.

## Example

In this basic example below, we will create a `ConcreteCollection` and `ConcreteIterator` class to demonstrate how the `Iterator` design pattern works.

Note that after create a collection, we can use the `createIterator` method as many times as we want to return seperate instances of an `iterator` - for demonstration purposes, we will create a second iterator to do just that.

The last part of `"main"` will demo what happens when you intertwine iterators.

```typescript
interface Iterator<T> {
  next(): T;
  hasNext(): boolean;
}

interface Collection {
  createIterator(): Iterator<Number>;
}

class ConcreteIterator implements Iterator<Number> {
  private _collection: Number[];
  private _index: number = 0;

  constructor(newCollection: Number[]) {
    this._collection = newCollection;
  }

  next(): any {
    const result = this._collection[this._index];
    this.log();
    this._index += 1;
    return result;
  }

  hasNext(): boolean {
    return this._index < this._collection.length;
  }

  private log(): void {
    console.log(`Method called during index: ${this._collection[this._index]}`);
  }
}

class ConcreteCollection implements Collection {
  private _collection: Number[] = [];

  constructor(collection: Number[]) {
    this._collection = collection;
  }

  createIterator(): Iterator<Number> {
    return new ConcreteIterator(this._collection);
  }
}

(function main() {
  const collection: ConcreteCollection = new ConcreteCollection([0, 1, 2, 3]);
  const iterator: Iterator<Number> = collection.createIterator();
  const secondIterator: Iterator<Number> = collection.createIterator();

  while (iterator.hasNext()) {
    const number: Number = iterator.next();
    console.log(`Logging: ${number.valueOf()}`);
  }

  while (secondIterator.hasNext()) {
    const number: Number = secondIterator.next();
    console.log(`Second Iterator Logging: ${number.valueOf()}`);
  }
})();
```

## Resources

- [Wikipedia](https://en.wikipedia.org/wiki/Iterator_pattern)
- [Tutorials Point](https://www.tutorialspoint.com/design_pattern/iterator_pattern.htm)
