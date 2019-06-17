---
menu: Design Patterns
name: Abstract Factory Pattern
---

# Abstract Factory

Here we will cover the `creational` design pattern `Abstract Factory`.

Another creational pattern, the `Factory` design pattern, differs from Abstract Factory in that the factory method is a single method, whereas an abstract factory is an object.

> ... the Factory Method pattern uses inheritance and relies on a subclass to handle the desired object instantiation.

This quote assumes the object is calling its own factory method, therefore the only thing that could change the return value would be a subclass.

> ... with the Abstract Factory pattern, a class delegates the responsibility of object instantiation to another object via composition ...

Here there is an object A who wants to make a Foo object. Instead of making the Foo object itself (like in the factory method), it's going to get a different object (the abstract factory) to create the Foo object.

```javascript
interface Pizza {
    base: string;
    sauce: string;
    topping: string;
    taste(): void;
}

class AbstractPizzaProduct implements Pizza {
    private _base: string;
    private _topping: string;
    private _sauce: string;

    constructor() {
        // initialise all values to empty strings
        // our direct will use the concrete builders
        // to set all these values durin
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

    get base() {
        return this._base;
    }

    get topping() {
        return this._topping;
    }

    get sauce() {
        return this._sauce;
    }

    taste(): void {
        console.log(`Base: ${this._base}, Topping: ${this._topping}, Sauce: ${this._sauce}.`);
    }
}

class HawaiinProduct extends AbstractPizzaProduct {
    constructor() {
        super();
        this.base = 'thick crust';
        this.sauce = 'tomato';
        this.topping = 'ham and pineapple';
    }

    // Print specific detail
    taste(): void {
        console.log(`Hawaiin Pizza => Base: ${this.base}, Topping: ${this.topping}, Sauce: ${this.sauce}.`);
    }
}

class MeatLoversProduct extends AbstractPizzaProduct {
    constructor() {
        super();
        this.base = 'thin crust';
        this.sauce = 'tomato';
        this.topping = 'a lot of meat';
    }

    // Print specific detail
    taste(): void {
        console.log(`Meat Lovers Pizza => Base: ${this.base}, Topping: ${this.topping}, Sauce: ${this.sauce}.`);
    }
}

interface PizzaAbstractFactory {
    // we set these functions to abstract because we want
    // the concrete builders that extend the PizzaAbstractFactory
    // to implement these functions
    createPizza(): AbstractPizzaProduct;
}

class HawaiinConcreteFactory extends PizzaAbstractFactory {
    createPizza(): HawaiinProduct {
        return new HawaiinProduct();
    }
}

class MeatLoversConcreteFactory extends PizzaAbstractFactory {
    createPizza(): MeatLoversProduct {
        return new MeatLoversProduct();
    }
}


// create Hawaiin pizza factory
let hawaainAbstractFactory = new HawaiinConcreteFactory();
let hawaiinAbstractProduct = hawaainAbstractFactory.createPizza();
hawaiinAbstractProduct.taste();

// create MeatLovers pizza factory
let meatLoversAbstractFactory = new MeatLoversConcreteFactory();
let meatLoversAbstractProduct = meatLoversAbstractFactory.createPizza();
meatLoversAbstractProduct.taste();
```

## References

- [Difference between factory and abstract factory](https://stackoverflow.com/questions/5739611/what-are-the-differences-between-abstract-factory-and-factory-design-patterns)
- [ASP.NET Abstract Factory vs Factory](https://www.codeproject.com/Articles/716413/Factory-Method-Pattern-vs-Abstract-Factory-Pattern)
