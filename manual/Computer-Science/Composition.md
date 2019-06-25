---
menu: Computer Science
name: Composition & Aggregation
---

# Composition & Aggregation

```typescript
class Engine {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}

class Truck {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  isEngineRunning() {
    return this.engine.value;
  }
}

class Car {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  isEngineRunning() {
    return this.engine.value;
  }

  removeEngine() {
    this.engine = new Engine('Engine removed');
  }
}

let engine: Engine | undefined = new Engine('Engine running');
// notice both car and truck share engine
let car = new Car(engine);
let truck = new Truck(engine);

console.log('Car:', car.isEngineRunning());
console.log('Truck:', truck.isEngineRunning());
// delete car
car.removeEngine();
console.log('Car:', car.isEngineRunning());
console.log('Truck:', truck.isEngineRunning());
console.log('Same pointer', engine === truck.engine);
engine = undefined;
console.log(engine);
console.log('Truck:', truck.isEngineRunning());
console.log('Same pointer', engine === truck.engine);
```
