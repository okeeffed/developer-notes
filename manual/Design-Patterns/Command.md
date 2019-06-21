---
menu: Design Patterns
name: Command
---

# Command

> A behavioural design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time. -- Wikipedia

## Terminology

- Command: Knows about `receiver` and invokes a method of the `receiver`. Values for params of the receiver method are stored in the command. Values for receiver method params are stored in command.
- Receiver: Does the work when `execute()` is called in `command` object.
- Invoker: Knows how to execute a command and optionally does bookkeeping about command execution. Does not know anything about a concrete command, only the command interface.
- Client: Holds the `command` objects and `receiver` objects and assigns commands to the `invoker`. The client is also responsible for executing which commands at which points. It passes the `command` object to the `invoker` object.

## Example

This example is an extension to some code taken directly from [gztchan's GitHub repo](https://github.com/gztchan/design-patterns-in-typescript/blob/master/command/command.ts) as it gives a nice and simple example.

An extension made it to create a `FireCommand` to emulate how something like the Command Design could be used for a game.

```typescript
interface Command {
  execute(): void;
}

interface Receive {
  action(): void;
}

interface Invoke {
  runCommand(command?: Command): void;
}

// building the receiver
class CommandReceiver implements Receive {
  action(): void {
    console.log('Receiver takes action');
  }
}

// building out our commands
class LaunchCommand implements Command {
  private receiver: Receive;

  // NOTE: commands know about receiver
  constructor(receiver: Receive) {
    this.receiver = receiver;
  }

  execute(): void {
    console.log('Launch!!!');
    this.receiver.action();
  }
}

class FireCommand implements Command {
  private receiver: Receive;

  // NOTE: commands know about receiver
  constructor(receiver: Receive) {
    this.receiver = receiver;
  }

  execute(): void {
    console.log('Fire!');
    this.receiver.action();
  }
}

class StopCommand implements Command {
  private receiver: Receive;

  // NOTE: commands know about receiver
  constructor(receiver: Receive) {
    this.receiver = receiver;
  }

  execute(): void {
    console.log('Stop!!!');
    this.receiver.action();
  }
}

// the invoker which will run the command
class Invoker implements Invoke {
  private commands: Command[];

  constructor() {
    this.commands = [];
  }

  addCommand(command: Command) {
    this.commands.push(command);
  }

  runCommand(command?: Command) {
    if (command) {
      this.commands.push(command);
    }
    const command = this.commands.shift();
    command.execute();
  }
}

(function main() {
  // 1. We create a receiver
  const receiver = new CommandReceiver();

  // 2. We create commands that implement the base command interface and pass the receiver object to the command
  const launch = new LaunchCommand(receiver);
  const fire = new FireCommand(receiver);
  const stop = new StopCommand(receiver);

  // 3. We create the invoker to add commands to
  const invoker = new Invoker();

  // Example of adding and then running a command
  invoker.addCommand(launch);
  invoker.runCommand();

  invoker.addCommand(fire);
  invoker.runCommand();

  invoker.addCommand(stop);
  invoker.runCommand();

  // Example of adding multiple commands and then running multiple executions
  invoker.addCommand(launch);
  invoker.addCommand(fire);
  invoker.addCommand(fire);
  invoker.addCommand(fire);
  invoker.addCommand(stop);

  invoker.runCommand();
  invoker.runCommand();
  invoker.runCommand();
  invoker.runCommand();
  invoker.runCommand();
})();
```

## Java Example

```java
import java.util.ArrayList;

/** "Component" */
interface Graphic {
    //Prints the graphic.
    public void print();
}

/** "Composite" */
class CompositeGraphic implements Graphic {
    //Collection of child graphics.
    private final ArrayList<Graphic> childGraphics = new ArrayList<>();

    //Adds the graphic to the composition.
    public void add(Graphic graphic) {
        childGraphics.add(graphic);
    }

    //Prints the graphic.
    @Override
    public void print() {
        for (Graphic graphic : childGraphics) {
            graphic.print();  //Delegation
        }
    }
}

/** "Leaf" */
class Ellipse implements Graphic {
    //Prints the graphic.
    @Override
    public void print() {
        System.out.println("Ellipse");
    }
}

/** Client */
public class CompositeDemo {
    public static void main(String[] args) {
        //Initialize four ellipses
        Ellipse ellipse1 = new Ellipse();
        Ellipse ellipse2 = new Ellipse();
        Ellipse ellipse3 = new Ellipse();
        Ellipse ellipse4 = new Ellipse();

        //Creates two composites containing the ellipses
        CompositeGraphic graphic2 = new CompositeGraphic();
        graphic2.add(ellipse1);
        graphic2.add(ellipse2);
        graphic2.add(ellipse3);

        CompositeGraphic graphic3 = new CompositeGraphic();
        graphic3.add(ellipse4);

        //Create another graphics that contains two graphics
        CompositeGraphic graphic1 = new CompositeGraphic();
        graphic1.add(graphic2);
        graphic1.add(graphic3);

        //Prints the complete graphic (Four times the string "Ellipse").
        graphic1.print();
    }
}
```

## Resources

- [Command Design Pattern on Github](https://github.com/gztchan/design-patterns-in-typescript/blob/master/command/command.ts)
- [Wikipedia Resource](https://en.wikipedia.org/wiki/Command_pattern)
