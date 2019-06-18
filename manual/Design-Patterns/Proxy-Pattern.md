---
menu: Design Patterns
name: Proxy Pattern
---

# Proxy Pattern

The Proxy object in the design pattern can:

- Can be used to substitude for another object (Subject)
- Implements additional functionality to control the access to this subject

```javascript
interface IResource {
  fetch(): void;
}

class ResourceProxy implements IResource {
  private resource: Resource;

  constructor() {
    this.resource = new Resource();
  }

  fetch(): void {
    console.log('invoke resource fetch method')
    this.resource.fetch();
  }
}

class Resource implements IResource {
  fetch(): void {
    console.log('fetch resource')
  }
}

(function main() {
  const proxy = new ResourceProxy();
  proxy.fetch();
})()
```
