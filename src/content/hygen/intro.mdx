---
name: Intro
menu: Hygen 
---
# Intro to Hygen

Hygen is a really great template engine that allows us to harness the power of multiple JS libraries and use them to make our lives easier.

## Links

*   [Hygen.io site](http://hygen.io/)

## Setup

First, ensure that you install Hygen.

```
npm i -g hygen
```

Hygen then uses the `_templates` folder on direction for what to create.

The `_templates` folder may have a structure like so:

```javascript
_templates
└── react
    ├── component
    │   ├── mocha.ejs.t
    │   ├── prompt.js
    │   ├── puppeteer.ejs.t
    │   ├── readme.ejs.t
    │   ├── story.ejs.t
    │   ├── styles.ejs.t
    │   └── view.ejs.t
    ├── component-promptless
    │   ├── mocha.ejs.t
    │   ├── puppeteer.ejs.t
    │   ├── readme.ejs.t
    │   ├── story.ejs.t
    │   ├── styles.ejs.t
    │   └── view.ejs.t
    ├── multi-component
    │   ├── container.ejs.t
    │   ├── default.ejs.t
    │   ├── docs.ejs.t
    │   ├── mocha.ejs.t
    │   ├── prompt.js
    │   ├── puppeteer.ejs.t
    │   ├── readme.ejs.t
    │   ├── typeOne.ejs.t
    │   ├── typeTwo.ejs.t
    │   └── view.ejs.t
    ├── reducer
    │   ├── prompt.js
    │   └── reducer.ejs.t
    └── redux-component
        ├── container.ejs.t
        ├── mocha.ejs.t
        ├── prompt.js
        ├── puppeteer.ejs.t
        ├── readme.ejs.t
        ├── story.ejs.t
        └── view.ejs.t
```

How this works in practise is that you can invoke the following calls and Hygen will generate those files according to the rules:

```javascript
# Examples

# Generate the files from react > components
hygen react component
# Generate the files from react > reducer
hygen react reducer
```

Hygen can work using a prompt or without one. I recommend going with, and using `prompt.js` to set the questions.

For an example from start to finish, I will demonstate using `hygen react component`.

## > hygen react component

Running the command will first look for a `prompt.js` file.

```javascript
module.exports = [
    {
        type: 'input',
        name: 'name',
        message: "What's the name?"
    },
    {
        type: 'input',
        name: 'message',
        message: "What's the message?"
    }
];
```

Hygen uses Inquirer (which in turn uses RxJS) to create prompts. In this example, answering `name` and `message` will in turn create variables that are used thorugh the `[file].ejs.t` files.

Hygen will then go through the rest of the files and export them to where is defined at the top of the `[file].ejs.t` file. For example, `mocha.ejs.t` will have:

```javascript
---
to: src/components/<%= name %>/<%= name %>.mocha.js
---
```

If we enter name `PageTestNewFiles`, it will output file `src/components/PageTestNewFiles/PageTestNewFiles.mocha.js`. This will continue for all the files, and so in `src/components/PageTestNewFiles` we will end up with the following:

```Javascript
PageTestNewFiles
├── PageTestNewFiles.mocha.js
├── PageTestNewFiles.puppeteer.js
├── PageTestNewFiles.storybook.js
├── README.md
├── index.js
└── styles.scss
```

Where `<%= name %>` and `<%= message %>` is found throughout those files will be in turn replaced with the entered values.

If there are any issues with the Hygen generated files, go to the template file and change the templates to resolve any issues.
