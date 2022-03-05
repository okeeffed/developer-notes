---
name: Add Sass to Webpack for Storybook
menu: Storybook
---

# Adding SASS to Webpack

## Steps

1.  Install the appropraite npm packages
2.  Eject create-react-app
3.  Update `webpack.config` (check webpack.config)

### Step One

```
yarn add sass-loader node-sass-magic-importer resolve-url-loader node-sass --dev
```

### Step Two

Ensure you have updated git first.

```
npm run eject
```

### Step Three

Make sure you exclude .scss from the file-loader.

Example for `webpack.config.dev.js`:

```javascript
// Top of the file
const magicImporter = require('node-sass-magic-importer');

...

{
    test: /\.scss$/,
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
                sourceMap: true
            }
        }
    ]
}
...
```

Example for `webpack.config.prod.js`:

```javascript
...
{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
        Object.assign(
            {
                fallback: require.resolve('style-loader'),
                use: [
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            minimize: true,
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
                            ]
                        }
                    },
                    require.resolve('resolve-url-loader'),
                    {
                        loader: 'sass-loader',
                        options: {
                            importer: magicImporter()
                        }
                    }
                ]
            },
            extractTextPluginOptions
        )
    )
    // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
}
...
```
