---
name: UI Testing Web
menu: Testing 
---
# UI Testing Web

For web, we can test UI elements by making the most of Puppeteer and both the Emitter and Recorder JS packages from Kratos and the `json-server` js-controller package from Kratos.

## Getting started

```shell
kratos install js-controllers json-server
kratos install js Emitter
kratos install js Recorder
# install puppeteer, mocha, json-server etc if required - should be bootstrappable
```

## Setting up for the tests

Within the component module you want to target, create a `.puppeteer.js` file and a `db.json` file.

## The component file

We use the `Emitter` module to emit events to our file, which in turn will - if config is in `debug` mode, pass on to JSON Server to generate our event emission file.

The component could look like this for example:

```javascript
import React, { Component } from 'react';
import Emitter from 'common/Emitter';
import Config from 'src/app.json';
import Waypoint from 'react-waypoint';

/**
 * Render the Component component
 *
 * @class Component
 * @extends {Component}
 */
class Component extends Component {
  /**
   * Handle primary button click event.
   *
   * @memberof Component
   */
  handlePrimaryClick = (e) => {
    Emitter.emit('event', {
      event: 'Component.handlePrimaryClick',
      e: e.target
    });

    if (Config.debug) {
      e.preventDefault();
      return;
    }

    const { router } = this.props;
    router.push(Config.baseUrl + '/test');
  };

  /**
   * Handle component enter event.
   *
   * @memberof Component
   */
  handleWaypointEnter = (e) => {
    Emitter.emit('event', { event: 'Component.handleWaypointEnter' });
  };

  /**
   * Handle component exit event.
   *
   * @memberof Component
   */
  handleWaypointExit = (e) => {
    Emitter.emit('event', { event: 'Component.handleWaypointExit' });
  };

  /**
   * Render Component component
   * @memberof Component
   * @var {function} render Render Component component
   * @returns {Object} component
   */
  render() {
    const {
      title,
      subtitle,
      buttonPrimary,
      buttonSecondary,
      imageMain
    } = this.props.copy;

    return (
      <Waypoint
        onEnter={this.handleWaypointEnter}
        onLeave={this.handleWaypointExit}
      >
        <div className="component">
          <div className="container content">
            <button
              onClick={this.handlePrimaryClick}
              className="button primary f-primary cta animate"
            >
              {buttonPrimary}
            </button>
          </div>
        </div>
      </Waypoint>
    );
  }
}

export default Component;
```

## Recording the events manually on the web

Use the Puppeteer recorder to do a runthrough of the events you want to cover. [Check here](https://github.com/checkly/puppeteer-recorder) for more info.

After running through with the recorder, we should be able to modify the Puppeteer template. The end result could look like the following:

```javascript
/**
 * ComponentALLandingOne tests
 */
const puppeteer = require('puppeteer');
const json = require('./db.json');
const fs = require('fs-extra');
const cwd = process.cwd();
const server = require(cwd + '/controllers/json-server');
const wait = require('waait');
const Recorder = require(cwd + '/src/common/Recorder').default;
let dbJson;
server.listen(4444, () => console.log('JSON DB server started'));

describe('ComponentALLandingFive UI functionality', () => {
  describe('ComponentALLandingFive events', () => {
    beforeEach(() => {
      dbJson = fs.readJsonSync(cwd + '/db.json');
      dbJson.events.map((e) => Recorder.delete(e.id));
    });

    it('Events emitted equals prerecording', async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto('http://localhost:3000/ComponentALLandingFive');
      await page.waitForSelector(
        '.grid > .item > .flex > .block-info > .primary'
      );
      await page.click('.grid > .item > .flex > .block-info > .primary');

      await page.goto('http://localhost:3000/ComponentALLandingFive');

      await browser.close();

      await wait(300);
      dbJson = fs.readJsonSync(cwd + '/db.json');

      expect(dbJson).to.deep.equal(json);
    });
  });
});
```

## Init the component db.json file

```json
{
  "events": []
}
```

## First run through of the file

If we decide to run that Puppeteer test
