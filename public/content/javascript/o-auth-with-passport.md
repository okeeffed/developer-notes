---
name: O Auth With Passport
menu: Java Script 
---
OAUTH AND PASSPORT FOR EXPRESS

/////////////////////////////////////////////////////////

/****************************
*							*
	  1. What is OAuth?
*							*
****************************/

It is authorization, not authentication.

Authorization is used for what you can do.

You usually get tokens...
- Access Token
- Refresh Token

/****************************
*							*
	2. Setting up Passport
*							*
****************************/

// THE SETUP STRATERGY

1. Install Strategy
2. Create 'Application' on OAuth Provider
3. Configure Strategy
4. Create routes for the provider

// installing Github auth

npm install passport-github --save

- from here you can register the application on Github in settings
- grab tokens

|||||||||||||||||||||||||||||||||||||||||||||

npm install passport --save
npm install express-session --save

We'll use persistent session store with mongoDB to keep the login persistent

// in app.js

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

function generateOrFindUser (accessToken, refreshToken, profile, done) {
	User.findOneAndUpdate({
		email: profile.emails[0].value
	}, {
		name: profile.displayName || profile.username,
		email: profile.emails[0].value,
		photo: profile.photos[0].value
	}, {
		upsert: true
	}, 
	done);
	} else {
		var noEmailError = new Error("Your email privacy settings prevent you from signing into bookworm!");
		done(noEmailError, null);
	}
}

// config the strategy
passport.use(new GitHubStrategy({
	// do not enter your actual ID and Key here!
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:3000/auth/github/return"
	}, generateOrFindUser));

passport.use(new FacebookStrategy({
	// do not enter your actual ID and Key here!
	clientID: process.env.FACEBOOK_APP_ID,
	clientSecret: process.env.FACEBOOK_APP_SECRET,
	callbackURL: "http://localhost:3000/auth/facebook/return",
	profileFields: ['id', 'displayName', 'photos', 'email']
}), generateOrFindUser);


passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
	User.findById(userId, done); // done is a callback function
});

...

var auth = require('./routes/auth');

...


// after db connection
// Session config for Passport and MongoDB

var sessionOptions = {
	secret: "this is a super secret dadada",
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: db
	})
}

app.use(session(sessionOptions));

// Init Passport
app.use(passport.initialize());

// Restore Session
app.use(passport.session());

app.use('/auth', auth);

// in routes > auth.js

var express = require('express');
var router = express.Router();
var passport = require('passport');

// Get /auth/login/github

router.get('/login/github',
	passport.authenticate('github'));

// Get /auth/github/return

router.get('/github/return',
	passport.authenticate('github', {failedRedirect: '/'}),
	function(req, res) {
		//Succes Auth, redirect to page for now
		res.redirect('/profile');
	});

// Get /auth/login/facebook

router.get('/login/facebook',
	passport.authenticate('facebook', { scope: ["email"]}));

// Get /auth/facebook/return

router.get('/facebook/return',
	passport.authenticate('facebook', {failedRedirect: '/'}),
	function(req, res) {
		//Succes Auth, redirect to page for now
		res.redirect('/profile');
	});

// GET /auth/logout

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
})

module.exports = router;

// to use vars in command line...

> GITHUB_CLIENT_ID=123432 GITHUB_CLIENT_SECRET=892u3rw9u ./bin/www











