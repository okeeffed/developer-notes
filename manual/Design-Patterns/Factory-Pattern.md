---
menu: Design Patterns
name: Factory Pattern
---

# Factory Pattern

```javascript
// Factory Pattern
// first, create our products
interface Customer {
    addPoints(): void;
    addDiscount(): void;
}

interface IGoldCustomer extends Customer {
    goldOperation(): void;
}

class GoldCustomer implements IGoldCustomer {
    addPoints() {
        console.log('Gold Customer - Points Added');
    }

    addDiscount() {
        console.log('Gold Customer - Discount Added');
    }

    goldOperation() {
        console.log('Specific Gold Customer operation');
    }
}

interface ISilverCustomer extends Customer {
    silverOperation(): void;
}

class SilverCustomer implements ISilverCustomer {
    addPoints() {
        console.log('Gold Customer - Points Added');
    }

    addDiscount() {
        console.log('Gold Customer - Discount Added');
    }

    silverOperation() {
        console.log('Specific Silver Customer operation');
    }
}

// build a simple factory
// ensure we use a generic for typing our createCustomer method correctly
abstract class CustomerFactory<T extends Customer> {
    getCustomer() {
        const customer = this.createCustomer();
        customer.addPoints();
        customer.addDiscount();
        return customer;
    }

    abstract createCustomer(): T;
}

class GoldCustomerFactory extends CustomerFactory<IGoldCustomer> {
    createCustomer(): GoldCustomer {
        return new GoldCustomer();
    }
}

class SilverCustomerFactory extends CustomerFactory<ISilverCustomer> {
    createCustomer(): SilverCustomer {
        return new SilverCustomer();
    }
}

// code in action
const goldCustomerFactory: GoldCustomerFactory = new GoldCustomerFactory();
const goldCustomer = goldCustomerFactory.getCustomer();
goldCustomer.goldOperation();

const silverCustomerFactory = new SilverCustomerFactory();
const silverCustomer = silverCustomerFactory.getCustomer();
silverCustomer.silverOperation();
```
