---
name: Integrating Redux
menu: Storybook 
---
---
Author: Dennis O'Keeffe
Section: Storybook
---

# Integrating Redux with Storybook

Ensure that if you wish to use the same `store` variable as within the app that you export it as a constant from the appropriate file. See `import { store } from 'src/App';` below.

```javascript
import React from 'react';

// Basic addons
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// README addons
import { withReadme, withDocs } from 'storybook-readme';
import PageFormTestReadme from './README.md';
import PageFormTestDocs from './DOCS.md';

// Knob addons
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

// Backgrounds
import backgrounds from '@storybook/addon-backgrounds';
import PageFormTest from './index.js';

import { store } from 'src/App';
import { Provider } from 'react-redux';

const story = () =>
    storiesOf('Page Form Test')
        // This is the main decorator to take note of
        .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
        .addDecorator(withReadme(PageFormTestReadme))
        .addDecorator(withKnobs)
        .addDecorator(
            backgrounds([
                { name: 'white', value: '#ffffff', default: true },
                { name: 'twitter', value: '#00aced' },
                { name: 'facebook', value: '#3b5998' }
            ])
        )
        .add('Default', () => {
            return <PageFormTest store={store} />;
        })
        .add(
            'Docs',
            withDocs(PageFormTestDocs, () => {
                return (
                    <WithComments el={'PageFormTest'}>
                        <PageFormTest />
                    </WithComments>
                );
            })
        );

export default story;
```
