---
menu: Design Patterns
name: Mediator
---

# Mediator

Mediator is a behavioural design pattern

## Example

In this example, we will have a `ConcreteMediator` that will ensure certain `Participants` receive a message based on the `Participant` sending the `Broadcast`.

```typescript
interface Mediator {
  broadcast(msg: String, sender: Participant): void;
}

class ConcreteMediator implements Mediator {
  public firstParticipant: Participant;
  public secondParticipant: Participant;

  broadcast(msg: String, sender: Participant): void {
    if (sender === this.firstParticipant) {
      this.firstParticipant.receiveMsg(msg);
      this.secondParticipant.receiveMsg(msg);
    }

    if (sender === this.secondParticipant) {
      this.firstParticipant.receiveMsg(msg);
    }
  }
}

class Participant {
  public mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  broadcast(msg: String): void {
    this.mediator.broadcast(msg, this);
  }

  receiveMsg(msg: String): void {
    console.log('recieveMsg:', msg);
  }
}

class FirstParticipant extends Participant {
  constructor(mediator: Mediator) {
    super(mediator);
  }

  broadcast(msg: String) {
    console.log('First participant customized logic');
    super.broadcast(msg);
  }
}

class SecondParticipant extends Participant {
  constructor(mediator: Mediator) {
    super(mediator);
  }

  broadcast(msg: String) {
    console.log('Second participant customized logic');
    super.broadcast(msg);
  }
}

(function main() {
  const mediator = new ConcreteMediator();
  const a = new FirstParticipant(mediator);
  const b = new SecondParticipant(mediator);

  mediator.FirstParticipant = a;
  mediator.SecondParticipant = b;

  a.broadcast(
    'FirstParticipant sends message to FirstParticipant, SecondParticipant'
  );
  b.broadcast('SecondParticipant sends message to FirstParticipant');
})();
```
