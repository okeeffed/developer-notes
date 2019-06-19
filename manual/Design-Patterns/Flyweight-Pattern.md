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

Here we will create a

```typescript
interface Action {
  move(location: [number, number]): void;
  hit?(target: string, location: [number, number]): void;
}

class Combatant implements Action {
  private equipmentSet: string;
  number: number;

  constructor(set: string, number: number) {
    // initialization consumes time
    this.equipmentSet = set;
    this.number = number;
    console.log(`new Combatant ${number}`);
  }

  move(location: [number, number]): void {
    console.log(`move to ${location}`);
  }

  hit?(target: string, location: [number, number]): void {
    console.log(`damage ${target} at ${location}`);
  }
}

class CombatantAcademy {
  private static groups: { [set: string]: Combatant } = {};

  public static getCombatant(set: string, num: number) {
    let Combatant = CombatantAcademy.groups[set];

    if (!Combatant) {
      Combatant = new Combatant(set, num);
      CombatantAcademy.groups[set] = Combatant;
    } else {
      Combatant.number = num;
      console.log(`shared Combatant ${Combatant.number}`);
    }

    return Combatant;
  }
}

(function main() {
  const start = Math.floor(Date.now());
  for (let i = 0; i < 1000000; i++) {
    // new Combatant('normal-set', i); // create 1m real Combatants
    CombatantAcademy.getCombatant('normal-set', i); // create 1 Combatant
  }
  const end = Math.floor(Date.now());
  console.log(end - start);
})();
```

## Resources

- [Flyweight Example](https://circle.visual-paradigm.com/flyweight/)
- [Flyweight Wikipedia](https://en.wikipedia.org/wiki/Flyweight_pattern)
