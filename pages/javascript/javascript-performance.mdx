---
menu: JavaScript
name: JavaScript Performance
---

# JavaScript Performance

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/web-performance/)
2. [Course Slides](https://speakerdeck.com/stevekinney/web-performance)
3. [Optimize JS GitHub](https://github.com/nolanlawson/optimize-js)
4. [Optimize JS Interactive](https://nolanlawson.github.io/optimize-js/)
5. [FastDOM GitHub](https://github.com/wilsonpage/fastdom)

## The Importantance of Performance

- "0.1 second is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result." - Jakob Nielsen.
- "10 seconds is about the limit for keeping the user's attention focused on the dialogue. For longer delays, users will want to perform other tasks while waiting for the computer to finish, so they should be given feedback indicating when the computer.expects to be done. Feedback during the delay is especially important if the response time is likely to be highly variable."
- 400ms increase for Yahoo increased traffic by 7%.
- Google found a 2% slower page search results in 2% fewer searches (with 2% fewer ads).
- 100ms in Amazon meant 1% increase in Revenue.
- If you want your site to feel faster, you need to be 20% faster than your competitors.

Our applications keep getting bigger and bigger and bigger. That being said, download speeds have also declined alongside unlimited plans!

### Perception times

Wetware perception-reaction times:

| Delay        | User Reaction                 |
| ------------ | ----------------------------- |
| 0 - 100ms    | Instant                       |
| 100 - 300ms  | Slight perceptible delay      |
| 300 - 1000ms | Task focus, perceptible delay |
| 1000+ ms     | Mental context switch         |
| 10000 + ms   | I'll come back later...       |

Aims:

| Respose                               | Animation                               | Idle                                       | Load                                          |
| ------------------------------------- | --------------------------------------- | ------------------------------------------ | --------------------------------------------- |
| Tap/click to paint in less than 100ms | Each frame completes in less that 16 ms | Use idle time to proactively schedule work | Satisfy the "response" goals during full load |
| Drag to paint in less than 16ms       | Complete that work in 50-ms chunks      | Get first meaningful paint in 1000 ms      |

> It is not to obsess over numbers, it is about getting 10% better.

> Don't tune for speed until you've measured. Don't blindly optimise.

### The Importance of Measuring

1. Are we testing performance on fancy MacBook Pros of consumer-grade hardware?
2. Are we simulating less-than-perfect network conditions?
3. What is our performance budget?

> Thinking deeply about the architecture and design of your application is a better use of your time than micro-benchmarks.

Rules to optimisation:

1. "Do less stuff goes faster".
2. Doing stuff later is better than doing it now.

The rough outline:

1. JavaScript performance
2. Rendering performance
3. Load performance

## The Cost of JavaScript

> A lot of time and energy is spent compressing assets, removing requests and reducing latency, but what about once the app is running?

The size of the JS we are sending is growing at an incredible rate. Sometimes, parsing and compiling is the real culprit. Steve shows an example of an application loading and with the time being "scripting".

Chrome also gives you little "red triangles" to help give you information on places you are causing issues.

> Fun fact: JavaScript is a compiled language. It uses just-in-time (JIT) compilation, which happens on the client's machine.

### The steps of JS

1. Fetch JS from where it is hosted.
2. Parse the JS.
3. Turn into a AST.
4. Send to the interpreter.
5. Intepreter turns it to byte code that is the used by the browser.

There is also an "optimizing compiler" that taks some code from the interpreter and spits out optimized machine code. Sometimes if it can't be optimized, it goes back to the byte code output from step 5.

The link to the slide diagram is [here](https://speakerdeck.com/stevekinney/web-performance?slide=76).

### Parsing

Parsing is slow, can be 1MB/s on mobile. The aim is to do as much parsing as you need and as little as you can get away with.

There are two phases:

1. Eager (full parse): Parse everything now.
2. Lazy (pre-parse): Do bear minimum now, parse the rest later.

Generally lazy is a good thing.

Here is an issue we can run into:

```javascript
// Eager parse
const a = 1;
const b = 2;

// Take note of function here, but we'll parse the body when we need it
function add(a, b) {
  return a + b;
}

add(a, b); // Whoa, go back and parse
```

> Corollary: Doing stuff twice is slower than doing it once.

> Optimize JS is brought in here as a helper for parsing the JS.

> Closure functions will always be lazily parsed over and over again.

### ASTs

> ASTs show a data structure representing our code.

With the AST, we have everything that we need to make our byte code.

### The Optimizing Compiler

Three things that the engine does to help you out:

1. Speculative optimization.
2. Hidden classes for dynamic lookups.
3. Function inlining.

> The example Steve runs through uses the `perf_hooks` API from Node, but then also pastes it into Chrome with the performance tab to show us potential pitfalls!

V8 also has flags to show us what is coming to our optimised comppiler.

```s
node --trace-opt js-file.js
```

The above code when run will show what is marked for optimized recompilation. If you run `node --trace-opt js-file.js | grep add` you can get even less noise.

## Deoptimization, Deleting Properties

Running `node --trace-opt --trace-deopt js-file.js | grep add` will show us both the optimisations and deoptimisations!

The follow coding shows the deoptimisation:

```javascript
const add = (x, y) => x + y;

performance.mark('start');

while (iterations--) {
  add(a, b);
}

add('foo', 'bar'); // this line creates a deoptimisation!

performance.mark('end');
performance.measure('My special benchmark', 'start', 'end');
```

The issue in the above is that different types of arguments causes an issue for the optimiser.

To debug a little further, we can use the following to avoid optimisations:

```javascript
const add = (x, y) => x + y;

performance.mark('start');

%NeverOptimizeFunction(add); // only for Node

while (iterations--) {
  add(a, b);
}

add('foo', 'bar'); // this line creates a deoptimisation!

performance.mark('end');
performance.measure('My special benchmark', 'start', 'end');
```

Then we can run `node --allow-natives-syntax benchmark.js`, which we will see causes a serious deoptimisation.

Other syntax we can use:

```javascript
%OptimizeFunctionOnNextCall(add);
```

> We use a system called "speculative optimisation.

How does it work?

- We use an interpreter because the optimizing compiler is slow to get started.
- Also: it needs some information before it knows what work it can either optimize or skip out on all together.
- So, the interpreter starts gathering feedback about what is sees as the function is used.

Once we had a function that started taking a different type, it de-optimizers. It will only try optimizing a couple of times before it just stops with this.

The next example was with a class:

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

while (iterations--) {
  const point = new Point(2, 4);
  delete point.x; // this cause a de-op - why?

  JSON.stringify(point);
}
```

We notice that if we delete one of the properties (not the last) will cause a de-optimisation!

The example is then used with objects with different properties. So why would one be faster than the other?

Because there is a type system in v8! Crazy.

It is to do with the morphism of an object!

1. Monomorphic - one thing.
2. Polymorphic - many things.
3. Megamorphic - a bunch of different things, not going to bother optimising.

> The more consistent we are with more things, the more likely to be an optimisation.

## Optimizing Objects

Another v8 hidden native tool we can use is `%HaveSameMap()` with `--allow-natives-syntax`.

```javascript
const a = { a: 1 }
const b = { b: 1 }

console.log(%HaveSameMap(a,b)) // false - makes sense

const a = { a: 1 }
const b = { a: 1 }

console.log(%HaveSameMap(a,b)) // true - makes sense

const a = { a: 1 }
const b = { a: 50000000000000 }

console.log(%HaveSameMap(a,b)) // false - 32bit int is a diff type

const a = { a: 1 }
const b = { a: 5 }

console.log(%HaveSameMap(a,b)) // true - same int type

const a = { a: 1 }
const b = { a: 5, x: 2 }

console.log(%HaveSameMap(a,b)) // false

const a = { a: 1, x: 1 }
const b = { a: 5, x: 2 }

console.log(%HaveSameMap(a,b)) // true

const a = { a: 1 }
const b = { a: 5, x: 2 }

a.x = 3

console.log(%HaveSameMap(a,b)) // false - interesting!

const a = { a: 1 }
const b = { a: 5 }

a.x = 3
b.x: 2

console.log(%HaveSameMap(a,b)) // true

const a = { a: 1 }
const b = Object.assign({}, a)

console.log(%HaveSameMap(a,b)) // false - also interesting!

const a = { a: 1 }
const b = Object.assign({}, a)
const c = Object.assign({}, a)

console.log(%HaveSameMap(c,b)) // true

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const a = new Point(1,2)
const b = new Point(5,12)

console.log(%HaveSameMap(a,b)) // true
```

So what's happening? Dynamic lookup.

> Dynamic lookup: This object could be anything, so let me look at the rule book and figure this out.

V8 keeps a secret type system behind your back. It tries to do less work where possible (in a conservative way).

As it does this, the order that the properties got added to the object matter!

```javascript
// for examples sake, we'll declare the class names cached
const obj = { x: 1 }; // c0
obj.y = 2; // now c1
const another = { x: 1, y: 23 }; // c2 - path matters!
delete another.y; // c3
```

> Feedback Lattice: objects created in different ways can change their "hidden" class and move through this process.

## Scoping and Prototypes

Scoping can hae dramatic implications on the performance of our code.

In this example, he creates a class from within a function and there is a dramatic change (9ms to 800ms).

When having a class within the scope of another functionn, they also don't share the same map. The problem is that the class is now pointing to a different prototype chain.

The takeaways:

1. Initialize your properties at creation.
2. Initialize them in the same order.
3. Try not to modify them after the fact.
4. Maybe just use TS or Flow so you don't have to worry about these things.

## Function Inlining

```javascript
const square = x => x * x;
const sumOfSquares = (a, b) => square(a) + square(b);
```

Why are these speeds optimised? It's thanks to inlining.

We can see this in action using the `--trace-turbo-inlining` Node flag.

When a function is inline, it just rewrites what happened the first time to happen to second time to stop yourself from calling the function again.

- The easiest way to reduce parse, compile and execution times is to ship less code.
- Use the `User Timing API` to figure out where the biggest hurt is.
- Consider using a type system.

## How Web Pages Are Built

1. Browser GET web page - typically HTML
2. HTML parsed into the document object model (DOM)
3. If we fetch CSS, that gets parsed into the CSS Object Model (CSSOM)
4. All of these things that we then get put into the Render Tree
5. Style calculation
6. Layout aka reflow.
7. Paint.
8. Composite Layers.

The render tree has:

- 1-to-1 mapping with the visible objects on the page (no hidden objects but yes to pseudo objects).
- The might be multiple rules that apply to a single element. We need to figure that all out here.

This is done using `style calculation`.

> Style calculation: The browser figures out all the styles that will be applied to a given element.

Note: the more complicated the selectors, the longer the calculation takes.

Takeaways:

1. Use simple selectors where possible.
2. Reduce the effected elements.

## JavaScript and the Render Pipeline

JS can change the following (not a complete list):

1. Change the class on an object
2. Change inline styles
3. Add or remove elements from the page

All of these will cause the render flow to start again from the layout stage.

## Layouts and Reflows

Layout is used for the first time, reflow is for following times.

> Reflows are very expensive in terms of performance, and is one of the main causes of slow DOM scripts, especially on devices with low processing power, such as phones. In many cases, they are equivalent to laying out the entire page again.

Each browser has different ways to optimise this.

About reflows:

1. A reflow is a blocking operation. Everything else stops.
2. It consumes a decent amount of CPU.
3. It will definitely be noticeable by the user if it happens often (e.g. in a loop).

> A reflow of an element causes a reflow of its parents and children.

Note: There is a lot that causes a reflow. Requires a repaint and is also expensive.

### How to avoid reflows

- Change classes at the lowest levels of the DOM tree.
- Avoid repeatedly modifying inline styles.
- Trade smoothness for speed if you're doing an animation in JavaScript.
- Avoid table layouts.
- Batch DOM manipulation.
- Debounce window resize events.

> Note: ideally we're aiming for 60fps. Note that sometimes aiming for janky animations will ensure you don't miss a paint and appear smoother.

The exercise links to a [CodePen](https://codepen.io/stevekinney/full/eVadLB) to check the impact of reflows.

## Layout Thrashing

Also known as `forced synchronus layout`.

> There are a set of things you can do that cause the browser to stop what it's doing and calculate style and layout.

Chrome will also help us a bit with the red flags where it thinks we are doing a forced reflow.

> "Layout Thrashing occurs when JavaScript violently writes, then reads, from the DOM, multiple times causing document reflows." - Winston Page

Takeaways:

1. Plan to do all of your reading before all of your writing (don't read, write, read, write).
2. Use `requestAnimationFrame`. There is still a lot of repeated work. Better to use an abstraction.

```javascript
// using requestAnimationFrame
elements.forEach((element, index) => {
  const top = element.offsetTop;
  const nextPosition = value; // value is stubbed for something more complex
  requestAnimationFrame(() => {
    element.style.transform = `translateX(${nextPosition}px)`;
  });
});
```

## FastDOM

FastDOM is used to prevent layout thrashing. There are only two methods you care about: `measure` and `mutate` (aka read and write).

It is used for scheduling.

```javascript
// using fastDOM
elements.forEach((element, index) => {
  fastdom.measure(() => {
    const top = element.offsetTop;
    const nextPosition = value; // value is stubbed for something more complex
    fastdom.mutate(() => {
      element.style.transform = `translateX(${nextPosition}px)`;
    });
  });
});
```

## Frameworks and Layout Thrashing

Frameworks will attempt to help you prevent layout thrashing.

React does a lot of things under the hood to help you. When using React in dev mode, it is worth to note that the performance measuring will take a hit.

> Production mode is important in React.

## Painting

> Anytime you change something other than opacity or a CSS transform, you're going to trigger a paint.

The rule: use your tools to see if you're painting.

From the extra rendering tools, we can use `Paint flashing` to help you know when you're painting again.

## The Compositor Thread

Some of our nice threads:

1. The UI Thread: Chrome itself. The tab bar, etc.
2. The Renderer Thread: We usually call this the main thread. This is where all JS, parsing HTML and CSS, style calculation, layout and painting happens. There are one of these per tab.
3. The Compositor Thread: Draws bitmaps to the screen via the GPU.

> The compositor thread can go off and work on some super hard JS computation and the animations will still chug along.

Things the compositor thread is good at:

1. Drawing the same bitmaps over and over in different places.
2. Scaling and rotating bitmaps.
3. Making bitmaps transparent.
4. Applying filters.
5. Mining Bitcoin.

> Disclaimer: Compositing is kind of a hack.

Note: Layers are an optimization that the browser does for you under the hood. So what gets one?

1. The root object of a page.
2. Objects that have specific CSS positions
3. Objects with CSS transforms.
4. Objects that have overflow.
5. Other stuff...

## will-change property

This property can help the browser decide to make things its own layer.

```css
.sidebar {
  will-change: transform; // makes the recommendation
}
```

We can use the `layers` property in Chrome to check this out.

Note: DO NOT make everything a layer. The browser is already trying to help you under the hood.

> Promoting an object to its own layer takes a non-zero amount of time.

If there is something that happens temporarily, you can use this property in JavaScript and then remove it after, ie:

```javascript
element.addEventListener('mouseenter', () => {
  element.style.willChange = 'transform';
});

element.addEventListener('animationEnd', () => {
  element.style.willChange = 'auto';
});

element.addEventListener('mouseleave', () => {
  element.style.willChange = 'auto';
});
```

## Latency and Bandwidth

> Networks, CPUs and disks all hate you. On the client, you pay for what you send in ways you can't easily see. - Alex Russell

Bandwidth vs latency:

- Bandwidth: How much stuff you can fit through the tube per second.
- Latency: How long it takes to get to the other end of the tube.

> Steve shows a latency graph where the larger the file size, the bigger the "jump" (not linear) in download time which is part of the TCP.

### TCP focuses on reliability

- We keep checking in with the server to make sure that everything is going well.
- Packets are delivered in the correct order.
- Packets are delivered without errors.
- Client acknowledges each packet.
- Unreliable connections are handled well.
- Will not overload the network.
- Will sacrifice speed to ensure reliability.

> TCP starts by sending a small amount of data and the starts sending more and more as we find out that things are being successful. This is also why things feel so much worse on a slower connection (because packets get lost and corrupted)!

> Pro tip: The initial window size is 14kb. If you can get files under 14kb, then it means you can get everything through in the first window.

An example shown is `sendping`. The tip is to put things everywhere using a CDN.

### Cache

- In 1997, HTTP/1.1 gave us Cache-Control headers.
- Caching affects GET, OPTIONS and HEAD.

This section goes over how to store data, what happens when things go stale and how to cache-bust.

Cache-busting ways:

1. Content-Addressable Storage ie `index.13oih32.js` naming of files.
2. Cache in the CDN ie cache the HTML that it serves up. We can reach into the CDN to invalildate.

### Service Worker

Instead of asking the Internet directly for things, the service worker becomes the middle man. It also means you can work offline depending on what is kept in the cache.

There is another course on this to dive deeper.

### Lazy Loading

Lazy-loading and pre-loading. Use this wherever possible as people needs things.

We can use tools like `webpack-bundle-analyzer`. It is a great way to visualise where all the code is.

In the example, Steve shows how to reduce Lodash first. This is first done by ES6 module imports to help the analyzer tree shake.

> Note: There is a plugin you can use to automatically swap out Lodash imports for just what is uses.

### React Loadable

The demo here has short demo of showing lazy loading with a React component.

## HTTP/2

The increasing support comes with unique characteristics.

- An upgrade to the HTTP layer
- Fully multiplexed - send multiple requests in parallel
- Allows servers to proactively push responses into client caches

What's wrong with HTTP/1.1?

- Websites are growing: more images, more JS.
- Bandwidth has gotten better, but roundtrip time has not.
- Takes same time to ping server as 20 years ago.
- One file at a time connection while we are building sites requiring 100 files.

> Some good HTTP/1.1 are not good for HTTP/2 and vice versa.

## Build Tools

> When in doubt, let your tools help you.

### Paying the Babel tax

Note that converting from futuristic code from Babel to supported code can actually end up turning into a lot of code and be costly.

An example of something expensive is `async/await`!

### Useful Babel plugins

- env: Allows you target specific environments.
- transform-react-remove-prop-types: Remove prop types.
- transform-react-pure-class-to-function: Take components with no state and convert to smaller syntax.
- transform-react-inline-elements: Converts JSX to React.createElement JS which becomes an object.
- transform-react-constant-elements: Hoist up constant JSX elements to file-scope variables.

### Prepack

Prepack aims to make JS run faster. Examples shown were pre-emptively changes things like fibonacci calls to make things faster.

Note: Prepack is not production ready.

## Things not covered

1. Server-side rendering
2. Image performance
3. Loading web fonts
4. Progressive web apps
