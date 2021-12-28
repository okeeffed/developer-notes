---
name: Adding Sass to Storybook
menu: Storybook
---

# Adding Sass to Storybook

Create a custom `.storybook/webpack.config.js` file. The following works for the `create-react-app` setup:

```javascript
const path = require('path');
const magicImporter = require('node-sass-magic-importer');
// if you need theming
const config = require('../config.json');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ],
              sourceMap: true
            }
          },
          require.resolve('resolve-url-loader'),
          {
            loader: 'sass-loader',
            options: {
              importer: magicImporter(),
              sourceMap: true,
              // if you need theming
              data: `$theme: '${config.theme}';`
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
        }
      }
    ]
  }
};
```
