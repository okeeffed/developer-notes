---
name: NPM As A Task Runner
menu: Npm
---

NPM as a Task Runner

What is a task? Something we need to do.

Common Tasks

- run test suite
- compilng Sass/TypeScript/CoffeeScript
- starting a web server
- starting a worker

npm tasks are called scripts -> add to 'scripts' in package.json

"`<name>`": "`<code>`"

then you can simply go...

npm run `<name>`!

Types of tasks:

1. Built-in

- eg tests etc
- can be run as npm test instead of npm run test

2. Arbitrary

- requires a "run"
- eg npm run compile

For getting a project ready to be deployed...

in the tests folder... test_dice.js //used in this example

mocha is used as a mocha and uglify-js to compile all js files into one.

Often encouraged to save global test scripts.

node_modules/.bin/mocha //this is an executable

Can run from npm without writing this.

Change "test": "mocha" in the scripts.

now we can go...

npm run test //don't even need run since it is built-in

//////////////////////////////////////////

Creating our own arbitrary scripts

We can use the uglify to create an app.js

Large, annoying code...
node_modules/.bin/uglifyjs src/models/\* src/frontend.js -m -c -o build/app.js

//m flag reduces some names
//c combines into single file

INSTEAD, CREATE OUR OWN TASK

"uglify": "node_modules/.bin/uglifyjs src/models/\* src/frontend.js -m -c -o build/app.js"

Now, we can just type:
npm run uglify

And TADAAAAA!

For our css etc.

"copy-files": "cp src/_.html build/ & cp src/_.css build/"

npm run copy-files

Now for a single task!

"build": "npm run copy-files && npm run uglify" //&& run sequentially, & run in parallel

npm help scripts //shows other default scripts
