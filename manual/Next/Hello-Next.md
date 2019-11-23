---
menu: Next
name: Hello Next
---

# Hello Next

## Useful links

- [Next.js Handbook](https://www.freecodecamp.org/news/the-next-js-handbook/)
- [Typescript Setup](https://www.manuel-schoebel.com/blog/nextjs-typescript-storybook-setup)

## Getting started

`npx create-next-app` will create a next app. Using `--example blog-starter` will show an example with a blog.

Change into directory and run `yarn dev`.

## Setting up TypeScript

`touch tsconfig.json && yarn add --dev typescript @types/react`

## Adding Treat

`yarn add treat react-treat`

You then need to update the `next.config.js` file:

```javascript
// start of file
const TreatPlugin = require('treat/webpack-plugin');

// within webpack config object
if (isServer) {
  config.plugins.push(
    new TreatPlugin({
      outputCSS: false,
    }),
  );
} else {
  config.plugins.push(new TreatPlugin());
}
```

Create a theme:

```javascript
// theme.treat.js
// ** THIS CODE WON'T END UP IN YOUR BUNDLE! **
import { createTheme } from 'treat';

export default createTheme({
  brandColor: 'blue',
  grid: 4,
});
```

Now import the styles:

```javascript
// App.js
import React from 'react';
import { TreatProvider } from 'react-treat';

import theme from './theme.treat.js';

export const App = () => <TreatProvider theme={theme}>...</TreatProvider>;
```
