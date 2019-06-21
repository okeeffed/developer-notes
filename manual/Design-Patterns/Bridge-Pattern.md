---
menu: Design Patterns
name: Bridge Pattern
---

# Bridge Pattern

```javascript
interface Executive {
  operate(): void;
}

class Pilot implements Executive {
  operate(): void {
    console.log('Fly');
  }
}

class Soldier implements Executive {
  operate(): void {
    console.log('Shoot');
  }
}

class Commander {
  executeObject: Executive;

  constructor(executeObject: Executive) {
    this.executeObject = executeObject;
  }

  order(): void {
    this.executeObject.operate();
  }
}

class AirForceCommander extends Commander {
  order(): void {
    console.log('Air Force commander make order');
    // extra logics here
    super.order();
  }
}

class SpecialForceCommander extends Commander {
  order(): void {
    console.log('Special Force commander make order');
    // extra logics here
    super.order();
  }
}

(function main() {
  const commanderA = new AirForceCommander(new Pilot());
  const commanderB = new SpecialForceCommander(new Soldier());

  commanderA.order();
  commanderB.order();
})();
```

## C# Example

```csharp
// Helps in providing truly decoupled architecture
public interface IBridge
{
    void Function1();
    void Function2();
}

public class Bridge1 : IBridge
{
    public void Function1()
    {
        Console.WriteLine("Bridge1.Function1");
    }

    public void Function2()
    {
        Console.WriteLine("Bridge1.Function2");
    }
}

public class Bridge2 : IBridge
{
    public void Function1()
    {
        Console.WriteLine("Bridge2.Function1");
    }

    public void Function2()
    {
        Console.WriteLine("Bridge2.Function2");
    }
}

public interface IAbstractBridge
{
    void CallMethod1();
    void CallMethod2();
}

public class AbstractBridge : IAbstractBridge
{
    public IBridge bridge;

    public AbstractBridge(IBridge bridge)
    {
        this.bridge = bridge;
    }

    public void CallMethod1()
    {
        this.bridge.Function1();
    }

    public void CallMethod2()
    {
        this.bridge.Function2();
    }
}
```

## Java Example

```java
// Logger has two implementations: info and warning
interface Logger {
  public void log(String message);

  static Logger info() {
    return message -> System.out.println("info: " + message);
  }
  static Logger warning() {
    return message -> System.out.println("warning: " + message);
  }
}

abstract class AbstractAccount {
  private Logger logger = Logger.info();

  public void setLogger(Logger logger) {
    this.logger = logger;
  }

  // the logging part is delegated to the Logger implementation
  protected void operate(String message, boolean result) {
    logger.log(message + " result " + result);
  }
}

class SimpleAccount extends AbstractAccount {
  private int balance;

  public SimpleAccount(int balance) {
    this.balance = balance;
  }

  public boolean isBalanceLow() {
    return balance < 50;
  }

  public void withdraw(int amount) {
    boolean shouldPerform = balance >= amount;
    if (shouldPerform) {
      balance -= amount;
    }
    operate("withdraw " + amount, shouldPerform);
  }
}

public class BridgeDemo {
  public static void main(String[] args) {
    SimpleAccount account = new SimpleAccount(100);
    account.withdraw(75);

    if (account.isBalanceLow()) {
      // you can also change the Logger implementation at runtime
      account.setLogger(Logger.warning());
    }

    account.withdraw(10);
    account.withdraw(100);
  }
}
```
