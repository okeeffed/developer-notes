---
menu: Design Patterns
name: Decorator Pattern
---

# Decorator Pattern

The decorator pattern works by creating a decorator class that accepts the base class as an argument to the constructor and then implementing a function that calls to super.

```javascript
interface Pizza {
  cost(): Number;
}

class BasePizza implements Pizza {
  cost(): Number {
    return 10;
  }
}

abstract class PizzaExtraDecorator implements Pizza {
  private _pizza: Pizza;

  constructor(pizza: BasePizza) {
    this._pizza = pizza;
  }

  cost(): Number {
    return this._pizza.cost();
  }
}

class ExtraPineappleDecorator extends PizzaExtraDecorator {
  private _price: Number = 2;

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf();
  }
}

class ExtraCheeseDecorator extends PizzaExtraDecorator {
  private _price: Number = 2.5;

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf();
  }
}

(function main() {
  const pizza = new BasePizza();
  const withPineapple = new ExtraPineappleDecorator(pizza);
  const withExtraCheese = new ExtraCheeseDecorator(withPineapple);
  console.log(`Total: $${withExtraCheese.cost()}`);
})();
```
