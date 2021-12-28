---
menu: Enterprise Architecture Patterns
name: Intro To Enterprise Architecture Patterns
---

# JS/TS Enterprise Architecture Patterns

## Why it's called Enterprise Patterns

When we talk about "enterprise patterns", they mean patterns that are needed to adopt to reduce complexity across the code bases.

It is a philosophical and fundamental shift.

It is a diligent application of first principles.

> "The biggest problem in the development and maintenance of large-scal software systems is complexity - large systems are hard to understand." - Ben Mosely, Peter Marks

The **iron triangle** of programming:

1. Handling of state.
2. Code volume.
3. Flow of control.

You need to ask yourself how to handle all of these things with the least code possible.

## Complexity and Purgatory

Think of a time where you checked in code and you were not 100% sure that it was not going to break anything.

If you've done that YOLO commit, you are slowly stepping into "purgatory". Then it begins to get worse.

If you've ever inherited a brownfield project and you have no idea what is happening, it is purgatory.

Complexity has a direct correlation to the level of purgatory that you are in.

### Shared mutable state

This is incredibly dangerous. How can you possibly test something that relies on external state?

> The example given is a shopping cart being used by multiple people sharing cart state. The ability to figure out why the shopping cart might have multiple things is hard to debug.

### Control flow

How are we communicating state and events in the context of our application from the component level (how are components are communicating with each other) to a massive, distributed level? How can you maintain consistency across those?

When you fail to manage state and control flow properly, your ability to reuse code is greatly diminished. This leads to duplication or increased code volume.

The example given to demonstrate the issue with shared mutable state:

```ts
class Inventory {
  ledger = { total: 1200 };
}

class ItemsComponent {
  ledger: any;
  constructor(private inventory: Inventory) {
    this.ledger = inventory.ledger;
  }
  // ! ISSUE: mutates shared state
  add(x) {
    this.ledger.total += x;
  }
}

class WidgetsComponent {
  ledger: any;
  constructor(private inventory: Inventory) {
    this.ledger = inventory.ledger;
  }
  // ! ISSUE: mutates shared state
  add(x) {
    this.ledger.total += x;
  }
}
```

Imagine an application now with 50 or 60 of these components. We are not hardwired as humans to be able to see this complexity at scale.

### The Axis Of Evil

Complexity is broken down into 3 parts:

1. Micro: taking input and managing output.
2. Meso: intra-component/libs interacting within the application.
3. Macro: application(s) interacting with each other.

Questions to ask:

1. Can I know the result of this code every single time?
2. Can I reuse this code? If no, you need to understand the context as to why it exists.
3. Can I test this code?

Answer no's above will lead towards what is referred to as the `The Axis of Evil`.

> "It is impossible to write good tests for bad code."

There is too much friction to writing tests. Why? More often than not, they're not writing testable code.

### Dependency Injection

The ring-leader of the axis of evil is "hidden state".

```ts
class Whatever {
  reCalculateTotal(widget: Widget) {
    // the hidden state `this.mode` is the culprit and makes the function impure
    switch(this.mode){
       case 'create':
         //  ...
         break;
       case 'update':
         // ...
        break:
        // ...
    }
  }
}
```

Hidden state violates the `single-responsibility principle`. If you say a function does this AND ... you need to stop because you are violating the principle.

To fix the above, we can simply abstract to a parameter:

```ts
class Whatever {
  reCalculateTotal(widget: Widget, mode: string) {
    // now our function can be pure
    switch(mode){
       case 'create':
         //  ...
         break;
       case 'update':
         // ...
        break:
        // ...
    }
  }
}
```

This is known as dependency injection.

Finally, the logic within the switch can be abstracted to a method/function for EACH case. That enables it to be far more testable and reusable.

After the abstraction, there was one method referred to as "air-traffic control" to handle the assignment of properties:

```ts
onCoursesUpdated(course, mode) {
  this.courses = this.updateCourses(this.courses, course, mode)
  this.totalCost = this.updateTotalCost(this.courses)
}
```

You always want to move your code towards a state of being "fine-grained".

### Separation of Concerns Q&A

- There is a threshold of separating things up too much. That threshold changes based on context. You need to find that sweet spot.
- You can spread things out so much that is doesn't make sense anymore. The example given is related to a laundry basket.
- The litmus test is about whether the choice of separation makes sense in the context of "cohesion".
- "What is the shared commonality that all interested components rely on".
