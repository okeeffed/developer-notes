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

- A `Product` which represents the complex object under construction. In this case, the product is the `Pizza` class which denotes our pizza instances.
- `Concrete Builders` where each builder is responsible to instantiate different representations of the product. In this case, the concrete builders will be our classes that construct different types of pizza denoted as `NConcreteBuilder` where the `N` represents the name of the kind of pizza.
- A`Builder` that specifies the abstract interface for creating the `Product` parts. In this case, it will be our abstract class `PizzaBuilder`.
- A `Director` that constructs the object using the `Builder` interface. In this case, we will have the `ChefDirector` class fulfil this role.

### Builder Design Pattern In Action

First, let's build our Pizza product:

```javascript
class Pizza {
    private _base: string;
    private _topping: string;
    private _sauce: string;

    constructor() {
        this._base = '';
        this._topping = '';
        this._sauce = '';
    }

    set base(baseValue: string) {
        this._base = baseValue;
    }

    set topping(toppingValue: string) {
        this._topping = toppingValue;
    }

    set sauce(sauceValue: string) {
        this._sauce = sauceValue;
    }

    printValues(): void {
        console.log(`Base: ${this._base}, Topping: ${this._topping}, Sauce: ${this._sauce}.`);
    }
}

//

interface IPizza {
    dough: string;
    sauce: string;
    top: string;
}

abstract class PizzaBuilder {
    protected _pizza: IPizza;

    buildDough(): void;
    buildSauce(): void;
    buildTop(): void;

    constructor(pizzaBuilder: IPizza) {
        this._pizza = pizzaBuilder;
    }

    get pizza() {
        return this._pizza;
    }

    set pizza(newPizza: IPizza) {
        this._pizza = newPizza;
    }
}
```
