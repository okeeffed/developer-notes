---
name: User Auth TH
menu: Java Script 
---
USER AUTHENTICATION WITH EXPRESS AND MONGO

/////////////////////////////////////////////////////////

PART 1

/****************************
*							*
	  1. The Project
*							*
****************************/

Setting up credentials to do what you say you want to do

Authentication vs Authorization

Authentication: Confirming the user is who they say they are
Authorization: Where you are and aren't allow to see certain information

Steps:

- Create an account
- Checks if it matches a record in the database

While the user is logged in, they can alter the page depending on the user infomation.

Sessions can be used for a db to have "unique token" which sticks with you and your device until the end of the session.

//////////////

The project uses Express and MongoDB

/****************************
*							*
  2. Setting up the Project
*							*
****************************/

npm install body-parser			// parsing incoming requests
npm install express
npm install pug					// used for jade

/////////////////////////////////////////////////////////

PART 2

/****************************
*							*
  	  3. Registration
*							*
****************************/

// adding routes for registration form

router.get('/register', function (req, res, next) {
	return res.send('Register today!');
});

router.post('/register', function (req, res, next) {
	return res.send('User Created!');
});

/****************************
*							*
	4. Nodemon / Pug files
*							*
****************************/

- Starts the app and refreshes each .js save
- Wrapper for node

PUG FORM - register.pug 

extends layout

block content
	.main.container.row
		.col-md-6.col-md-offset-3
			h1.display-4.m-b-2 Sign Up

			//register form
			form(method='POST' action='/register')
			div.form-group
				label(for='name') Name:
				input#name.form-control(type='text', placeholder='first and last' name='name')
			div.form-group
				label(for='email') Email:
				input#email.form-control(type='email', placeholder='name@email.com' name='email')
			div.form-group
				label(for='favoriteBook') Favorite Book:
				input#favoriteBook.form-control(type='text', placeholder='title of book' name='favoriteBook')
			div.form-group
				label(for='pw') Password:
				input#pw.form-control(type='password' name='password')
			div.form-group
				label(for='pw2') Confirm Password:
				input#pw2.form-control(type='password' name='confirmPassword')
			button.btn.btn-primary(type='submit') Sign up


/****************************
*							*
    5. Setting up MongoDB
*							*
****************************/

- Mongoose is the most used for Express applications

npm install --save mongoose

// in the app.js

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/bookworm");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); 

// running mongo

mongod

/****************************
*							*
 	6. Defining the Mongo 
 			Schema
*							*
****************************/

Store: name, email, password etc.

in models, created user.js

// user.js

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

/****************************
*							*
 	7. Adding the Data
*							*
****************************/

// in app.js

var User = require('../models/user');

...

router.post('/register', function(req,res,next) {
	if (req.body.email &&
		req.body.name &&
		req.body.favoriteBook &&
		req.body.password &&
		req.body.confirmPassword) {

		if (req.body.password !== req.body.confirmPassword) {
			var err = new Error('Passwords do not match.');
			err.status = 400;
			return next(err);
		}

		// create object with form input

		var userData = {
			email: req.body.email
			name: req.body.name
			favouriteBook: req.body.favouriteBook,
			password: req.body.password
		};

		// use schema's create method to insert document
		User.create(userData, function (error, user) {
			if (error) {
				return next(error);
			} else {
				return res.redirect('/profile');
			}
		});

	} else {
		var err = new Error('All fields required');
		err.status = 400;
		return next(err);
	}
});

/****************************
*							*
 	8. Hashing and Salting
*							*
****************************/

npm install bcrypt --save

// in use 

// in User.js

var bcrypt = require('bcrypt');

// MONGOOSE PRESAVE HOOK
UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	})
});

/////////////////////////////////////////////////////////

PART 3: Sessions and Cookies

/****************************
*							*
		9. User Login 
	   Functionalities
	 + Sessions & Cookies
*							*
****************************/

- http stateless protocol for cookies and sessions

Http is a stateless protocol itself
- server doesn't keep track of when a user changes pages
- need to create a session id - usually set time too
- need session ID and user ID
- cookies is a key/value pair that a server wants to create
- we will create a cookie with a session ID

npm install express-session --save

// in app.js

var session = require('express-session');

