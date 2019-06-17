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
interface Pizza {
    base: string;
    sauce: string;
    topping: string;
}

class PizzaProduct implements Pizza {
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

    taste(): void {
        console.log(`Base: ${this._base}, Topping: ${this._topping}, Sauce: ${this._sauce}.`);
    }
}

abstract class PizzaBuilder {
    protected _pizza: PizzaProduct;

    abstract buildBase(): void;
    abstract buildSauce(): void;
    abstract buildTopping(): void;

    constructor(pizza: PizzaProduct) {
        this._pizza = pizza;
    }

    get pizza() {
        return this._pizza;
    }

    set pizza(newPizza: PizzaProduct) {
        this._pizza = newPizza;
    }
}

class HawaiinConcreteBuilder extends PizzaBuilder {
    buildBase(): void {
        this._pizza.base = 'thick crust';
    }

    buildSauce(): void {
        this._pizza.sauce = 'tomato';
    }

    buildTopping(): void {
        this._pizza.topping = 'ham and pineapple';
    }
}

class MeatLoversConcreteBuilder extends PizzaBuilder {
    buildBase(): void {
        this._pizza.base = 'thin crust';
    }

    buildSauce(): void {
        this._pizza.sauce = 'tomato';
    }

    buildTopping(): void {
        this._pizza.topping = 'a lot of meat';
    }
}

class ChefDirector {
    private pizzaBuilder?: PizzaBuilder;

    makePizza(pizzaBuilder: PizzaBuilder): void {
        this.pizzaBuilder = pizzaBuilder;
        this.pizzaBuilder.buildBase();
        this.pizzaBuilder.buildSauce();
        this.pizzaBuilder.buildTopping();
    }

    tastePizza(): void {
        try {
            if (!this.pizzaBuilder) {
                throw new Error('No pizza builder property defined');
            }

            this.pizzaBuilder.pizza.taste();
        } catch(e) {
            console.error(e);
        }
    }
}
```
