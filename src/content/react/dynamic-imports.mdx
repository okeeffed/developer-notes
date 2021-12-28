---
name: Dynamic Imports
menu: React 
---
# Dynamic Imports for a Component

## Example Code

The key action happens by using `componentDidMount` and knowledge of `state`:

```javascript
componentDidMount() {
    import('components/ComponentB').then((module) =>
        this.setState({ module: module.default })
    );
}
```

Here is the full code example:

```javascript
import React, { Component } from 'react';

/**
 * Dynamically load ComponentB.
 *
 * @class ComponentA
 * @extends {Component}
 */
class ComponentA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      module: null
    };
  }

  /**
   * On mount, dynamically fetch ComponentB.
   *
   * @memberof ComponentA
   */
  componentDidMount() {
    import('components/ComponentFilePond').then((module) =>
      this.setState({ module: module.default })
    );
  }

  /**
   * Render ComponentA component.
   *
   * @memberof ComponentA
   * @returns {ComponentA} component Basic div with dynamically loaded child
   */
  render() {
    const { module: ComponentB } = this.state;
    return (
      <div className="component-image-upload">
        {ComponentB && <ComponentB {...this.props} />}
      </div>
    );
  }
}

export default ComponentA;
```

---

_**Build** is a series that is about short, sharp examples._
