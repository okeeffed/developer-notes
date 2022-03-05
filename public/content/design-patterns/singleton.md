---
menu: Design Patterns
name: Singleton
---

# Singleton

Another creational design pattern used to ensure there is only ever one instance in use.

```javascript
class Singleton {
  private static instance: Singleton;
  public value: number = 4;

  private constructor() {}

  static getSharedInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

const singletonOne = Singleton.getSharedInstance();
singletonOne.value = 12;
console.log('S1 value:', singletonOne.value); // 12

const singletonTwo = Singleton.getSharedInstance();
singletonTwo.value = 21;
console.log('S2 value:', singletonTwo.value); // 21
console.log('S1 value:', singletonOne.value); // 21
```
