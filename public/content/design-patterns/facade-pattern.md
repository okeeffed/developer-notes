---
menu: Design Patterns
name: Facade Pattern
---

# Facade Pattern

The Facade Pattern is a `structural` design pattern that is used to, according the the Gang Of Four book, "Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use."

## Example

In the example below, we will look at basic facade that takes the different operations required to start a running race of the basic phrase "Get ready! Get set! Go!" by breaking down each sentence into a phase.

## Participants

- Facade: (RunningRaceFacade)
  - knows which subsystem classes are responsible for what operation.
  - delegates parts of a client request to the appropriate subsystem objects.
- Subsystem classes: (PhaseOneSystem, PhaseTwoSystem, PhaseThreeSystem)
  - contains functionality for subsystem.
  - executes work delegated by Facade object.
  - has no knowledge of facade or reference to it.

```javascript
class PhaseOneSystem {
  getReady() {
    console.log('Get ready!');
  }
}

class PhaseTwoSystem {
  getSet() {
    console.log('Get set!');
  }
}

class PhaseThreeSystem {
  go() {
    console.log('Go!');
  }
}

class RunningRaceFacade {

  private _phaseOne: PhaseOneSystem;
  private _phaseTwo: PhaseTwoSystem;
  private _phaseThree: PhaseThreeSystem;

  constructor() {
    this._phaseOne = new PhaseOneSystem();
    this._phaseTwo = new PhaseTwoSystem();
    this._phaseThree = new PhaseThreeSystem();
  }

  beginRace() {
    this._phaseOne.getReady();
    this._phaseTwo.getSet();
    this._phaseThree.go();
  }
}

(function main() {
  const race = new RunningRaceFacade();
  race.beginRace(); // logs out "Get ready! Get Set! Go! on separate lines
})();
```
