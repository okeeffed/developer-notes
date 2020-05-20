---
menu: Parcel
name: React with Parcel
---

# React with Parcel

## The files

### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>React starter app</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="index.js"></script>
  </body>
</html>
```

### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h1>Hello Test</h1>
    <p>Testing</p>
  </div>
);

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
```

### .babelrc

```json
{
  "presets": ["@babel/preset-react"]
}
```

### package.json

```json
{
  "name": "pkg-name",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "scripts": {
    "start": "parcel src/index.html"
  },
  "devDependencies": {
    "@babel/core": "^7.9.6",
    "@babel/preset-env": "^7.9.6",
    "@babel/preset-react": "^7.9.4",
    "parcel-bundler": "^1.12.4"
  }
}
```
