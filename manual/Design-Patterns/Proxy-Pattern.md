---
menu: Design Patterns
name: Proxy Pattern
---

# Proxy Pattern

The Proxy object in the design pattern can:

- Can be used to substitude for another object (Subject)
- Implements additional functionality to control the access to this subject

This enables to work through a Proxy object to perform additional functionality when accessing a subject. For example, to check the access rights of a client accessing a sensitive object.

## Car Driver Example

In this example, we will create a class `ProxyCar` that will act as a proxy for the `Car` class by ensure that you of a correct age to drive the car (`driveCar` function).

This simple example can be replicated to help proxy things such as network requests or authentication to certain classes.

```javascript
interface ICar {
  driveCar(): void;
}

// Real Object
class Car implements ICar {
  driveCar() {
    console.log('Car has been driven!');
  }
}

class ProxyCar implements ICar {
  private _driver: Driver;
  private _realCar: ICar;

  constructor(driver: Driver) {
    this._driver = driver;
    this._realCar = new Car();
  }

  driveCar() {
    if (this._driver.age < 16) {
      console.log('Driver is too young to drive');
    } else {
      this._realCar.driveCar();
    }
  }
}

class Driver {
  public age: number;

  constructor(age: number) {
    this.age = age;
  }
}

(function main() {
  const carWithIneligibleDriver: ICar = new ProxyCar(new Driver(15));
  carWithIneligibleDriver.driveCar();

  const carWithEligibleDriver: ICar = new ProxyCar(new Driver(25));
  carWithEligibleDriver.driveCar();
})()
```
