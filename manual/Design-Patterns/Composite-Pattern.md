---
menu: Design Patterns
name: Composite Pattern
---

# Composite Pattern

The `Composite Pattern` is a Gang Of Four structural Design Pattern that helps solve the following problems:

1. A part-whole hierarchy should be represented so that clients can treat part and whole objects uniformly.
2. A part-whole hierarcy should be represented as tree structure.

The Composite pattern will describe the following:

- A unified `Component` interface for both part (Leaf) objects and whole (Composite) objects.
- Individual `Leaf` objects implement the `Component` interface directly, and `Composite` objects forward requests to their child components.

Clients can then work through the `Component` interface to treat `Leaf` and `Composite` objects uniformly.

`Leaf` objects perform a request directly, and `Composite` objects forward the request to their child components recursively downwards the tree structure. This makes client classes easier to implement, change, test, and reuse.

## Example

```typescript
interface ArmyObject {
  name: String;
  operate(): void;
}

class Team implements ArmyObject {
  name: String;
  private _soldiers: ArmyObject[];

  constructor(name: String) {
    this.name = name;
    this._soldiers = [];
  }

  operate(): void {
    console.log(`Team: ${this.name} operates`);
    this._soldiers.map((soldier: ArmyObject) => {
      soldier.operate();
    });
  }

  addSoldier(newSoldier: ArmyObject) {
    const soldiers = this._soldiers.filter((soldier: ArmyObject, index) => {
      return soldier.name === newSoldier.name;
    });
    if (soldiers.length < 1) {
      console.log(`Soldier: ${newSoldier.name} comes in ${this.name}`);
      this._soldiers.push(newSoldier);
    } else {
      console.log('The soldier is already in the team');
    }
  }

  soldierGone(deadSoldier: ArmyObject) {
    const deads = this._soldiers.map((soldier: ArmyObject, index) => {
      if (soldier.name === deadSoldier.name) {
        return index;
      }
    });
    if (deads.length > 0) {
      console.log(`Soldier: ${deadSoldier.name} died in the fight`);
      this._soldiers.slice(deads[0], 1);
    } else {
      console.log('No one dies');
    }
  }
}

class Soldier implements ArmyObject {
  name: String;

  constructor(name: String) {
    this.name = name;
  }

  operate() {
    console.log(`Soldier: ${this.name} soldier operates`);
  }
}

(function main() {
  const team = new Team('Seal Team 6');
  const specialSquad = new Team('Seal Team 6 - Special Squad');

  const soldierJoe = new Soldier('Joe');
  const soldierJames = new Soldier('James');
  const soldierRoy = new Soldier('Roy');
  team.addSoldier(soldierJoe);
  team.addSoldier(soldierJames);
  team.addSoldier(soldierRoy);

  const specialForceTommy = new Soldier('Tommy');

  specialSquad.addSoldier(specialForceTommy);

  team.operate();
  specialSquad.operate();

  team.soldierGone(soldierJames);
})();
```

## Java Graphic Example

```java
import java.util.ArrayList;

/** "Component" */
interface Graphic {
    //Prints the graphic.
    public void print();
}

/** "Composite" */
class CompositeGraphic implements Graphic {
    //Collection of child graphics.
    private final ArrayList<Graphic> childGraphics = new ArrayList<>();

    //Adds the graphic to the composition.
    public void add(Graphic graphic) {
        childGraphics.add(graphic);
    }

    //Prints the graphic.
    @Override
    public void print() {
        for (Graphic graphic : childGraphics) {
            graphic.print();  //Delegation
        }
    }
}

/** "Leaf" */
class Ellipse implements Graphic {
    //Prints the graphic.
    @Override
    public void print() {
        System.out.println("Ellipse");
    }
}

/** Client */
public class CompositeDemo {
    public static void main(String[] args) {
        //Initialize four ellipses
        Ellipse ellipse1 = new Ellipse();
        Ellipse ellipse2 = new Ellipse();
        Ellipse ellipse3 = new Ellipse();
        Ellipse ellipse4 = new Ellipse();

        //Creates two composites containing the ellipses
        CompositeGraphic graphic2 = new CompositeGraphic();
        graphic2.add(ellipse1);
        graphic2.add(ellipse2);
        graphic2.add(ellipse3);

        CompositeGraphic graphic3 = new CompositeGraphic();
        graphic3.add(ellipse4);

        //Create another graphics that contains two graphics
        CompositeGraphic graphic1 = new CompositeGraphic();
        graphic1.add(graphic2);
        graphic1.add(graphic3);

        //Prints the complete graphic (Four times the string "Ellipse").
        graphic1.print();
    }
}
```

## Resources

- [Composite Wikipedia](https://en.wikipedia.org/wiki/Composite_pattern)
