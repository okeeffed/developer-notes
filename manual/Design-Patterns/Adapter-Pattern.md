---
menu: Design Patterns
name: Adapter Pattern
---

# Adapter Pattern

```javascript
// the base adapter
interface RequestAdapter {
  request(newParam: string): void;
}

// The adapter utilising the old way
class InterfaceAdapter implements RequestAdapter {
  request(newParam: string): void {
    const old = new OldInterface();
    old.requestInOldWay({
      data: newParam
    });
  }
}

class OldInterface {
  requestInOldWay(oldParam: any): void {
    console.log(oldParam);
  }
}

(function main() {
  const adapter = new InterfaceAdapter();
  adapter.request('param');
})();
```
