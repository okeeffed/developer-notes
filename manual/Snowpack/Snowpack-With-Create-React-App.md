---
menu: Snowpack
name: Snowpack with CRA
---

# Snowpack with CRA

## Resources

## Starting the app

```s
npx create-react-app snowpack-example
```

## Babel Run Command File

```json
{
  "presets": ["@babel/preset-react"]
}
```

## index.html

Add in `<script type="module" src="/_dist_/index.js"></script>`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/_dist_/index.js"></script>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

## Config

```js
// snowpack.config.js
// Plugin: https://github.com/ionic-team/rollup-plugin-node-polyfills
module.exports = {
  extends: '@snowpack/app-scripts-react',
  devOptions: {
    port: 8080,
    src: 'src',
    bundle: process.env.NODE_ENV === 'production',
    fallback: 'public/index.html',
  },
  installOptions: {
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
};
```

## Dependencies

```s
npm i --save-dev \
@snowpack/app-scripts-react \
@snowpack/plugin-babel \
rollup-plugin-node-polyfills \
snowpack
```

## package.json

Add this script:

```json
"scripts": {
  "dev": "snowpack dev --config snowpack.config.js",
}
```
