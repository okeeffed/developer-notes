---
menu: Design Patterns
name: Chain Of Responsibility
---

# Chain Of Responsibility

Purpose: Behavioural
Type: Object

## About

Used to achieve loose coupling where a request from a client is passed to a chain of objects to process them. The object in the chain will decide whether the request moves onto the next object in the chain or not.

Applicable when:

- Decoupling request's sender and reciever
- Multiple objects, determined at runtime, are candidates to handle a request
- Don't want to specific handlers explicitly
- Want to issue a request to one of several objects without explicitly specifying the reciever

## Components

- Handler: An interface which will primarily recieve the request and dispatch that request to the chain of handlers.
- Concrete handlers: Handlers that actually handle the request chained in some sequential order.
- Client: Originator of request and will access handler to handle it.

```typescript
class Handler {
  private _successor: Handler;

  public set successor(successor: Handler) {
    this._successor = successor;
  }

  public get successor() {
    return this._successor;
  }

  public handleRequest(msg: Number): void {}
}

class ConcreteHandlerA extends Handler {
  handleRequest(req: Number): void {
    if (req > 0) {
      console.log(`Handler A process ${req}`);
    } else {
      this.successor.handleRequest(req);
    }
  }
}

class ConcreteHandlerB extends Handler {
  handleRequest(req: Number): void {
    if (req < 0) {
      console.log(`Handler B process ${req}`);
    } else {
      this.successor.handleRequest(req);
    }
  }
}

class ConcreteHandlerC extends Handler {
  handleRequest(req: Number): void {
    if (req === 0) {
      console.log(`Handler C process ${req}`);
    } else {
      this.successor.handleRequest(req);
    }
  }
}

(function main() {
  const reqA = new ConcreteHandlerA();
  const reqB = new ConcreteHandlerB();
  const reqC = new ConcreteHandlerC();

  // set the chain or responsibility
  reqA.successor = reqB;
  reqB.successor = reqC;

  // handle the requests
  reqA.handleRequest(0); // logs "Handler C process 0"
  reqA.handleRequest(1); // logs "Handler A process 1"
  reqA.handleRequest(-1); // logs "Handler B process -1"
})();
```
