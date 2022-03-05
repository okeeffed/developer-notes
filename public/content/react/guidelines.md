---
name: Guidelines
menu: React 
---
---
Author: Dennis O'Keeffe
Section: React
---

# Guidelines for using React

These are by no means rules but **guidelines** for how to decide on whether the component should connect directly Redux and making decisions on whether or not the component is required in multiple forms, readied for different platforms etc.

## Sections

1.  When to use Redux and connect a function?
2.  When to decide to use a multicomponent?

## 1. When to use Redux and connect a function?

There are two types of components: stateful ("smart") components and stateless ("dumb") components.

The "dumb" stateless components have one job: `Take data as input and display`. In order to make components malleable and reusable, we aim to decouple them from state and ensure that they can then be reuseable and display differing information based on what is handed down to them.

Take the following example:

```javascript
// Stateless, "dumb" component
const ComponentNumberDisplay = props => (
    <div className="component-number-display">
        <p className="copy">{props.number}</p>
    </div>
);

// Stateful, "smart" components
const PageOne = () => (
    <section className="page-one">
        <div className="container-content">
            <ComponentNumberDisplay number={4} />
        </div>
    </section>
);

const PageTwo = () => (
    <section className="page-two">
        <div className="container-content">
            <ComponentNumberDisplay number={7} />
            <ComponentNumberDisplay number={10} />
        </div>
    </section>
);

const PageThree = () => {
    const numbers = [1,2,3];
    const mapComponentNumberDisplays = (numbers) => {
        return numbers.map((number, index) => (<ComponentNumberDisplay key={index} number={number} />)
    }

    return (
        <section className="page-two">
            <div className="container-content">
                {mapComponentNumberDisplays(numbers)}
            </div>
        </section>
    );
}
```

In this example, `PageOne`, `PageTwo`, `PageThree` are all "smart", stateful components, although this means that they themselves are not very reusable given how rigid they are for what the display.

On the other hand, `ComponentNumberDisplay` will just display whatever is passed down from the parent itself. The aim of the game is to pass down props from the **single** parent that we connect up. In the case of the web and apps, we should make the stateful component the **page** where possible and pass down the rest of the props.

To illustrate this, we will now introduce a Redux connected component and how data will be passed down the chain.

```javascript
// Stateless, "dumb" component
const ComponentNumberDisplay = (props) => (
    <div className="component-number-display">
        <p className="copy">{props.number}</p>
    </div>
);

// Stateless, "dumb" component
const ComponentTextDisplay = (props) => (
    <div className="component-number-display">
        <p className="copy">{props.copy}</p>
    </div>
);

// Stateless, "dumb" component
const ComponentDataDisplay = (props) => (
    <React.Fragment>
        <ComponentNumberDisplay {...props} />
        <ComponentTextDisplay {...props} />
    </React.Fragment>
);

// In another file, PageOne
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* user imports */
import ComponentDataDisplay from 'app/components/ComponentDataDisplay';

class PageOne extends Component {
    /**
     * Render <%= name %> component
     * @memberof <%= name %>
     * @var {function} render Render <%= name %> component
     * @returns {<%= name %>} component
     */
    render() {
        const { number, copy } = this.props;
        return (
            <div className="page-one">
                <ComponentDataDisplay {...props} />
                {/* Alternative to be specific */}
                <ComponentDataDisplay number={number} copy={copy} />
            </div>
        );
    }
}

// Map reducer state to a props object
const mapStateToProps = (state) => ({
    number: state.SomeReducer.number,
    copy: state.AnotherReducer.copy
});

// Connect those props to the component
export default connect(mapStateToProps, {})(PageOne);
```

In this example, `PageOne` is connected to Redux and gets `number` and `copy` added to `props`. From here, we can either destructure those variables or just pass down all the props to `ComponentDataDisplay`. Within the `ComponentDataDisplay`, we've just again passed down all the props from `PageOne` and in the case of `ComponentNumberDisplay` this means there is a `props.number` variable and for `ComponentTextDisplay` a `props.copy` variable.

Use your best decision making when deciding whether to pass down specific props or just all props.
