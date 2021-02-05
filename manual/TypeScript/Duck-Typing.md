---
menu: TypeScript
name: Duck Typing in TypeScript
---

# Duck Typing in TypeScript

This is an example of typing in TS:

```ts
interface Vehicle {
  model: number;
}

interface StrVehicle {
  model: string;
}

class Car {
  model;

  constructor(model) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }
}

const otherCar: Vehicle = new Car(4);
otherCar.model;

const strCar: StrVehicle = new Car('mitsubishi');
strCar.model;

class StrictCar implements Vehicle {
  model: number;

  constructor(props) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }
}

const otherCar2: Vehicle = new StrictCar(4);
otherCar.model;

// Throws error: `StrVehicle not assignable to StrictCar`
const strCar2: StrVehicle = new StrictCar('mitsubishi');
strCar.model;
```
