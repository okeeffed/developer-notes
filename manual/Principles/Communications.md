---
name: Communications
menu: Principles 
---
# Communications

This should cover things like logging, tracing etc.

[This article is a great reference.](https://medium.freecodecamp.org/how-you-can-improve-your-workflow-using-the-javascript-console-bdd7823a9472)

## Table of contents

- [Communications](#communications)
    - [Table of contents](#table-of-contents)
    - [Logging](#logging)
        - [Console logging in the browser](#console-logging-in-the-browser)
    - [Practical usage](#practical-usage)
        - [Logging keys](#logging-keys)
        - [Example Class](#example-class)
    - [Other tips and gotchas](#other-tips-and-gotchas)


## Logging

### Console logging in the browser

We have a few methods we can use with `console` to help us be more proficient on how we log:

```
.log
.info
.warn
.error
.table
.time(key)
.group
.groupEnd
.trace
.assert
```

**Guidelines:**

1.  When going through a process across files and functions, attempt to use group to log the process.
2.  Assertions may also become handy when `if/else` logic is involved for logging purposes.
3.  Ensure these logs only show when running in a certain environment (ie not in production mode).

## Practical usage

These are more guidelines that take influence from languages like Objective-C and personal decisions.

### Logging keys

| Type             | Key | Example                                        |
| ---------------- | --- | ---------------------------------------------- |
| Error            | !   | console.error('! description', error);         |
| Warning          | ?   | console.warn('? description');                 |
| Functions        | >   | console.group('> fileName.functionName');      |
| Instance methods | -   | console.group('- className.methodName');       |
| Static methods   | +   | console.group('+ className.staticMethodName'); |
| Debug level 1    | #   | console.log('# importantDebugMessage');        |
| Debug level 2    | ##  | console.log('## moreImportantDebugMessage');   |
| Debug level 3    | ### | console.log('### mostImportantDebugMessage');  |
| Event            | @   | console.log('@ analyticsEndpoint:', data);     |
| Success          | $   | console.log('$ message');                      |

### Example Class

```javascript
import React, {Component} from 'react';
import Emitter from 'common/Emitter';
import Config from 'src/app.json';
import Waypoint from 'react-waypoint';

/**
 * Render the ComponentALLandingFive component
 *
 * @class ComponentALLandingFive
 * @extends {Component}
 */
class ComponentALLandingFive extends Component {
    /**
     * Handle primary button click event.
     *
     * @memberof ComponentALLandingFive
     */
    handlePrimaryClick = e => {
        console.group('- ComponentALLandingFive.handlePrimaryClick');
        Emitter.emit('event', {
            event: 'ComponentALLandingFive.handlePrimaryClick',
            e: e.target,
            data: {
                href: '/'
            }
        });

        if (Config.debug) {
            e.preventDefault();
            console.warn('? Debug mode: early return');
            console.groupEnd();
            return;
        }

        const {router} = this.props;
        router.push(Config.baseUrl + '/test');
        console.groupEnd();
    }

    /**
     * Handle secondary button click event.
     *
     * @memberof ComponentALLandingFive
     */
    handleSecondaryClick = e => {
        console.group('- ComponentALLandingFive.handleSecondaryClick');
        Emitter.emit('event', {
            event: 'ComponentALLandingFive.handleSecondaryClick',
            e: e.target,
            data: {
                href: '/'
            }
        });

        if (Config.debug) {
            e.preventDefault();
            console.warn('? Debug mode: early return');
            console.groupEnd();
            return;
        }

        const {router} = this.props;
        router.push(Config.baseUrl + '/test');
        console.groupEnd();
    }

    /**
     * Handle component enter event.
     *
     * @memberof ComponentALLandingFive
     */
    handleWaypointEnter = e => {
        console.log('- ComponentALLandingFive.handleWaypointEnter');
        Emitter.emit('event', {event: 'ComponentALLandingFive.handleWaypointEnter'});
    }

    /**
     * Handle component exit event.
     *
     * @memberof ComponentALLandingFive
     */
    handleWaypointExit = e => {
        console.log('- ComponentALLandingFive.handleWaypointExit');
        Emitter.emit('event', {event: 'ComponentALLandingFive.handleWaypointExit'});
    }

    /**
     * Render ComponentALLandingFive component
     * @memberof ComponentALLandingFive
     * @var {function} render Render ComponentALLandingFive component
	 * @returns {Object} component
     */
    render() {
        // omitted for brevity
    }
}

export default ComponentALLandingFive;
```

**Note:** In the below gif, the "analytics" logs come from the Emitter module class.

![Example in action](https://res.cloudinary.com/gitgoodclub/image/upload/v1539219876/gifAnalytics.gif)



## Other tips and gotchas

If there is a possibility of an early return or error when logging and using groups, ensure that you adequately close the group off properly. If you cannot ensure that a group will close (ie entering a zone, mouse hover etc may not exit) then avoid the use of a group for that event and rely more on logs.
