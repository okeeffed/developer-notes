---
menu: Treat
name: Playroom With Treat
---

# Playroom With Treat

The basic getting started can be found [on Github](https://github.com/seek-oss/playroom)

The tl;dr is `yarn add --dev playroom`, then add `"playroom:start": "playroom start"` and `"playroom:build": "playroom build"` to your `package.json` scripts.

## Updating playroom.config.js

Create the file `playroom.config.js`.

The working file should look like this:

```javascript
const TreatPlugin = require('treat/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  components: './src/components',
  outputPath: './dist/playroom',

  // Optional:
  title: 'Playroom',
  themes: './src/themes/index.js',
  frameComponent: './src/FrameComponent.js',
  // widths: [320, 375, 768, 1024],
  port: 9000,
  openBrowser: false,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: __dirname,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-typescript'),
              ],
              plugins: [
                require.resolve('@babel/plugin-proposal-class-properties'),
              ],
            },
          },
        },
        {
          test: /\.js$/,
          include: __dirname,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
              ],
              plugins: [
                require.resolve('@babel/plugin-proposal-class-properties'),
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new TreatPlugin({
        outputLoaders: [MiniCssExtractPlugin.loader],
      }),
      new MiniCssExtractPlugin(),
    ],
  }),
};
```

## Themes file

An example of the themes filed refernced above:

```typescript
export { default as scruffy } from './scruffy/index.js';
export { default as daisy } from './daisy/index.js';
```

## Frame Component

The working frame component looks like so:

```typescript
import React, { Fragment } from 'react';
import * as themes from './themes/treat';
import { TreatProvider } from 'react-treat';

export default ({ theme, children }) => {
  return (
    <TreatProvider theme={themes[theme.name]}>
      <Fragment>{children}</Fragment>
    </TreatProvider>
  );
};
```
