---
name: Regression Testing
menu: Testing 
---
# CSS Regression Testing

We can achieve CSS regression testing by using an assertion library in conjuction with Puppeteer and Pixel Diff.

## Prequisites

### Using yarn

```bash
yarn install --dev mocha chai puppeteer pixelmatch pngfs babel-polyfill babel-preset-env babel-plugin-module-resolver
```

### Using kratos

```bash
kratos install js-controllers pixeldiff
kratos install js-test regression
shotgun run
```

### Folder setup

Ensure that you have a `regression` folder to store all the images.

```bash
# Example regression layout
regression
├── diff
│   └── test.png
├── src
│   └── test.png
└── temp
    └── test.png

3 directories, 3 files
```

## Using Regression CLI

### Preparation

1. Set the imports for the router file.
2. Set the dev router.
3. Set the array in the .puppeteer file.
4. Ensure the devRouter is being used.
5. Ensure app is running.
6. Run source to set the base image.
7. Run compare to compare source to current.

## Application

### 1. Create a babelrc file

```json
{
  "presets": ["env"],
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "controllers": "./controllers"
        }
      }
    ]
  ]
}
```

### 2. Saving a screenshot

This is not the test itself but a simple node script to get the initial base working:

```javascript
const PixelDiff = require('./controllers/pixeldiff');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Opening browser');
  await page.goto('http://localhost:3000');

  const el = await page.$('.homeSplashFade');
  await el.screenshot({ path: 'regression/src/test.png' });

  console.log('Closing browser');
  await browser.close();

  /*
    console.log('Comparing images');
    const res = await PixelDiff.diff({imgOnePath: 'test.png', imgTwoPath: 'test2.png', dest: 'dest.png', output: true});
    console.log(res);
    */
})();
```

### 3. Writing the test file

Create your test file. Any example test file looks like the following:

```javascript
/**
 * Regression tests
 * @author Dennis O'Keeffe
 */
require('babel-polyfill');
const expect = require('chai').expect;
const cwd = process.cwd();
const PixelDiff = require('controllers/pixeldiff');
const puppeteer = require('puppeteer');

console.log(PixelDiff);
console.log(cwd);

const screenshot = async (selector, savePath, location = '/') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Opening browser');
  await page.goto('http://localhost:3000');

  const el = await page.$('#root');
  await el.screenshot({ path: savePath });

  console.log('Closing browser');
  await browser.close();
};

describe('It works functionality', () => {
  it('Expects true to be true', () => {
    expect(true).to.be.true;
  });
});

describe('Image regression testing', () => {
  it('has no pixel difference', async () => {
    console.log('Comparing images');
    await screenshot('.homeSplashFade', cwd + '/regression/temp/test.png');

    const res = await PixelDiff.diff({
      imgOnePath: cwd + '/regression/src/test.png',
      imgTwoPath: cwd + '/regression/temp/test.png',
      dest: cwd + '/regression/diff/test.png',
      output: true
    });
    expect(res).to.equal(0);
  });
});
```

### 4. Running the test from the CLI

```bash
mocha --compilers js:babel-core/register --timeout 0 ./test/regression/regression.mocha.js
```
