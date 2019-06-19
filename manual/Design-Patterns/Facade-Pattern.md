---
menu: Design Patterns
name: Facade Pattern
---

# Facade Pattern

The Facade Pattern is a structural pattern that is used to, according the the GOF book, "Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use."

In the example below, we will look at basic facade that takes the different operations required to start a running race of the basic phrase "Get ready! Get set! Go!":

```javascript
class EngineSystem {
  activate() {
    console.log('Activate the engine');
  }
}

class MonitorSystem {
  check() {
    console.log('Check system situations');
  }
}

class OxygenSystem {
  generate() {
    console.log('Oxygen will be generated');
  }
}

class RocketTestingOperation {

  private _engineSys: EngineSystem;
  private _monitorSys: MonitorSystem;
  private _oxygenSys: OxygenSystem;

  constructor() {
    this._engineSys = new EngineSystem();
    this._monitorSys = new MonitorSystem();
    this._oxygenSys = new OxygenSystem();
  }

  operationStart() {
    this._monitorSys.check();
    this._oxygenSys.generate();
    this._engineSys.activate();

  }
}

(function main() {
  const operation = new RocketTestingOperation();
  operation.operationStart();
})();
```
