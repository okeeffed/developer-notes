---
menu: Epic React
name: React Fundamentals
---

# React Fundamentals

## Resources

1. [MDN script tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
2. [React Source Code creating DOM elements](https://github.com/facebook/react/blob/fd61f7ea53989a59bc427603798bb111c852816a/packages/react-dom/src/client/ReactDOMComponent.js#L472)
3. [Imperative vs Declarative Programming](https://ui.dev/imperative-vs-declarative-programming/)

## Lesson 1

The extra credit was more just using JS to create all the DOM nodes:

```html
<html>
  <body>
    <script type="module">
      // add root div
      const div = document.createElement('div');
      div.id = 'root';
      document.querySelector('body').append(div);

      // add div
      const newDiv = document.createElement('div');
      newDiv.textContent = 'Hello World';
      const rootDiv = document.getElementById('root');
      rootDiv.append(newDiv);
    </script>
  </body>
</html>
```

What is interesting here is the usage of `<script type="module"></script>` which gives support for ES Modules.

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script):

> Causes the code to be treated as a JavaScript module. The processing of the script contents is not affected by the charset and defer attributes. For information on using module, see our JavaScript modules guide. Unlike classic scripts, module scripts require the use of the CORS protocol for cross-origin fetching.

## Lesson 2 - Raw React APIs

Interesting distinction between React and React DOM:

- React: responsible for creating react elements (kinda like `document.createElement()`)
- ReactDOM: responsible for render react elements to the DOM (kinda like `rootElement.append()`)

### Using React with CDNs + Inline JS

```html
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>

  <script type="module">
    // Grab root element from DOM
    const rootElement = document.getElementById('root');
    // Assign props as you normally would
    const elementProps = {
      id: 'awesome-new-id',
      className: 'bg-blue-700',
      children: 'I have a class and ID!',
    };
    const elementType = 'h1';

    // This creates our element imperatively
    const reactElement = React.createElement(elementType, elementProps);
    ReactDOM.render(reactElement, rootElement);
  </script>
</body>
```

And to create React components within React components, I went this route to show `Ayo, World!`:

```html
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>

  <script type="module">
    // Grab root element from DOM
    const rootElement = document.getElementById('root');

    const reusableSpan = props => React.createElement('span', props);
    const divProps = {
      // Returns React component children
      children: [
        reusableSpan({ children: 'Ayo, ' }),
        reusableSpan({
          children: 'World!',
        }),
      ],
    };
    const divElement = React.createElement('div', divProps);

    ReactDOM.render(divElement, rootElement);
  </script>
</body>
```

React also enables us to pass Children as Rest arguments:

```html
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>

  <script type="module">
    // Grab root element from DOM
    const rootElement = document.getElementById('root');

    const reusableSpan = props => React.createElement('span', props);
    const divElement = React.createElement(
      'div',
      {},
      reusableSpan({ children: 'Ayo, ' }),
      reusableSpan({
        children: 'World!',
      }),
    );

    ReactDOM.render(divElement, rootElement);
  </script>
</body>
```

## Using JSX

The better you become at understanding `React.createElement`, the better you will become with JSX.

We can begin to start using JSX in the HTML thanks to Babel!

```html
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>

  <script src="https://unpkg.com/@babel/standalone@7.9.3/babel.js"></script>

  <script type="text/babel">
    const className = 'container';
    const children = 'Hello World';
    const element = <div className={className}>{children}</div>;
    ReactDOM.render(element, document.getElementById('root'));
  </script>
</body>
```

Extra credit: spreads.

```html
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>

  <script src="https://unpkg.com/@babel/standalone@7.9.3/babel.js"></script>

  <script type="text/babel">
    const children = 'Hello World';
    const className = 'container';
    const props = { children, className };
    const element = <div {...props} />;
    ReactDOM.render(element, document.getElementById('root'));
  </script>
</body>
```

> Note: with JSX, you cannot write a statement ie if-else, etc.

For the extra credit - there was a nice explanation of Babel converting spreads within the `<div {...props} />` to use an "extend" transform where the **order matters** ie if you put `id` before or after the spread, that will effect the end result.

## Creating Custom Components

Something interesting is that in the below, the `helloElement` creates a custom `message` component, whereas call `message` directly **does not create a custom component**.

```js
function message({ children }) {
  return <div classNane="message">{children}</div>;
}

const helloElement = React.createElement(message, {children: 'Hello!'})

const element = {
  <div className="container">
    {helloElement}
    {message({children: 'World!'})}
  </div>
}
```

### Capitalizing Components

Why does `message` not work but `Message` work? If you look at Babel, you get answers from the transpilation.

With React specifications, starting the function with a capital letter will help Babel know how to transform the custom components.
