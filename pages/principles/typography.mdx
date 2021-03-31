---
name: Typography
menu: Principles 
---
# Fonts CLI

This tool is a wrapper to help download/rename fonts to fit with the font naming conventions.

## Conventions

For naming files, ensure that names are in lowercase format and that the numerals are replaced with common weight names (the renaming can be done with code).

We keep things lower case for purposes of serving on web, and replacing the numerals with the common font name is just an addition.

To see the conventional name for font weights, [Mozilla has a reference here.](https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e)

### Examples

| Example name                | After renaming                         |
| --------------------------- | -------------------------------------- |
| SourceSansPro-200.ttf       | source-sans-pro-extra-light.ttf        |
| SourceSansPro-200italic.ttf | source-sans-pro-extra-light-italic.ttf |
| SourceSansPro-regular.ttf   | source-sans-pro-regular.ttf            |

## Renaming

Running the rename function will find the path of the fonts and return it in the condition we require for the convention.

```javascript
const oldNames = [
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-200.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-200italic.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-300.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-300italic.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-600.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-600italic.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-700.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-700italic.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-900.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-900italic.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-italic.ttf',
  '/Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/SourceSansPro-regular.ttf'
];

/*
    // ! after renaming oldNames through function

    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-extra-light.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-extra-light-italic.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-light.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-light-italic.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-semi-bold.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-semi-bold-italic.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-bold.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-bold-italic.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-black.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-black-italic.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-italic.ttf
    /Users/okeeffe_d/Project-Imposter/hello-gfi/fonts/source-sans-pro-regular.ttf
*/
```

You can use something like the following to do this:

```javascript
const fs = require('fs-extra');
const cwd = process.cwd();
const recursive = require('recursive-readdir');
const kebabCase = require('lodash.kebabcase');

/**
 * Replace names of fonts found within directory
 * with naming convention.
 *
 */
const updateFontNames = async() => {
    /**
     * ! Replace numeral with comment name - hack job.
     *
     * @param {string} name Name of the font to update
     */
    const commentWeightName = name => {
        name = name.replace('100', 'thin');
        name = name.replace('200', 'extra-light');
        name = name.replace('300', 'light');
        name = name.replace('400', 'normal');
        name = name.replace('500', 'medium');
        name = name.replace('600', 'semi-bold');
        name = name.replace('700', 'bold');
        name = name.replace('800', 'extra-bold');
        name = name.replace('900', 'black');
        return name;
    }

    const fontFiles = await recursive(cwd, ['node_modules', '!*.ttf']);
    for (const fontPath of fontFiles) {
        try {
            const fontDirArr = fontPath.split('/');
            const fontNameFull = fontDirArr.pop();
            const font = fontNameFull.replace('.ttf', '');
            const fontDir = fontDirArr.join('/');
            let kebabFontName = kebabCase(font);
            const newFontName = commentWeightName(kebabFontName);
            const outputFilePath = fontDir + '/' + newFontName + '.ttf';
            fs.moveSync(fontPath, outputFilePath, {overwrite: true});
        } catch (err) {
            console.error(err);
        }
    }
};
```

## Convention usage for Web

```scss
/* open sans - light */
@font-face {
    font-family: 'open-sans-regular';
    font-style: normal;
    font-weight: 300;
    // local() just checks for local files first
    src: local('OpenSans Regular'), local('OpenSans-Regular'),
        url('/path/to/fonts/open-sans-regular.ttf') format('truetype'); /* Safari, Android, iOS */
}

// Font mixins
@mixin f-opensans-regular {
    font: {
        family: 'open-sans-regular', sans-serif;
    }
}

// optional - flexible usage
@mixin f-primary-regular {
    // option a)
    @include f-opensans-regular;
    // option b) - don't include the above mixin for this
    font: {
        family: 'open-sans-regular', sans-serif;
    }
}

// usage for standard base class
p,
li {
    @include f-primary-regular;
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 10px;
}
```

## Convention usage for React Native (not Expo)

For React Native, fonts MUST be kept at the root in `assets/fonts`.

Using the convention here can be a little different. You need to use the full name of the font which can be found on Font Book (even when refencing the font file).

[Check here for more information on what to do.](https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e)

## Convention usage for Expo

For React Native, fonts MUST be kept at the root in `assets/fonts`.

```javascript
import { Font } from 'expo';

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'open-sans-regular': require('./assets/fonts/open-sans-regular.ttf'),
    });
  }

  // ...
}
```