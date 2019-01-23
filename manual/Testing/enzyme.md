---
name: Enzyme
menu: Testing 
---
---
Author: Dennis O'Keeffe
Section: Testing
---

# Enzyme

## Resources

- [Mocha Website](https://mochajs.org/)
- [Chai API](http://www.chaijs.com/api/)
- [Enzyme API](http://airbnb.io/enzyme/docs/api/)
- [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

## Usage

When testing React components for our expected UI, we use AirBnb's Enzyme library on top:

```javascript
// Assuming component maybe the following:
// <PageHome>
//      <SectionOne />
//      <SectionTwo />
// <PageHome />
const wrapper = Enzyme.shallow(<PageHome />);

describe(chalk.magenta('PageHome Enzyme tests'), () => {
  it('PageHome child React component SectionHome to exist', () => {
    expect(wrapper.find('SectionOne').exists()).to.equal(true); // evaluates to true
  });
});
```

In more advanced use, this can become incredibly useful for ensuring that a number of elements renders correctly from default JSON data or an external resource.
