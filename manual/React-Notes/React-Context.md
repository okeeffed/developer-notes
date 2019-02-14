---
name: React Context
menu: React
---

# React Context

## Basic Introduction

| System  | Description                                                    |
| ------- | -------------------------------------------------------------- |
| Props   | Get data from a parent component to a direct child component   |
| Context | Gets data from a parent omponent to any nested child component |

## An App with Context

A basic app where we want to pass context of things like language everywhere.

```javascript
class App extends Component {
    state = {langauge: 'english'};

    onLanguageChange = language => this.setState({language});

    render() {
        // return elements with onClick to change state
    }
}
```

### Getting Data Out of Context

1. Create context file
2. Set contextType as static property to class
3. Consume from this.context
4. Update the context using the `Provider`

```javascript
// context/language/index.js
import React from 'react';

// creating context with default 'english'
export default React.createContext('english');

// inside of a component 
import LanguageContext from 'path/to/file';
export default class Button extends React.Component {
    static contextType = LanguageContext;

    render() {
        const text = this.context === 'english' ? 'Submit' : 'Voorleggen';
        return <button>{text}</button>
    }
}
```

To update the context, from a higher provider we could set...

```javascript
class App extends Component {
    state = {langauge: 'english'};

    onLanguageChange = language => this.setState({language});

    render() {
        // return elements with onClick to change state
        <LanguageContext.Provider value={this.state.language}>
           <ChildThatContainsButton>
        </LanguageContext.Provider>
    }
}
```

### Gotchas Around Context

The big gotcha with the context is dealing with the value prop given to the provider.