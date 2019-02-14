---
name: React Hooks
menu: React
---

# React Hooks

Hooks introduces `State` and `Lifecycle Methods` to function-based components.

Hooks make it really easy to share logic between components.

## Before Hooks

```javascript
// components/App.js
import React from 'react';

export default App extends React.Component {
    state = {
        counter: 0
    }

    handleClick = () => this.setState({counter: this.state.counter++})
    render() {
        return <div>
            <button onClick={this.handleClick}>Update</button>
        </div>
    }
}
```

## After Hooks
