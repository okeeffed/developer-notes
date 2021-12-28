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

Here we will create a 1000 combatants that

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
    let combatant = CombatantAcademy.groups[set];

    if (!combatant) {
      combatant = new Combatant(set, num);
      CombatantAcademy.groups[set] = combatant;
    } else {
      combatant.number = num;
      console.log(`shared Combatant ${combatant.number}`);
    }

    return combatant;
  }
}

(function main() {
  let start, end;

  // the larger you change the threshold, the bigger the difference
  const threshold = 50000;

  // inefficient creating without flyweight
  start = Math.floor(Date.now());
  for (let i = 0; i < threshold; i++) {
    new Combatant('normal-set', i); // creating fifty thousand real Combatants
  }
  end = Math.floor(Date.now());
  const withoutFlyweight = end - start;

  // efficient create with flyweight
  start = Math.floor(Date.now());
  for (let i = 0; i < threshold; i++) {
    CombatantAcademy.getCombatant('normal-set', i); // create 1 Combatant
  }
  end = Math.floor(Date.now());
  const withFlyweight = end - start;

  console.log('Without Flyweight', withoutFlyweight);
  console.log('With Flyweight', withFlyweight);
})();
```

## Resources

- [Flyweight Example](https://circle.visual-paradigm.com/flyweight/)
- [Flyweight Wikipedia](https://en.wikipedia.org/wiki/Flyweight_pattern)
