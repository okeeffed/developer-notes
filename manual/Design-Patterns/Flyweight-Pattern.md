---
menu: Design Patterns
name: Flyweight Pattern
---

# Flyweight Pattern

The Flyweight Pattern falls under the structural design patterns from the Gang Of Four.

The `flyweight` is an object that minimizes memory usage by sharing as much data as possible with similar objects - a way to use objects in large numbers when a simple representation would use an unacceptable amount of memory.

## Usage

Use when:

- many same objects are used and storage cost is high.
- you can externalise a majority of each object's state.
- few shared objects can replace many unshared ones.
- identity of an object not relevant.

## Example

Here we will create

```typescript
interface Action {
  move(location: [number, number]): void;
  hit?(target: string, location: [number, number]): void;
}

class Soldier implements Action {
  private equipmentSet: string;
  number: number;

  constructor(set: string, number: number) {
    // initialization consumes time
    this.equipmentSet = set;
    this.number = number;
    console.log(`new soldier ${number}`);
  }

  move(location: [number, number]): void {
    console.log(`move to ${location}`);
  }

  hit?(target: string, location: [number, number]): void {
    console.log(`damage ${target} at ${location}`);
  }
}

class SoldierAcademy {
  private static groups: { [set: string]: Soldier } = {};

  public static getSoldier(set: string, num: number) {
    let soldier = SoldierAcademy.groups[set];

    if (!soldier) {
      soldier = new Soldier(set, num);
      SoldierAcademy.groups[set] = soldier;
    } else {
      soldier.number = num;
      console.log(`shared soldier ${soldier.number}`);
    }

    return soldier;
  }
}

(function main() {
  const start = Math.floor(Date.now());
  for (let i = 0; i < 1000000; i++) {
    // new Soldier('normal-set', i); // create 1m real soldiers
    SoldierAcademy.getSoldier('normal-set', i); // create 1 soldier
  }
  const end = Math.floor(Date.now());
  console.log(end - start);
})();
```

## Resources

- [Flyweight Example](https://circle.visual-paradigm.com/flyweight/)
- [Flyweight Wikipedia](https://en.wikipedia.org/wiki/Flyweight_pattern)
