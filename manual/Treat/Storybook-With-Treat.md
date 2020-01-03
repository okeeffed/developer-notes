---
menu: Treat
name: Storybook With Treat
---

# Storybook With Treat

## Setting Up Storybook

The reference for getting started with [Storybook can be found here](https://www.learnstorybook.com/intro-to-storybook/react/en/get-started/).

## Note With Mixing Yarn and NPM

If for some reason you are mixing `npx` and `yarn`, you may run into issues with package versions. If this occurs, troubleshooting may be eased by using Yarn Resolutions ie in package.json add the following:

```json
"resolutions": {
  "webpack": "4.39.1" // whatever version you want to resolve
}
```

This was a killer when first attempting to setup.

## Setting Up Configuration

In `.storybook/config.js` we need to setup Storybook to have the TreatProvider over all the stories:

```javascript
import { configure } from '@storybook/react';
import { load, addDecorator } from '@storybook/react';
import React from 'react';
import { TreatProvider } from 'react-treat';
import * as themes from '../src/themes/treat';
const themeNames = ['scruffy', 'daisy', 'three', 'four'];

// use this to add the decorator to every story
addDecorator(storyFn => (
  <TreatProvider theme={themes['daisy']}>{storyFn()}</TreatProvider>
));
// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);
```

We also need to add the `TreatPlugin` into the Webpack build. For that, update `.storybook/webpack.config.js` to reflect the following:

```javascript
const path = require('path');
// your app's webpack.config.js
const TreatPlugin = require('treat/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async ({ config, mode }) => {
  config.plugins.push(
    new TreatPlugin({
      outputLoaders: [MiniCssExtractPlugin.loader],
    }),
  );
  config.plugins.push(new MiniCssExtractPlugin());
  return config;
};
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
```

Perfecto! Added `"storybook": "start-storybook -p 6006"` to your scripts in `package.json` and you are ready to go!
