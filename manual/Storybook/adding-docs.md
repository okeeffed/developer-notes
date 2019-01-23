---
name: Adding Docs
menu: Storybook 
---
---
Author: Dennis O'Keeffe
Section: Storybook
---

# Adding docs

The storybook add on for READMEs and docs is incredibly useful and is powering this Storybook.

## Example of just showing documentation

```javascript
import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';

import StorybookIntro from './intro.md';
import StorybookDocs from './adding-docs.md';
import StorybookKnobs from './adding-knobs.md';
import StorybookRedux from './integrating-redux.md';

const story = () =>
    storiesOf('Using Storybook')
        .add('Intro', doc(StorybookIntro))
        .add('Adding Docs', doc(StorybookDocs))
        .add('Adding Knobs', doc(StorybookKnobs))
        .add('Integrating Redux', doc(StorybookRedux));

export default story;
```
