---
menu: Design Patterns
name: GOF Design Patterns
---

# Design Patterns - Gang Of Four

If you've written any Object-Orieted Programming (OOP), chances are you have stumbled upon the term "design patterns" or heard of the "gang of four".

Design patterns provide solutions to common OOP problems. The patterns themselves are generalised solutions that can be applied (when appropriate) to real-world scenarios.

The term "Gang Of Four" (GOF) refers to Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides. These four co-authored the software classic, "Design Patterns: Elements of Reusable Object-Oriented Software", a book that describes twenty-three design patterns and their application to software (most notably OOP).

The patterns within the book are separated into `purpose` (creational, structural, behavioural) and `scope` (class, object).

## Class vs Object Scope

The base definition for scope:

> Object patterns deal with object relationships, which can be changed at run-time and are more dynamic. Class scope is defined at design time and is built in the structure and relationship of classes where as object scope is defined at runtime and is based on the relationship of objects.

Within all three GOF design pattern `purposes`, you will see that the scope will help with understanding the objectives of the individual patterns.

## Creational Patterns

> Creational design patterns abstract the instantiation process. They help make a system independent of how its object are created, composed and represented. A class creational pattern will delegate instantiation to another object.

These patterns particularly help when systems become more complex. The patterns adhere to the principle of prefering composition over inheritance.

There are two recurring themes with these patterns:

1. They encapsulate all knowledge about which concrete classes the system uses.
2. They hide how instances of these classes are created and put together.

## Structural Patterns

> Structural design patterns ease the design by identifying a simple way to realise relationships among entities.

As you'll see fleshed out in future posts, structural patterns help decouple, shape and add functionality between entities to enable more malleable relationships.

## Behavioural Patterns

> Behavioural design patterns identify common communication patterns among objects and realise these patterns. By doing so, these patterns increase flexibility in carrying out the communication.

As stated, behavioural design patterns are all about flexible communication.

## Design Pattern Breakdown

The table below breaks down the list of GOF design patterns using purpose and scope. This table can be a reference and overview for all the design patterns that will be covered in the coming posts on design patterns.

| Purpose     | Class                        | Object                                                                                            |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Creational  | Factory Method               | Abstract Factory, Builder, Prototype, Singleton                                                   |
| Structural  | Adapter (class)              | Adapter (object), Bridge, Composite, Decorator, Facade, Flyweight, Proxy                          |
| Behavioural | Interpreter, Template Method | Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Visitor |

## Resources

- [Good old Wikipedia](https://en.wikipedia.org/wiki/Software_design_pattern#Classification_and_list)