// use sessions for tracking logins - check more in the readme
app.use(session({
	secret: 'treehouse loves you',
	resave: true,
	saveUninitialized: false
}));

- not useful when in production. check https://github.com/expressjs/session#compatible-session-stores
- secret is used to sign a cookie, to ensure that only the application created the cookie.

/**************************
*						  *
	10. Adding login 
		to routes
*						  *
**************************/

// in app.js

router.get('/login', function(req, res, next) {
	return res.render('login', { title: 'Log In' });
});

router.post('/login', function(req, res, next) {
	return res.send('Logged in!');
});

/**************************
*						  *
	11. Pug login form
*						  *
**************************/

// pug login form!

// views/login.pug

extends layout

block content
  .main.container
    .row
      .col-md-6.col-md-offset-3
        h1.display-4.m-b-2 Log In
        form(method='POST' action='/login')
          div.form-group
            label(for='email') Email
            input.form-control(type='text' id='email' placeholder='email' name='email')
          div.form-group
            label(for='password') Password
            input.form-control(type='password' id='password' placeholder='password' name='password')
          button.btn.btn-primary(type='submit') Log in

/**************************
*						  *
   12. Auth the Username
	   and Password
*						  *
**************************/

// Example in app.js for Express

router.post('/login', function(req, res, next) {
	if (req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function (error, user) {
			if (error || !user) {
				var err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				return res.redirect('/profile');
			}
		});
	} else {
		var err = new Error('Email and password are required.');
		err.status = 401;
		return next(err);
	}
});

// in user.js

UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({ email: email })
		.exec(function (error, user) {
			if (error) {
				return callback(error);
			} else if (!user) {
				var err = new Error('User not found.');
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function (error, result) {
				if (result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			});
		});
}

/************************
*						*
   13. Profile Route
   		and Page
*						*
************************/

profile.pug

extends layout

block content
  .main.container.clearfix
    .row
      .col-md-8.col-md-offset-2
        h1.display-4
          img.avatar.img-circle.hidden-xs-down(src='/images/avatar.png', alt='avatar')
          | #{name}
        h2.favorite-book Favorite Book
        | #{favorite}

// GET /profile

router.get('/profile', function(req, res, next) {
  if (! req.session.userId ) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook });
        }
      });
});

/////////////////////////////////////////////////////////

PART 4

/****************************
*							*
	  14. Using Session
  Vars to Customize Content
*							*
****************************/

To make user id global

// in app.js

// make user id available to templates
app.use(function (req,res,next) {
	res.locals.currentUser = req.session.userId;
	next();
});

For the new logout route

router.get('/logout', function (req, res, next) {
	if (req.session) {
		req.session.destroy(function(err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});	
	}
});

/****************************
*							*
	  15. Understanding
	     Middleware
*							*
****************************/

- between requests and responses 

app.use //middleware

//session middleware
app.use(session({
	secret: 'treehouse loves you',
	resave: true,
	saveUninitialized: false
}));

Request/Response Cycle

app.use(function (req,res,next) {
	...
	next(); //custom middleware ALWAYS needs call to next
});



// CUSTOM MIDDLEWARE

create middleware folder
> index.js

function loggedOut(req, res, next) {
	if (req.session && req.session.userId) {
		return res.redirect('profile');
	}
	return next();
}

module.exports.loggedOut = loggedOut;

var mid = require('../middleware');

- now we can reference the function by mid.loggedOut

Now, in the routes we want to double check... we can put the func in.

eg.
router.get('/register', mid.loggedOut, function(req, res, next) {
	return res.render('register', { title: 'Sign up' });
});

> index.js

function requiresLogin(req, res, next) {
	if (req.session && req.session.userId) {
		next();
	} else {
		var err = new Error('You do not have permission to see this.');
		err.status = 401;
		return next(err);
	}
}

module.exports.requiresLogin = requiresLogin;

/****************************
*							*
	  16. Using MongoDB
	 as a Session Store
*							*
****************************/

connect-mongo is a middleware already written for us!

npm install connect-mongo --save

require MongoStore = require('connect-mongo')(session);

// in app.js

app.use(session({
	secret: 'treehouse loves you',
	resave: true,
	saveUninitialized: false
	store: new MongoStore({
		mongooseConnection: db 
	})
}));



