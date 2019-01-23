---
name: Mocha And Chai
menu: Testing 
---
---
Author: Dennis O'Keeffe
Section: Testing
---

# Mocha and Chai

## Resources

*   [Mocha Website](https://mochajs.org/)
*   [Chai API](http://www.chaijs.com/api/)
*   [Enzyme API](http://airbnb.io/enzyme/docs/api/)
*   [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

## Usage

Testing is done using Mocha and Chai for evaluation and uses Enzyme for rendering out React components to evaulate state for the React app at any given time and Puppeteer to evaulate UI testing.

The app itself can be developed using both Behaviour Driven Development and Test Drive Development.

We use Mocha as the main framework to layout the test suites and test specs themselves, and to evaluate the individual test specs, we use the Chai library.

Basic example:

```javascript
// Example function to test
function add(x, y) {
    return x + y;
}

// Test suite
describe('JavaScript functionality for a file', () => {
    // Test spec
    it('expects true to be true', () => {
        expect(true).to.be.true; // evaluates to true - test passes
    });

    // Test spec
    it('expects 1 + 2 to equal 3', () => {
        const result = add(1, 2);
        expect(result).to.equal(3); // evaluates to true - test passes
    });
});
```

For best practise, when testing classes and functions which comprise of straight Javascript (no React element ie js lib subfolders, utilities and helpers), just use Mocha and Chai to evaluate an expectation.

To incorporate BDD in this scenariom you can use Mocha's `it` function to also scaffold the pending tests in advance that will result in "pass" or "fail" but be ready for when you start writing the evaluation and assertion expecations:

```javascript
// Test suite
describe('JavaScript functionality for a file', () => {
    // Test spec
    it('expects true to be true'); // Pending test - won't evaluate as a pass or fail
});
```
