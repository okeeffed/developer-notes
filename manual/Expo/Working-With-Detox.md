---
name: Working With Detox
menu: Expo 
---
# Intro to Detox and Expo

## Links

[Setup guide can be found here](https://github.com/wix/detox/blob/master/docs/Guide.Expo.md)

## Prereqs

Ensure Node is 8.3.0 or higher.

Install `applesimutils`:

```shell
brew tap wix/brew
brew install applesimutils
```

Install detox-cli:

```shell
npm install -g detox-cli
```

## Getting Started

### 1. Yarn add

```
yarn add detox detox-expo-helpers expo-detox-hook
```

### 2. Add the following to package.json

```json
"detox": {
  "configurations": {
    "ios.sim": {
      "binaryPath": "bin/Exponent.app",
      "type": "ios.simulator",
      "name": "iPhone 7"
    }
  }
}
```

…and to the scripts object:

```json
"scripts": {
    "e2e": "detox test --configuration ios.sim"
}
```

### 3. Download IPA

Fetch the IPA file [from here](https://expo.io/tools#client)

### 4. Copy e2e files

Fetch/copy files [from Github](https://github.com/expo/with-detox-tests/tree/master/e2e)

## Using Detox

A basic example of incorporating some useful detox calls:

```js
const { reloadApp } = require('detox-expo-helpers');

describe('Login flow', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should login successfully', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('email'))).toBeVisible();

    await element(by.id('email')).typeText('john@example.com');
    await element(by.id('password')).typeText('123456');
    await element(by.text('Login')).tap();

    await expect(element(by.text('Welcome'))).toBeVisible();
    await expect(element(by.id('email'))).toNotExist();
  });
});
```

The element can be selected by making the most of using the `testId` — for example, the following test button has ID `hello_button`:

```js
<TouchableOpacity
  testID="hello_button"
  onPress={this.onButtonPress.bind(this, 'Hello')}
>
  <Text style={{ color: 'blue', marginBottom: 20 }}>Say Hello</Text>
</TouchableOpacity>
```

## Running the tests

Finally, to run the test we can run `yarn start` in one terminal and `yarn e2e` on the other to run the `e2e` script. Note that you need to have live reload disabled, so better to also put the app into production mode before running the e2e tests. This can be done from the terminal following the instructions to set production mode.

## Notes

You may need to add the `--reuse` flag to the `e2e` script. At the time of writing, the current version 0.55 is having issues on iOS with hanging. The requirement at the moment is that you have to open and close the Expo window. [See this GitHub issue for more info](https://github.com/wix/Detox/issues/917#issuecomment-422396875).
