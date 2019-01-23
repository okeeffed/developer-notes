---
name: Intro
menu: Storybook 
---
---
Author: Dennis O'Keeffe
Section: Storybook
---

# Storybook Intro

## Intro

Storybook can be used to add documentation, READMEs and explore components.

This section will give examples on how to add docs, how to add knobs and how to integrate Redux components that require a store.

## Basics

Below is a basic example of creating a React component story for Storybook. More complex examples are in the following sections. Best practise for a component is to add `[componentName].storybook.js` to the component folder.

```javascript
import React from 'react';
import { storiesOf } from '@storybook/react';

const Component = () => <h1>Hello world!</h1>;

const story = () =>
    storiesOf('Using Storybook').add('Intro Component', <Component />);

export default story;
```

## Importing it into the storybook

Head to `/stories/index.js` and import the file. An example below.

```
import Storybook from 'path/to/[componentName].storybook.js';
Storybook();
```

## Styles

Note: If projects overwrite basics like typography etc, it will override the base Storybook styling as well.
