---
name: Puppeteer
menu: Testing 
---
---
Author: Dennis O'Keeffe
Section: Testing
---

# Puppeteer

## Resources

- [Mocha Website](https://mochajs.org/)
- [Chai API](http://www.chaijs.com/api/)
- [Enzyme API](http://airbnb.io/enzyme/docs/api/)
- [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

## Usage

To test the UI itself, we can use Puppeteer, Chrome's Headless Browser to evaluate on the UI itself. Puppeteer can also be set to have `headless: false`, allowing the user to record or watch the test on their screen.

```javascript
const puppeteer = require('puppeteer');

// Test suite
describe('PageHome functionality', () => {
  // Test suite within another test suite - useful for subsectioning tests within a component/page
  describe('Simple Puppeteer UI test for form elements', () => {
    it('firstName and lastName from Puppeteer deep equal expected schema', async () => {
      const expected = {
        firstName: 'Hello',
        lastName: 'World'
      };

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('http://localhost:3000');
      await page.screenshot({ path: 'example.png' }); // create an example screenshot of current UI state
      await page.type('input[name="firstName"]', 'Hello');
      const firstName = await page.$eval(
        'input[name="firstName"]',
        (el) => el.value
      );

      await page.waitFor(500);
      await page.click('#next');
      await page.waitForSelector('input[name="lastName"]');
      await page.type('input[name="lastName"]', 'World');
      const lastName = await page.$eval(
        'input[name="lastName"]',
        (el) => el.value
      );

      await page.waitFor(500);
      const formData = {
        firstName: firstName,
        lastName: lastName
      };

      await browser.close();

      expect(formData).to.deep.equal(expected); // evauates to true if form fields hold correct value
    });
  });
});
```

## Logging

```
// output logs
page.on('console', msg => console.log('PAGE LOG:', msg.text()));

// show devtools
const browser = await puppeteer.launch({devtools: true});
```
