---
name: MEAN Stack TH
menu: Java Script 
---
BUILDING A MEAN APPLICATION

/////////////////////////////////////////////////////////

PART 1: GETTING STARTED WITH MONGODB

/****************************
*							*
	 1. What MEAN means
*							*
****************************/

M - MongoDB
E - Express
A - Angular
N - Node.js

- data stored in MongoDB documents
- Express.js deals with the data
- Angular shows it to the user
- MEAN is widely adopted
- Powerful and flexible technologies
- Well organised and lean

THE APP

1. To do app using the MEAN stack

- MEAN.js generator -> used for scaffolding.

yo meanjs

- yo from yeoman

/****************************
*							*
	 2. Setting up an
	Express Application
*							*
****************************/

create src
npm init
- set entry point: src/app.js

Then add in Angular.

ls .git
rm .git

touch src/app.js
echo 'node_modules' >> .gitignore
git init

atom . //used for editing app.js

QUESTIONS

1. Serves the public directory when the root of the site is requested?

A: app.use('/', express.static('public'));
OR app.use(express.static('public'));

/////////////////////////////////////////////////////////

PART 2: Setting up the Express API

/****************************
*							*
   3. Setting Up an Express
			API
*							*
****************************/

GET Routes

app.get('/todos', function(req, res) {
	res.send('These are the todos');
})

var route = express.Router();

router.get('/todos', function(req, res) {
	res.json({todos:[]});
});

//these comments are examples of what was used in the Express app

// TODO: Add POST route to create new entries

// TODO: Add PUT route to update existing entries

// TODO: Add DELETE route to drop existing entries

app.use('/api', router);

/****************************
*							*
     4. Create an API
     	 Controller
*							*
****************************/

// ./api/index.js

'use strict';

var express = require('express');
var Todo = require('../models/todo');

var router = express.Router();

router.get('/todos', function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ todos: todos });
  });
});

router.post('/todos', function(req, res) {
  var todo = req.body;
  Todo.create(todo, function(err, todo) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'todo': todo, message: 'Todo Created' });
  });
});

router.put('/todos/:id', function(req, res) {
  var id = req.params.id;
  var todo = req.body;
  if (todo && todo._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'todo': todo, message: 'Todo Updated' });
  });
});

router.delete('/todos/:id', function(req, res) {
  var id = req.params.id;
  Todo.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Todo Deleted' });
  });
});

module.exports = router;

/****************************
*							*
    4. Create mock data
*							*
****************************/

- Create mock data for testing. JSON.

var todos = require('../../mock/todos.json');

- postman is the Chrome Extension.

//IN THE GET

'use strict';

var express = require('express');
var Todo = require('../models/todo');

//dummy data
var test_todos = require('../../mock/todos.json');

var router = express.Router();

router.get('/todos', function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ todos: test_todos }); //change to todos or test_todos
  });
});

/////////////////////////////////////////////////////////

PART 3: Angular Refresher

/****************************
*							*
    5. Angular Refresher
*							*
****************************/










