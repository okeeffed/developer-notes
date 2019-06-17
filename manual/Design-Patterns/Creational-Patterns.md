---
menu: Design Patterns
name: Creational Patterns
---

# Creational Patterns

Creational design patterns abstract the instantiation process. They help make a system independent of how its object are created, composed and represented. A class creational pattern will delegate instantiation to another object.

These patterns particularly help when systems, adhering to the principle of prefering composition over inheritance, become more complex.

There are two recurring themes with these patterns:

1. They encapsulate all knowledge about which concrete classes the system uses.
2. They hide how instances of these classes are created and put together.

## Builder

The `Builder Pattern` enables us to create different instance representations using the same construction code.

In this scenario, we will use the class trope of building a pizza to illustate how to implement this pattern.

The pattern works by using the following:

- A `Product` which represents the complex object under construction. In this case, the product is the pizza.
- `Concrete Builders` where each builder is responsible to instantiate different representations of the product. In this case, the concrete builders will be our classes that construct different types of pizza.
- A`Builder` that specifies the abstract interface for creating the `Product` parts. In this case, it will be our pizza builder interface.
- A `Director` that constructs the object using the `Builder` interface. In this case, we will have the chef class fulfil this role.
