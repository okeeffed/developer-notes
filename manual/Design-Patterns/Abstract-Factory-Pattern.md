---
menu: Design Patterns
name: Abstract Factory Pattern
---

# Abstract Factory

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

abstract class PizzaAbstractFactory {
    // we set these functions to abstract because we want
    // the concrete builders that extend the PizzaAbstractFactory
    // to implement these functions
    abstract createPizza(): AbstractPizzaProduct;
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
