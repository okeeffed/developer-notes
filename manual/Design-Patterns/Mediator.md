---
menu: Design Patterns
name: Mediator
---

# Mediator

Mediator is a behavioural design pattern which helps when there are many objects communicating with each other.

The Mediator itself is an object that encapsulates how one or more objects interact with each other. It controls how these object communication and resticts dependencies required to manage.

## Components

- Mediator: Defines interface for communication between `Colleague` objects.
- ConcreteMediator: Implements `Mediator`, has awareness of `colleagues` and facilitates communication between.
- Colleague: Defines interface for communication with other `Colleagues` through the `Mediator`.
- ConcreteColleague: Implements the `Colleague` interface an communicates to other colleagues through its `Mediator`.

## Example

In this example, we will have a `ConcreteMediator` that will ensure certain `Participants` receive a message based on the `Participant` sending the `Broadcast`.

We will use the mediator to ensure messages sent from the `FirstParticipant` is broadcasted to both `FirstParticipant` and `SecondParticipant` while messages from the `SecondParticipant` are only reached by the `FirstPartiicpant` and not itself.

The abstract `Participant` class in this example is the `Colleague` and the subclasses are the `ConcreteColleague` classes.

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

abstract class Participant {
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
  const firstParticipant = new FirstParticipant(mediator);
  const secondParticipant = new SecondParticipant(mediator);

  mediator.firstParticipant = firstParticipant;
  mediator.secondParticipant = secondParticipant;

  firstParticipant.broadcast(
    'FirstParticipant sends message to FirstParticipant, SecondParticipant'
  );
  secondParticipant.broadcast(
    'SecondParticipant sends message to FirstParticipant'
  );
})();
```

## Resources

- [Mediator in C#](https://www.infoworld.com/article/3204528/how-to-use-the-mediator-design-pattern-in-c.html)
