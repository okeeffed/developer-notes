---
menu: Design Patterns
name: Abstract Factory Pattern
---

# Abstract Factory

Here we will cover the `creational` design pattern `Abstract Factory`.

Another creational pattern, the `Factory` design pattern, differs from Abstract Factory in that the factory method is a single method, whereas an abstract factory is an object.

> ... the Factory Method pattern uses inheritance and relies on a subclass to handle the desired object instantiation.

This quote assumes the object is calling its own factory method, therefore the only thing that could change the return value would be a subclass.

> ... with the Abstract Factory pattern, a class delegates the responsibility of object instantiation to another object via composition ...

Here there is an object A who wants to make a Foo object. Instead of making the Foo object itself (like in the factory method), it's going to get a different object (the abstract factory) to create the Foo object.

```javascript
// defining our abstract products
interface Processor {
    performOperation(): void;
}

interface HardDisk {
    storeData(): void;
}

interface Monitor {
    displayPicture(): void;
}

// defining our concrete products
class ExpensiveProcessor implements Processor {
    performOperation() {
        console.log('Operation will perform quickly!');
    }
}

class CheapProcessor implements Processor {
    performOperation() {
        console.log('Operation will perform slowly!');
    }
}

class ExpensiveHDD implements HardDisk {
    storeData() {
        console.log('Data will take less time to store');
    }
}

class CheapHDD implements HardDisk {
    storeData() {
        console.log('Data will take more time to store');
    }
}

class HighResMonitor implements Monitor {
    displayPicture() {
        console.log('High picture quality');
    }
}

class LowResMonitor implements Monitor {
    displayPicture() {
        console.log('Low picture quality');
    }
}

// defining the abstract factory
interface MachineAbstractFactory {
    // each factory needs to implement createPizza method
    getProcessor(): Processor;
    getHardDisk(): HardDisk;
    getMonitor(): Monitor;
}

// defining our concrete factories
class HighBudgetMachineFactory implements MachineAbstractFactory {
    getProcessor(): Processor {
        return new ExpensiveProcessor();
    }

    getHardDisk(): HardDisk {
        return new ExpensiveHDD();
    }

    getMonitor(): Monitor {
        return new HighResMonitor();
    }
}

class LowBudgetMachineFactory implements MachineAbstractFactory {
    getProcessor(): Processor {
        return new CheapProcessor();
    }

    getHardDisk(): HardDisk {
        return new CheapHDD();
    }

    getMonitor(): Monitor {
        return new LowResMonitor();
    }
}

// defining our client and final product
interface Machine {
    processor: Processor;
    hdd: HardDisk;
    monitor: Monitor;
}

class ComputerShop {
    // change access modifiers as suits
    public category: MachineAbstractFactory;

    // we'll pass a factory as category during instantiation
    constructor(category: MachineAbstractFactory) {
        this.category = category;
    }

    assembleMachine(): Machine {
        const processor = this.category.getProcessor();
        const hdd = this.category.getHardDisk();
        const monitor = this.category.getMonitor();

        // to be explicit
        const machine: Machine = {
            processor,
            hdd,
            monitor
        }
        return machine;
    }
}

// running the code in action!
const cheapFactory = new LowBudgetMachineFactory();
const expensiveFactory = new HighBudgetMachineFactory();

// ensure to pass the factory in during instantiation
const cheapShop = new ComputerShop(cheapFactory);
const cheapMachine = cheapShop.assembleMachine();
cheapMachine.hdd.storeData();
cheapMachine.processor.performOperation();
cheapMachine.monitor.displayPicture();

const expensiveShop = new ComputerShop(expensiveFactory);
const expensiveMachine = expensiveShop.assembleMachine();
expensiveMachine.hdd.storeData();
expensiveMachine.processor.performOperation();
expensiveMachine.monitor.displayPicture();
```

## References

- [Difference between factory and abstract factory](https://stackoverflow.com/questions/5739611/what-are-the-differences-between-abstract-factory-and-factory-design-patterns)
- [ASP.NET Abstract Factory vs Factory](https://www.codeproject.com/Articles/716413/Factory-Method-Pattern-vs-Abstract-Factory-Pattern)
