---
name: JS Unit Testing TH
menu: Java Script 
---
JS UNIT TESTING

/////////////////////////////////////////////////////////

PART 1: JS Unit Testing

/****************************
*							*
  	  1. Intro to Mocha
*							*
****************************/

Test suite
1. In Mocha, relates to a group of related tests!
2. Test suite def is context specific.

// in the console

> mocha <test_name.js>

For debugging... creating a test folder. For the example used:

test > utilities_spec.js 			// this relates to the utilities.js file

Mocha makes: 
1. Testing output easy to read
2. Helps return the results in an informative way 
3. Test files are separated from the real code
4. Guarantees code works as expected
5. Instantly see if anything has broken when making changes

/****************************
*							*
   2. Different Types of
  		  Testing
*							*
****************************/

Unit Tests: 
Writing tests that confirm an individual function or piece of code as working how we want it to.
Unit tests are like drills.

Integration Testing:
Used to test new code added to pre-existing code and that they run correctly together without breaking.

End-To-End Testing:
Running the application from start to finish to test everything that we can.
Maybe only a few times run in a product cycle.

/****************************
*							*
   3. Behaviour Driven Dev
*							*
****************************/

BDD is an approach to building software.
- like creating a plan before writing a program
- write tests first, then code after

Refactoring:
- ticking off tests first
- refactoring to run faster later

1. Write the tests, ever though they'll fail
2. Write the easiest code to pass
3. Go back and improve the code

/****************************
*							*
   4. Red, Green, Refactor
*							*
****************************/

Testing for title case

1. Install Chai (expectation library)
- throws error is expectation is not met

npm install chai --save-dev
touch textUtilites.js

// in textUtitlies.js

var expect = require('chai').expect;

expect(true).to.be.true;

function titleCase(title) {
	return title;
}

expect(titleCase('the great mouse detective')).to.be.a('string');

/****************************
*							*
   5. Greater Expectations
*							*
****************************/

// in textUtitlies.js

var expect = require('chai').expect;

expect(true).to.be.true;

function titleCase(title) {
	var words = title.split(' ');
	var titleCasedWords = words.map(function(word) {
		return word[0].toUpperCase() + title.substring(1);
	});

	return titleCasedWords.join(' ');
}

expect(titleCase('the great mouse detective')).to.be.a('string');
expect(titleCase('a')).to.equal('A');
expect(titleCase('vertigo')).to.equal('Vertigo');
expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective');

/////////////////////////////////////////////////////////

PART 2: Getting started with Chai and Mocha

/****************************
*							*
   6. Writing Test Suites
*							*
****************************/

- using battleship as an example
- refer to the code to have a look at how the test and actual implementation look

/////////////////////////////////////////////////////////

PART 4: Going further

mocha --reporter min
mocha --reporter markdown		// for git

Check the websites.

Feel free to add it to your package.json file.

/****************************
*							*
   7. Outlining Your Test
   			Suite
*							*
****************************/

Communicating test ideas before writing it.

- pending test spec

// gametest.js

var expect = require('chai').expect;

describe('GAME INSTANCE FUNCTIONS', function(){
	describe('checkGameStatus', function() {
		it('should tell me when the game is over');	// no expectations yet. It is pending!
	});
});

Could also add an x... (in this eg, two pending)

xdescribe('GAME INSTANCE FUNCTIONS', function(){
	describe('checkGameStatus', function() {
		it('should tell me when the game is over');	// no expectations yet. It is pending!
	});
});

/****************************
*							*
   8. Watching Test Files
*							*
****************************/

How to run auto run tests:

mocha --watch ./test/game_test.js ./game_logic/game_instance.js

// in package.json > scripts

"test:watch": "mocha --watch ./test ./"

npm run test:watch

You can even add other test:watch:name scripts to watch specific things at specific times!

/****************************
*							*
     9. Mocks and Stubs
*							*
****************************/

Advanced Features

- what happens if you have many dependencies?
- testing ones other than your test spec

Writing your own functions in the beforeEach() spec.

sinon.js is also a great framework for stubbing data.








