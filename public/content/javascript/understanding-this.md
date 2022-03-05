---
name: Understanding This
menu: Java Script 
---
/******************************************/
	
	Understanding "this" in JavaScript

/******************************************/

4 ways that "this" takes a value:

1. In normal function calls
2. Within methods on objects
3. Within an object that has been constructed
4. A function invoked with .call, .apply, or bind

/****************/
	First way
/****************/

function helloWorld() {
	console.log("Hello world!");	
};

//"this"in a browser, it's the window
// bit different in node.js

/****************/
	Second way
/****************/

//this is done using Node

var Portland = {
	bridges: 12,
	airport: 1,
	soccerTeams: 1,
	logNumberOfBridges: function() {
		console.log("There are " + this.bridges + " bridges in Portland!")
	},
	logTeams: function() {
		console.log(this.soccerTeams);
	}
}

//another way of logteams using this
function logTeams() {
		console.log(this.soccerTeams);
		//if the word was just this, it would print all node info
}

Portland.foo = logTeams;

Portland.logNumberOfBridges();
Portland.logTeams();
Portland.foo();
logTeams(); //comes back as undefined

/****************/
	Third way
/****************/

var City = function(name, state) {
	this.name = name || 'Portland';
	this.state = state || 'Oregon';
	this.printMyCityAndState = function() {
		console.log("My city is " + this.name + ", and my state is " + this.state);
	};
};

portland = new City();
seattle = new City('Seattle', 'Washington');

console.log(portland);
console.log(seattle);

portland.printMyCityAndState();
seattle.printMyCityAndState();

- Note: Corresponds to the instance value itself















