---
menu: Design Patterns
name: Design Patterns
---

# Design Patterns

When it comes to the base GOF Object-Orientated patterns, the design patterns breaks themselves down into three smaller `purposes` (creational, structural, behavioural) and within those purposes can be further broken down into `scope` (class, object).

## List Breakdown

| Purpose     | Class                        | Object                                                                                            |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Creational  | Factory Method               | Abstract Factory, Builder, Prototype, Singleton                                                   |
| Structural  | Adapter (class)              | Adapter (object), Bridge, Composite, Decorator, Facade, Flyweight, Proxy                          |
| Behavioural | Interpreter, Template Method | Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Visitor |

## Creational Patterns

Creational design patterns abstract the instantiation process. They help make a system independent of how its object are created, composed and represented. A class creational pattern will delegate instantiation to another object.

These patterns particularly help when systems, adhering to the principle of prefering composition over inheritance, become more complex.

There are two recurring themes with these patterns:

1. They encapsulate all knowledge about which concrete classes the system uses.
2. They hide how instances of these classes are created and put together.

(TODO: finish notes on other patterns)

## Resources

- [A good resource for all patterns](https://en.wikipedia.org/wiki/Software_design_pattern#Classification_and_list)
