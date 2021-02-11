(window.webpackJsonp=window.webpackJsonp||[]).push([[361],{IBt8:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return o})),n.d(t,"default",(function(){return p}));n("1c7q"),n("abGl"),n("gZHo"),n("Fdmb"),n("Ir+3"),n("2mQt"),n("mXGw");var r=n("/FXl"),a=n("TjRS");n("aD51");function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"manual/JavaScript/User-Auth-TH.md"}});var s={_frontmatter:o},l=a.a;function p(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,r,a={},b=Object.keys(e);for(r=0;r<b.length;r++)n=b[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["components"]);return Object(r.b)(l,b({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"USER AUTHENTICATION WITH EXPRESS AND MONGO"),Object(r.b)("p",null,"/////////////////////////////////////////////////////////"),Object(r.b)("p",null,"PART 1"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",{parentName:"li"},Object(r.b)("li",{parentName:"ol"},"The Project"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"Setting up credentials to do what you say you want to do"),Object(r.b)("p",null,"Authentication vs Authorization"),Object(r.b)("p",null,"Authentication: Confirming the user is who they say they are\nAuthorization: Where you are and aren't allow to see certain information"),Object(r.b)("p",null,"Steps:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Create an account"),Object(r.b)("li",{parentName:"ul"},"Checks if it matches a record in the database")),Object(r.b)("p",null,"While the user is logged in, they can alter the page depending on the user infomation."),Object(r.b)("p",null,'Sessions can be used for a db to have "unique token" which sticks with you and your device until the end of the session.'),Object(r.b)("p",null,"//////////////"),Object(r.b)("p",null,"The project uses Express and MongoDB"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")))),Object(r.b)("ol",{start:2},Object(r.b)("li",{parentName:"ol"},"Setting up the Project")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"npm install body-parser\t\t\t// parsing incoming requests\nnpm install express\nnpm install pug\t\t\t\t\t// used for jade"),Object(r.b)("p",null,"/////////////////////////////////////////////////////////"),Object(r.b)("p",null,"PART 2"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:3}),Object(r.b)("li",{parentName:"ol"},"Registration"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"// adding routes for registration form"),Object(r.b)("p",null,"router.get('/register', function (req, res, next) {\nreturn res.send('Register today!');\n});"),Object(r.b)("p",null,"router.post('/register', function (req, res, next) {\nreturn res.send('User Created!');\n});"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:4}),Object(r.b)("li",{parentName:"ol"},"Nodemon / Pug files"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Starts the app and refreshes each .js save"),Object(r.b)("li",{parentName:"ul"},"Wrapper for node")),Object(r.b)("p",null,"PUG FORM - register.pug "),Object(r.b)("p",null,"extends layout"),Object(r.b)("p",null,"block content\n.main.container.row\n.col-md-6.col-md-offset-3\nh1.display-4.m-b-2 Sign Up"),Object(r.b)("pre",null,Object(r.b)("code",b({parentName:"pre"},{}),"        //register form\n        form(method='POST' action='/register')\n        div.form-group\n            label(for='name') Name:\n            input#name.form-control(type='text', placeholder='first and last' name='name')\n        div.form-group\n            label(for='email') Email:\n            input#email.form-control(type='email', placeholder='name@email.com' name='email')\n        div.form-group\n            label(for='favoriteBook') Favorite Book:\n            input#favoriteBook.form-control(type='text', placeholder='title of book' name='favoriteBook')\n        div.form-group\n            label(for='pw') Password:\n            input#pw.form-control(type='password' name='password')\n        div.form-group\n            label(for='pw2') Confirm Password:\n            input#pw2.form-control(type='password' name='confirmPassword')\n        button.btn.btn-primary(type='submit') Sign up\n")),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:5}),Object(r.b)("li",{parentName:"ol"},"Setting up MongoDB"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Mongoose is the most used for Express applications")),Object(r.b)("p",null,"npm install --save mongoose"),Object(r.b)("p",null,"// in the app.js"),Object(r.b)("p",null,"var mongoose = require('mongoose');"),Object(r.b)("p",null,'mongoose.connect("mongodb://localhost:27017/bookworm");'),Object(r.b)("p",null,"var db = mongoose.connection;"),Object(r.b)("p",null,"db.on('error', console.error.bind(console, 'connection error:')); "),Object(r.b)("p",null,"// running mongo"),Object(r.b)("p",null,"mongod"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:6}),Object(r.b)("li",{parentName:"ol"},"Defining the Mongo\nSchema"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"Store: name, email, password etc."),Object(r.b)("p",null,"in models, created user.js"),Object(r.b)("p",null,"// user.js"),Object(r.b)("p",null,"var mongoose = require('mongoose');"),Object(r.b)("p",null,"var UserSchema = new mongoose.Schema({\nemail: {\ntype: String,\nrequired: true,\ntrim: true,\nunique: true,\n},\nname: {\ntype: String,\nrequired: true,\ntrim: true,\n},\nfavoriteBook: {\ntype: String,\nrequired: true,\ntrim: true\n},\npassword: {\ntype: String,\nrequired: true\n}\n});"),Object(r.b)("p",null,"var User = mongoose.model('User', UserSchema);\nmodule.exports = User;"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:7}),Object(r.b)("li",{parentName:"ol"},"Adding the Data"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"// in app.js"),Object(r.b)("p",null,"var User = require('../models/user');"),Object(r.b)("p",null,"..."),Object(r.b)("p",null,"router.post('/register', function(req,res,next) {\nif (req.body.email &&\nreq.body.name &&\nreq.body.favoriteBook &&\nreq.body.password &&\nreq.body.confirmPassword) {"),Object(r.b)("pre",null,Object(r.b)("code",b({parentName:"pre"},{}),"    if (req.body.password !== req.body.confirmPassword) {\n        var err = new Error('Passwords do not match.');\n        err.status = 400;\n        return next(err);\n    }\n\n    // create object with form input\n\n    var userData = {\n        email: req.body.email\n        name: req.body.name\n        favouriteBook: req.body.favouriteBook,\n        password: req.body.password\n    };\n\n    // use schema's create method to insert document\n    User.create(userData, function (error, user) {\n        if (error) {\n            return next(error);\n        } else {\n            return res.redirect('/profile');\n        }\n    });\n\n} else {\n    var err = new Error('All fields required');\n    err.status = 400;\n    return next(err);\n}\n")),Object(r.b)("p",null,"});"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:8}),Object(r.b)("li",{parentName:"ol"},"Hashing and Salting"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"npm install bcrypt --save"),Object(r.b)("p",null,"// in use "),Object(r.b)("p",null,"// in User.js"),Object(r.b)("p",null,"var bcrypt = require('bcrypt');"),Object(r.b)("p",null,"// MONGOOSE PRESAVE HOOK\nUserSchema.pre('save', function(next) {\nvar user = this;\nbcrypt.hash(user.password, 10, function(err, hash) {\nif (err) {\nreturn next(err);\n}\nuser.password = hash;\nnext();\n})\n});"),Object(r.b)("p",null,"/////////////////////////////////////////////////////////"),Object(r.b)("p",null,"PART 3: Sessions and Cookies"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n9. User Login \n")),"   Functionalities",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Sessions & Cookies"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"http stateless protocol for cookies and sessions")),Object(r.b)("p",null,"Http is a stateless protocol itself"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"server doesn't keep track of when a user changes pages"),Object(r.b)("li",{parentName:"ul"},"need to create a session id - usually set time too"),Object(r.b)("li",{parentName:"ul"},"need session ID and user ID"),Object(r.b)("li",{parentName:"ul"},"cookies is a key/value pair that a server wants to create"),Object(r.b)("li",{parentName:"ul"},"we will create a cookie with a session ID")),Object(r.b)("p",null,"npm install express-session --save"),Object(r.b)("p",null,"// in app.js"),Object(r.b)("p",null,"var session = require('express-session');"),Object(r.b)("p",null,"// use sessions for tracking logins - check more in the readme\napp.use(session({\nsecret: 'treehouse loves you',\nresave: true,\nsaveUninitialized: false\n}));"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"not useful when in production. check ",Object(r.b)("a",b({parentName:"li"},{href:"https://github.com/expressjs/session#compatible-session-stores"}),"https://github.com/expressjs/session#compatible-session-stores")),Object(r.b)("li",{parentName:"ul"},"secret is used to sign a cookie, to ensure that only the application created the cookie.")),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"**"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                  *\n")),Object(r.b)("ol",b({parentName:"li"},{start:10}),Object(r.b)("li",{parentName:"ol"},"Adding login\nto routes"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                  *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"**")))))),"/")),Object(r.b)("p",null,"// in app.js"),Object(r.b)("p",null,"router.get('/login', function(req, res, next) {\nreturn res.render('login', { title: 'Log In' });\n});"),Object(r.b)("p",null,"router.post('/login', function(req, res, next) {\nreturn res.send('Logged in!');\n});"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"**"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                  *\n")),Object(r.b)("ol",b({parentName:"li"},{start:11}),Object(r.b)("li",{parentName:"ol"},"Pug login form"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                  *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"**")))))),"/")),Object(r.b)("p",null,"// pug login form!"),Object(r.b)("p",null,"// views/login.pug"),Object(r.b)("p",null,"extends layout"),Object(r.b)("p",null,"block content\n.main.container\n.row\n.col-md-6.col-md-offset-3\nh1.display-4.m-b-2 Log In\nform(method='POST' action='/login')\ndiv.form-group\nlabel(for='email') Email\ninput.form-control(type='text' id='email' placeholder='email' name='email')\ndiv.form-group\nlabel(for='password') Password\ninput.form-control(type='password' id='password' placeholder='password' name='password')\nbutton.btn.btn-primary(type='submit') Log in"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"**"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                  *\n")))),Object(r.b)("ol",{start:12},Object(r.b)("li",{parentName:"ol"},"Auth the Username\nand Password")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                  *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"**")))))),"/")),Object(r.b)("p",null,"// Example in app.js for Express"),Object(r.b)("p",null,"router.post('/login', function(req, res, next) {\nif (req.body.email && req.body.password) {\nUser.authenticate(req.body.email, req.body.password, function (error, user) {\nif (error || !user) {\nvar err = new Error('Wrong email or password.');\nerr.status = 401;\nreturn next(err);\n} else {\nreq.session.userId = user._id;\nreturn res.redirect('/profile');\n}\n});\n} else {\nvar err = new Error('Email and password are required.');\nerr.status = 401;\nreturn next(err);\n}\n});"),Object(r.b)("p",null,"// in user.js"),Object(r.b)("p",null,"UserSchema.statics.authenticate = function(email, password, callback) {\nUser.findOne({ email: email })\n.exec(function (error, user) {\nif (error) {\nreturn callback(error);\n} else if (!user) {\nvar err = new Error('User not found.');\nerr.status = 401;\nreturn callback(err);\n}\nbcrypt.compare(password, user.password, function (error, result) {\nif (result === true) {\nreturn callback(null, user);\n} else {\nreturn callback();\n}\n});\n});\n}"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                *\n")))),Object(r.b)("ol",{start:13},Object(r.b)("li",{parentName:"ol"},"Profile Route\nand Page")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))),"/")),Object(r.b)("p",null,"profile.pug"),Object(r.b)("p",null,"extends layout"),Object(r.b)("p",null,"block content\n.main.container.clearfix\n.row\n.col-md-8.col-md-offset-2\nh1.display-4\nimg.avatar.img-circle.hidden-xs-down(src='/images/avatar.png', alt='avatar')\n| #{name}\nh2.favorite-book Favorite Book\n| #{favorite}"),Object(r.b)("p",null,"// GET /profile"),Object(r.b)("p",null,"router.get('/profile', function(req, res, next) {\nif (! req.session.userId ) {\nvar err = new Error(\"You are not authorized to view this page.\");\nerr.status = 403;\nreturn next(err);\n}\nUser.findById(req.session.userId)\n.exec(function (error, user) {\nif (error) {\nreturn next(error);\n} else {\nreturn res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook });\n}\n});\n});"),Object(r.b)("p",null,"/////////////////////////////////////////////////////////"),Object(r.b)("p",null,"PART 4"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n      14. Using Session\n")),"Vars to Customize Content"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"To make user id global"),Object(r.b)("p",null,"// in app.js"),Object(r.b)("p",null,"// make user id available to templates\napp.use(function (req,res,next) {\nres.locals.currentUser = req.session.userId;\nnext();\n});"),Object(r.b)("p",null,"For the new logout route"),Object(r.b)("p",null,"router.get('/logout', function (req, res, next) {\nif (req.session) {\nreq.session.destroy(function(err) {\nif (err) {\nreturn next(err);\n} else {\nreturn res.redirect('/');\n}\n});\n}\n});"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:15}),Object(r.b)("li",{parentName:"ol"},"Understanding\nMiddleware"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"between requests and responses ")),Object(r.b)("p",null,"app.use //middleware"),Object(r.b)("p",null,"//session middleware\napp.use(session({\nsecret: 'treehouse loves you',\nresave: true,\nsaveUninitialized: false\n}));"),Object(r.b)("p",null,"Request/Response Cycle"),Object(r.b)("p",null,"app.use(function (req,res,next) {\n...\nnext(); //custom middleware ALWAYS needs call to next\n});"),Object(r.b)("p",null,"// CUSTOM MIDDLEWARE"),Object(r.b)("p",null,"create middleware folder"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"index.js")),Object(r.b)("p",null,"function loggedOut(req, res, next) {\nif (req.session && req.session.userId) {\nreturn res.redirect('profile');\n}\nreturn next();\n}"),Object(r.b)("p",null,"module.exports.loggedOut = loggedOut;"),Object(r.b)("p",null,"var mid = require('../middleware');"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"now we can reference the function by mid.loggedOut")),Object(r.b)("p",null,"Now, in the routes we want to double check... we can put the func in."),Object(r.b)("p",null,"eg.\nrouter.get('/register', mid.loggedOut, function(req, res, next) {\nreturn res.render('register', { title: 'Sign up' });\n});"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"index.js")),Object(r.b)("p",null,"function requiresLogin(req, res, next) {\nif (req.session && req.session.userId) {\nnext();\n} else {\nvar err = new Error('You do not have permission to see this.');\nerr.status = 401;\nreturn next(err);\n}\n}"),Object(r.b)("p",null,"module.exports.requiresLogin = requiresLogin;"),Object(r.b)("p",null,"/",Object(r.b)("strong",{parentName:"p"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****"))))))),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("ol",b({parentName:"li"},{start:16}),Object(r.b)("li",{parentName:"ol"},"Using MongoDB\nas a Session Store"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",b({parentName:"pre"},{}),"                    *\n")),Object(r.b)("strong",{parentName:"li"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},Object(r.b)("strong",{parentName:"strong"},"****")))))),"/")),Object(r.b)("p",null,"connect-mongo is a middleware already written for us!"),Object(r.b)("p",null,"npm install connect-mongo --save"),Object(r.b)("p",null,"require MongoStore = require('connect-mongo')(session);"),Object(r.b)("p",null,"// in app.js"),Object(r.b)("p",null,"app.use(session({\nsecret: 'treehouse loves you',\nresave: true,\nsaveUninitialized: false\nstore: new MongoStore({\nmongooseConnection: db\n})\n}));"))}p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"manual/JavaScript/User-Auth-TH.md"}}),p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---manual-java-script-user-auth-th-md-7e2a6351619f8dbe5907.js.map