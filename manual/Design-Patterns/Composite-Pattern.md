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

## Resources

- [Composite Wikipedia](https://en.wikipedia.org/wiki/Composite_pattern)
