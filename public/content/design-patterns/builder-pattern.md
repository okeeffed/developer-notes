---
menu: Design Patterns
name: Builder Pattern
---

# Builder Pattern

The `Builder Pattern` enables us to create different instance representations using the same construction code.

In this scenario, we will use the classic trope of building a pizza to illustate how to implement this pattern.

The pattern works by using the following:

- A `Product` which represents the complex object under construction. In this case, the product is the `Pizza` class which denotes our pizza instances. We wil name this our `PizzaProduct`.
- A `Builder` that specifies the abstract class for creating the `Product` parts (in our case the `Pizza`). In this case, it will be our abstract class `PizzaBuilder`.
- `Concrete Builders` where each builder is responsible to instantiate different representations of the product. In this case, the concrete builders will be our classes that construct different types of pizza denoted as `NConcreteBuilder` where the `N` represents the name of the kind of pizza. All we will do in this example is create a Hawaiin pizza and a Meat Lovers pizza, so the concrete builders will be called `HawaiinConcreteBuilder` and `MeatLoversConcreteBuilder` in this example.
- A `Director` that constructs the object using the `Builder` interface. In this case, we will have the `ChefDirector` class fulfil this role. The `ChefDirector` will create a chef that is used to create the different types of pizza.

## Builder Design Pattern In Action

First, let's build our `PizzaProduct`. To do so, we will create an interface to ensure our product will include all the pizza essentials and then implement that to a `PizzaProduct`.

The `PizzaProduct` itself will create the pizza instances, but will ultimately be abstracted away and flexibly built thanks to our `Director` and `Concrete Builders`.

```javascript
// each pizza requires a base, sauce and topping property
// also ensure a taste method is implemented
interface Pizza {
    base: string;
    sauce: string;
    topping: string;
    taste(): void;
}

class PizzaProduct implements Pizza {
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

    taste(): void {
        console.log(`Base: ${this._base}, Topping: ${this._topping}, Sauce: ${this._sauce}.`);
    }
}
```

## Writing Our Abstract Builder

Next, we need to define our `PizzaBuilder`. This builder will be an abstract class that defines the required methods and set the base for our concrete builders to extend from.

Note: an abstract class cannot have an instance created. This is incredibly important. The instances created in the program will be done by our concrete builders later.

```javascript
abstract class PizzaBuilder {
    // this relation to the PizzaProduct is what abstracts the PizzaProduct
    // from the code run from the program
    protected _pizza: PizzaProduct;

    // we set these functions to abstract because we want
    // the concrete builders that extend the PizzaBuilder
    // to implement these functions
    abstract buildBase(): void;
    abstract buildSauce(): void;
    abstract buildTopping(): void;

    constructor() {
        // added for the sake of simplicty instead of a makePizza function
        // we will just instantiate an "empty" pizza when a builder
        // instance is initialised
        this._pizza = new PizzaProduct();
    }

    get pizza() {
        return this._pizza;
    }
}
```

## Writing Our Concrete Builders

Now that the abstract builder has been created, we now create the `concrete builders`. Remember, the role of each `concrete builder` is the build out different versions of our `PizzaProduct`.

Note: since we are extended from the abstract class, we do not need to override the constructor method. The base constructor method provided in the super class `PizzaBuilder` will handle our instantiation of the private `_pizza` property as well as the getter, so the code for these concrete builders should be straight forward implementations of the `abstract classes` required.

```javascript
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
```

## Writing Our Director

Finally, we can build our Chef Director. The role of the director is to take any builder that conforms to our abstract builder class `PizzaBuilder` and make the pizzas and taste the pizzas.

```javascript
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

## Putting It All Together

Now that all our required code has been written, we can happily write a quite script to test that an instance of our `ChefDirector` can make both a "Hawaiin" and "Meat Lovers" pizza!

```javascript
// the director will be used to create and taste pizzas
const chefDirector = new ChefDirector();

// the concrete builders will now be used to define
// what type of pizza the chef will make and taste
const hawaiinBuilder = new HawaiinConcreteBuilder();
const meatLoversBuilder = new MeatLoversConcreteBuilder();

// First, let's test our Hawaiin Pizza
chefDirector.makePizza(hawaiinBuilder);
chefDirector.tastePizza();

// Secondly, let's test our Meat Lovers
chefDirector.makePizza(meatLoversBuilder);
chefDirector.tastePizza();
```

If we now check our console, we can see our results:

```md
Base: thick crust, Topping: ham and pineapple, Sauce: tomato.
Base: thin crust, Topping: a lot of meat, Sauce: tomato.
```
