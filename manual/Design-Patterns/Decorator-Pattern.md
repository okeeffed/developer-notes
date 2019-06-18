---
menu: Design Patterns
name: Decorator Pattern
---

# Decorator Pattern

The decorator pattern works by creating a decorator class that accepts the base class as an argument to the constructor and then implementing a function that calls to super.

Intent:

1. Attach additional responsibilities to an object dynamically. Gives an alternative to subclassing.
2. Client-specified embellishment of a core object by recursively wrapping it.
3. Wrapping a gift, putting it in a box, and wrapping the box.

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

Other alternatives could include creating a christmas tree with actual decorations as a decorator.
