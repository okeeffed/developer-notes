---
name: Components
menu: Principles 
---
- [Components](#components)
  - [Web Checklist](#web-checklist)
  - [Web Testing](#web-testing)
    - [Functional Testing Template](#functional-testing-template)
    - [Regression Testing Template](#regression-testing-template)
    - [UI Testing Template](#ui-testing-template)
  - [Web Accessibility](#web-accessibility)
  - [Component rules](#component-rules)
  - [Type Checking](#type-checking)
    - [Complex example](#complex-example)
  - [Using decorators](#using-decorators)

# Components

## Web Checklist

1. Web testing
2. Web accessibility
3. Component rules

## Web Testing

For the web, we want to ensure that we can run UI tests, regression tests and functional tests.

### Functional Testing Template

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

For UI Tests, reference `manual/Testing/mocha-and-chai.md` for more information. It is best to run this using `mochacinno` and in watch mode. These are best use for anything found under the `js` controller module banner.

### Regression Testing Template

```javascript
/**
 * Regression tests
 * @author Dennis O'Keeffe
 */
require('babel-polyfill');
const expect = require('chai').expect;
const cwd = process.cwd();
const PixelDiff = require('controllers/pixeldiff');
const puppeteer = require('puppeteer');

console.log(PixelDiff);
console.log(cwd);

const screenshot = async (selector, savePath, location = '/') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Opening browser');
  await page.goto('http://localhost:3000');

  const el = await page.$('.homeSplashFade');
  await el.screenshot({ path: savePath });

  console.log('Closing browser');
  await browser.close();
};

describe('It works functionality', () => {
  it('Expects true to be true', () => {
    expect(true).to.be.true;
  });
});

describe('Image regression testing', () => {
  it('has no pixel difference', async () => {
    console.log('Comparing images');
    await screenshot('.homeSplashFade', cwd + '/regression/temp/test.png');

    const res = await PixelDiff.diff({
      imgOnePath: cwd + '/regression/src/test.png',
      imgTwoPath: cwd + '/regression/temp/test.png',
      dest: cwd + '/regression/diff/test.png',
      output: true
    });
    expect(res).to.equal(0);
  });
});
```

For more information, reference `manual/Testing/Regression-Testing.md`.

### UI Testing Template

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

For more information, reference `manual/Testing/puppeteer.md`.

## Web Accessibility

Run the site through the accessibility checker and ensure that there are no errors.

Useful links:

- [Tink Design Patterns](https://design-patterns.tink.uk/)

## Component rules

- We want reusability where possible
- UI elements should have no hardcoded text
- Where possible, use [Reselect](https://github.com/reduxjs/reselect) when using Redux and having elements that require a change to only specific state elements
- Use a decorator over all objects
- Write all files in TypeScript

## Type Checking

Type checking is an integral part of the process to ensure that what we are providing is the correct type.

TypeScript with VSCode offers a great to do this from our doc blocks.

[This Medium article has a great into into it.](https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76)

To get started on VSCode for .js files, head to settings and update the "Check JS" box.

![Check JS](https://res.cloudinary.com/gitgoodclub/image/upload/v1539053998/Screen_Shot_2018-10-09_at_1.36.08_pm.png)

Now we can get into type setting simply by using our doc blocks with the `@type` attribute!

![Basic example](https://res.cloudinary.com/gitgoodclub/image/upload/v1539053998/Screen_Shot_2018-10-09_at_1.43.22_pm.png)

The deep you delve into the type, the deeper the error outlines go.

![More complex example](https://res.cloudinary.com/gitgoodclub/image/upload/v1539053998/Screen_Shot_2018-10-09_at_1.47.28_pm.png)

[Checkout the Typescript page](https://www.typescriptlang.org/docs/handbook/basic-types.html) to get more of an idea about what you can do.

### Complex example

Here is an example using @typedefs.

```javascript
import React, { Component } from 'react';
import Config from 'src/app.json';
import Emitter from 'common/Emitter';
/* user imports */

/**
 * Render the ComponentALFooterOne component
 *
 * @class ComponentALFooterOne
 * @extends {Component}
 */
class ComponentALFooterOne extends Component {
  /**
   * @typedef {Object} Link Defines the main links
   * @property {String} copy Copy string
   * @property {String} link Link URL
   */
  /**
   * @typedef {Object} Social Social links
   * @property {String} type Type of social linke
   * @property {String} link Link URL
   */
  /**
   * @typedef {Object} State The state object
   * @property {Link[]} linksTop Links that go on the top
   * @property {Social[]} linksSocial Social links
   * @property {Link[]} linksBottom Links that go to the bottom
   */

  /**
   * @type {State} state
   */
  state = {
    linksTop: [
      {
        copy: 'Link',
        link: '/'
      },
      {
        copy: 'Link',
        link: '/'
      },
      {
        copy: 'Link',
        link: '/'
      },
      {
        copy: 'Link',
        link: '/'
      }
    ],
    linksSocial: [
      {
        type: 'Link',
        link: '/'
      },
      {
        type: 'Link',
        link: '/'
      },
      {
        type: 'Link',
        link: '/'
      },
      {
        type: 'Link',
        link: '/'
      }
    ],
    linksBottom: [
      {
        copy: 'Link',
        link: '/'
      },
      {
        copy: 'Link',
        link: '/'
      },
      {
        copy: 'Link',
        link: '/'
      }
    ]
  };

  handleLink(e, d) {
    Emitter.emit('event', {
      event: 'ComponentALFooterOne.handleLink',
      e: e.target
    });

    if (d.href[0] === '/') {
      e.preventDefault();
      const { router } = this.props;
      router.push(Config.baseUrl + d.href);
    }
  }

  renderLinksTopLeft = () => {
    const { linksTopLeft } = this.props.copy;
    if (!linksTopLeft) {
      return;
    }

    return linksTopLeft.map((d, i) => (
      <a
        key={i}
        onClick={(e) => this.handleLink(e, d)}
        href={d.href}
        className="text f-primary link margin opaque animate"
      >
        {d.name}
      </a>
    ));
  };

  renderLinksBottomLeft = () => {
    const { linksBottomLeft } = this.props.copy;
    if (!linksBottomLeft) {
      return;
    }

    return linksBottomLeft.map((d, i) => (
      <a
        key={i}
        onClick={(e) => this.handleLink(e, d)}
        href={d.href}
        className="text f-primary link social margin opaque animate"
      >
        {d.name}
      </a>
    ));
  };

  renderLinksBottomRight = () => {
    const { linksBottomRight } = this.props.copy;
    if (!linksBottomRight) {
      return;
    }

    return linksBottomRight.map((d, i) => (
      <a
        key={i}
        onClick={(e) => this.handleLink(e, d)}
        href={d.href}
        className="text f-primary link social margin opaque animate"
      >
        {d.name}
      </a>
    ));
  };

  /**
   * Render ComponentALFooterOne component
   * @memberof ComponentALFooterOne
   * @var {function} render Render ComponentALFooterOne component
   * @returns {Object} component
   */
  render() {
    return (
      <div className="component-al-footer-one">
        <div className="container content">
          <nav className="nav footer">
            <div className="block-main links">{this.renderLinksTopLeft()}</div>
            <div className="block-lower">
              <div className="block-social">{this.renderLinksBottomLeft()}</div>

              <div className="block-footer links">
                {this.renderLinksBottomRight()}
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default ComponentALFooterOne;
```

## Using decorators

Decorators are a useful way to cut code and wrap classes. A good example is the usage with redux. Take note though: decorators are deprecated and may be removed.

The example of a decorator used for Redux:

```javascript
import { connect } from 'react-redux';

const DecoratorRedux = (component) => {
  const mapStateToProps = (state) => {
    return {
      routing: state.routing,
      copy: state.copy,
      current: state.routing.locationBeforeTransitions.pathname
    };
  };

  return connect(mapStateToProps)(component);
};

export default DecoratorRedux;
```

In use:

```javascript
@DecoratorRedux
class PageBlog extends Component {
    /**
     * Render PageBlog component
     * @memberof PageBlog
     * @var {function} render Render PageBlog component
	 * @returns {PageBlog} component
     */
    render() {
      return (<div><p>Hello!</p></div>);
    }
```
