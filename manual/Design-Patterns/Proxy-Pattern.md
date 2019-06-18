---
menu: Design Patterns
name: Proxy Pattern
---

# Proxy Pattern

The Proxy object in the design pattern can:

- Can be used to substitude for another object (Subject)
- Implements additional functionality to control the access to this subject

This enables to work through a Proxy object to perform additional functionality when accessing a subject. For example, to check the access rights of a client accessing a sensitive object.

## Resource Example

```javascript
interface IResource {
  fetch(): void;
}

class ResourceProxy implements IResource {
  private resource: Resource;

  constructor() {
    this.resource = new Resource();
  }

  fetch(): void {
    console.log('invoke resource fetch method')
    this.resource.fetch();
  }
}

class Resource implements IResource {
  fetch(): void {
    console.log('fetch resource')
  }
}

(function main() {
  const proxy = new ResourceProxy();
  proxy.fetch();
})()
```

## Car Driver Example

An alternative using a proxy to ensure the driver has permission to drive:

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
