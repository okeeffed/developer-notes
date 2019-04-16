---
name: Web Concepts
menu: Web
---

# Web Concepts

## Headers

### Transfer Encoding

The Transfer-Encoding header specifies the form of encoding used to safely transfer the entity to the user.

Transfer-Encoding is a hop-by-hop header, that is applied to a message between two nodes, not to a resource itself. Each segment of a multi-node connection can use different Transfer-Encoding values. If you want to compress data over the whole connection, use the end-to-end Content-Encoding header instead.

When present on a response to a HEAD request that has no body, it indicates the value that would have applied to the corresponding GET message.

Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding

Usual headers include `Transfer-Encoding: gzip` - HTTP/2 does not support `chunked`.

### ETag

The ETag HTTP response header is an identifier for a specific version of a resource. It allows caches to be more efficient, and saves bandwidth, as a web server does not need to send a full response if the content has not changed. On the other side, if the content has changed, etags are useful to help prevent simultaneous updates of a resource from overwriting each other ("mid-air collisions").

If the resource at a given URL changes, a new Etag value must be generated. Etags are therefore similar to fingerprints and might also be used for tracking purposes by some servers. A comparison of them allows the determination of whether two representations of a resource are the same. They might also be set to persist indefinitely by a tracking server.

Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag

## RPC vs REST

The tl;dr is that `REST enforces a client/server model, where the client is interested in gaining information and acting on a set of resources that are managed by the server. It doesn’t make sense to talk about RPC vs REST. In fact you can implement a RESTful service on top of any RPC implementation by creating methods that conform to the constraints of REST. You can even create an HTTP style REST implementation on top of an RPC implementation by creating methods for GET, POST, PUT, DELETE that take in some metadata that mirrors HTTP headers and return a string that mirrors the body of an HTTP request.`

Best source: https://etherealbits.com/2012/12/debunking-the-myths-of-rpc-rest/

## Security

### Same-Origin Policy

The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin. It helps isolate potentially malicious documents, reducing possible attack vectors.

### iFrame

On one side it’s a tag, but from the other side it’s a window-in-window.

## Web Performance

### Critical Rendering Path

Optimizing for performance is all about understanding what happens in these intermediate steps between receiving the HTML, CSS, and JavaScript bytes and the required processing to turn them into rendered pixels - that's the critical rendering path.

### Service Workers

Source: https://developers.google.com/web/fundamentals/primers/service-workers/

A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like push notifications and background sync. In the future, service workers might support other things like periodic sync or geofencing. The core feature discussed in this tutorial is the ability to intercept and handle network requests, including programmatically managing a cache of responses.

The reason this is such an exciting API is that it allows you to support offline experiences, giving developers complete control over the experience.

Things to note about a service worker:

- It's a JavaScript Worker, so it can't access the DOM directly. Instead, a service worker can communicate with the pages it controls by responding to messages sent via the postMessage interface, and those pages can manipulate the DOM if needed.
- Service worker is a programmable network proxy, allowing you to control how network requests from your page are handled.
- It's terminated when not in use, and restarted when it's next needed, so you cannot rely on global state within a service worker's onfetch and onmessage handlers. If there is information that you need to persist and reuse across restarts, service workers do have access to the IndexedDB API.
- Service workers make extensive use of promises.

### Preload vs Prefetch

Sources:

- https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
- http://yoavweiss.github.io/link_htmlspecial_16/#53

Preload resources you have high-confidence will be used in the current page. Prefetch resources likely to be used for future navigations across multiple navigation boundaries.

Both preload and prefetched resources are stored in the HTTP cache.

Most `preload` cases are doing so to preload web fonts. Other sites are using it to asynchronously load CSS files.

### Server Push

Source: https://www.smashingmagazine.com/2017/04/guide-http2-server-push/

Server push lets the server preemptively "push" website assets to the client without the user having explicitly asked for them. When used with care, we can send what we know the user is going to need for the page they’re requesting.

### Browser Layout vs Compositing vs Painting

Source: https://www.quora.com/What-is-the-difference-between-layout-painting-and-compositing

1. Layout: Browser will determine how much space each element takes up and where to place it.
2. Painting: This is the process of filling in pixels. It involves drawing out elements.
3. Compositing: Browser draws element to the screen in the correct order so the page renders correctly.

### Reflows and when to promote to GPU

This refers to the re-calculation of positions and dimensions of all elements, which leads to re-rendering part or all of the document. Changing a single element can affect all children, ancestors, and siblings.

Reducing it can be done by:

1. Use Best-Practise Layout techniques
2. Minimize CSS Rules
3. Minimize DOM depth
4. Update classes low on the tree
5. Remove complex animations from the flow (position fixed/absolute)
6. Modify hidden elements
7. Update elements in batch
8. Minimize elements updated
9. Know that smoothness comprimises performance
10. Use tools to analyze repaint issues

Source: https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/

Note that the `transform` and `opacity` properties are guaranteed to neither affect nor be affected by the normal flow or DOM environment (that is, they won’t cause a reflow or repaint, so their animation can be completely offloaded to the GPU).

To get rid of implicit compositing issues and to reduce visual artifacts:

1. Try to keep animated objects as high as possible in the z-index. Ideally, these elements should be direct children of the body element. Of course, this is not always possible in the markup when an animated element is nested deep inside the DOM tree and depends on the normal flow. In such cases, you could clone the element and put it in the body for animation only.
2. You can give browser a hint that you’re going to use compositing with the `will-change` CSS property. With this property set on an element, the browser will (but not always!) promote it to a compositing layer in advance, so that the animation can start and stop smoothly. But don’t misuse this property, or else you’ll end up with a tremendous increase in memory consumption!

## Seperation of Concerns

- Model-View-Controller (MVC)
- Model-View-View-Model (MVVM)
- Model-View-Presenter (MVP) patterns

## Multi-Device Support

- Mobile-first styles

## Asset Delivery

- In large applications, it’s not uncommon to have independent teams owning their own codebases. These different codebases probably have dependencies on each other and each usually has their own pipeline to release changes to production. Your design should consider how assets are built with dependencies (code splitting), tested (unit and integration tests) and deployed. You should also think about how you will vend assets through a CDN or inline them to reduce network latency.

## Async Flow

Your components may need to communicate in real-time with the server. The design you propose should consider XHR vs bidirectional calls. If your interviewer asks you to support older browsers, your design will need to choose between hidden iFrames, script tags or XHR for messaging. If not, you could propose using websockets or you might decide server-sent events (SSE) are better.

## State Management

State management such as choosing between unidirectional data flow or two-way data binding. You should also think about if your design will follow a passive or reactive programming model, and how components related to each other for example Foo–> Bar or Foo –>Bar.

## Layout

Layout – if you’re designing a system used by multiple development teams, you need to think about building components and if you require teams to follow a consist markup to use said components.

## Rendering

Rendering – client-side (CSR), server-side (SSR) and universal rendering.

## CAP Theory

CAP Theorem is a concept that a distributed database system can only have 2 of the 3: Consistency, Availability and Partition Tolerance.

## ACID

In computer science, ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc.

## Semantic Markup

- `async`: When present, it specifies that the script will be executed asynchronously as soon as it is available.
- `defer`: When present, it specifies that the script is executed when the page has finished parsing.
- `disabled`: A disabled input element is unusable and un-clickable.
- `data-*`: data-\* attributes allow us to store extra information on standard, semantic HTML elements without other hacks such as non-standard attributes, extra properties on DOM, or Node.setUserData().
- Aria labels: Accessibility concerns, for example, making sure an input checkbox has a larger responding area (use label "for"). Also, role="button", role="presentation", etc.

## JavaScript

### Context and Process

Source: https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/

Context (which ECMA 5 breaks into LexicalEnvironment, VariableEnvironment and ThisBinding) and Process (a set of statements to be invoked in sequence). Declarations contribute to the VariableEnvironment when the execution scope is entered. They are distinct from Statements (such as return) and are not subject to their rules of process.

### Hoisting

```javascript
function foo() {
  var bar = function() {
    return 3;
  };
  return bar();
  var bar = function() {
    return 8;
  };
}
alert(foo());
```

This when run becomes this:

```javascript
//**Simulated processing sequence for Question 2**
function foo() {
  //a declaration for each function expression
  var bar = undefined;
  var bar = undefined;
  //first Function Expression is executed
  bar = function() {
    return 3;
  };
  // Function created by first Function Expression is invoked
  return bar();
  // second Function Expression unreachable
}
alert(foo()); //3
```

Hoisting of functions not assigned to variables is a little different:

```javascript
function foo() {
  function bar() {
    return 3;
  }
  return bar();
  function bar() {
    return 8;
  }
}
alert(foo());
```

...which becomes:

```javascript
function foo() {
  function bar() {
    return 3;
  }
  function bar() {
    return 8;
  }
  return bar();
}
alert(foo());
```

In the case where the return occurs in a particular order, we can still return an `undefined` function:

```javascript
function foo() {
  return bar();
  var bar = function() {
    return 3;
  };
  var bar = function() {
    return 8;
  };
}
alert(foo());
```

This results in...

```javascript
function foo() {
  //a declaration for each function expression
  var bar = undefined;
  var bar = undefined;
  return bar();
  bar = function() {
    return 3;
  };
  bar = function() {
    return 8;
  };
}
alert(foo());
```

Note that anything declared with `let` will not hoist and cause a reference error!

### typeof, instanceof

```javascript
class A {
  hello = () => 'hello';
}
const a = new A();
console.log(a instanceof A); // true
console.log(typeof a === 'object'); // true
```

## Type Coercion

1. `Type coercion` is the process of converting value from one type to another
2. `Implicit vs. Explicit` coercion
3. Three types of conversions: to string, to boolean, to number

```javascript
// implicit
const a = 2;
const b = 2 + ''; // "2"

// explicit
a.toString(); // "2"
```

### Browser events: bubbling, capturing, and delegation

Source: https://blog.meteor.com/browser-events-bubbling-capturing-and-delegation-14db28e924ae

`<body> <p> <a><span>Hello</span></a> </p> </body>`

If we add a "click" event listener to the A, we’d expect it to fire when the user clicks the SPAN. We’d also expect clicking on the SPAN to trigger listeners on the P and BODY. If we added listeners to every element — the SPAN, the A, the P, and the BODY — we’d expect them to all fire when the user clicks the SPAN.

- The "bubbling" model achieves this by saying the event bubbles from bottom to top, visiting each handler in turn. First it visits the SPAN’s handler, and if that handler doesn’t cancel the event, it propagates up to the A, and so on.
- The "capturing" model says instead that event handlers are visited top-to-bottom. The BODY handler captures the event first, and if it doesn’t cancel the event, it propagates downwards to the P, and so on.

Event delegation is not a browser feature, but a popular technique built into libraries like jQuery. Many blogs get confused talking about it or equate it with bubbling, but I hope the following description is clear.

### Mixins

Source: https://javascript.info/mixins

```javascript
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User('Dude').sayHi(); // Hello Dude!
```

### Lexical Scope, Closures + Hoisting

Source: https://medium.com/@nickbalestra/javascripts-lexical-scope-hoisting-and-closures-without-mystery-c2324681d4be

Closure: Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

```javascript
function foo() {
  // 'scope of foo' aka lexical scope for bar
  var memory = 'hello closure';
  return function bar() {
    console.log(memory);
  };
}

var memory = null,
  baz = foo();
baz(); // 'hello closure'
```

Lexical scope: A lexical scope in Javascript means that a variable defined outside a function can be accessible inside another function defined after the variable declaration. But the opposite is not true, the variables defined inside a function will not be accessible outside that function.

### Binding

Source: https://javascript.info/bind

```javascript
let user = {
  firstName: 'John',
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

Solution 1:

```javascript
let user = {
  firstName: 'John',
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);

// same, but shorter
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Solution 2: Bind

```javascript
let user = {
  firstName: 'John',
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

let sayHi = user.sayHi.bind(user); // (*)

sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!
```

### Currying

```javascript
function curry(f) {
  // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert(carriedSum(1)(2)); // 3
```

### Prototypes

Source: https://medium.com/backticks-tildes/javascript-prototypes-ee46810e4866

Objects in JavaScript have an internal property known as prototype. It is simply a reference to another object and contains common attributes/properties across all instances of the object.

```javascript
let protoRabbit = function(color, word, type) {
  this.color = color;
  this.word = word;
  this.type = type;
};
protoRabbit.prototype.getColor = function() {
  return this.color;
};
protoRabbit.prototype.speak = function() {
  console.log(`The ${this.type} rabbit says ${this.word}`);
};
let killerRabbit = new protoRabbit('grey', 'SKREEEEE!', 'assassin');
killerRabbit.speak();
```

### Composition

Source: https://alligator.io/js/class-composition/

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Alligator extends Animal {}

const jack = new Alligator('jack');
```

If you wish to be explicit...

```javascript
class Alligator extends Animal {
  constructor(...args) {
    super(...args);
  }
}
```

### Higher Order Functions

Source: https://eloquentjavascript.net/05_higher_order.html

Basic example:

```javascript
function greaterThan(n) {
  return (m) => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// true
```

Example to show alternative control logic:

```javascript
function unless(test, then) {
  if (!test) then();
}

repeat(3, (n) => {
  unless(n % 2 == 1, () => {
    console.log(n, 'is even');
  });
});
//  0 is even
//  2 is even
```

## DOM

Source: https://www.digitalocean.com/community/tutorials/how-to-make-changes-to-the-dom

- Selecting or finding nodes using `document.querySelector` and in older browsers `document.getElementsByTagName`.
- Traversal up and down – `Node.parentNode`, `Node.firstChild`, `Node.lastChild` and `Node.childNodes`.
- Traversal left and right – `Node.previousSibling` and `Node.nextSibling`.
- Manipulation – add, remove, copy, and create nodes in the DOM tree. You should know operations such as how to change the text content of a node and toggle, remove or add a CSS classname.
- Performance – touching the DOM can be expensive when you have many nodes, you should at least know about document fragments and node caching.

### Creating Nodes

| Property/Method  | Description                                    |
| ---------------- | ---------------------------------------------- |
| createElement()  | Create a new element node                      |
| createTextNode() | Create a new text node                         |
| node.textContent | Get or set the text content of an element node |
| node.innerHTML   | Get or set the HTML content of an element      |

### Inserting Nodes

| Property/Method     | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| node.appendChild()  | Add a node as the last child of a parent element                      |
| node.insertBefore() | Insert a node into the parent element before a specified sibling node |
| node.replaceChild() | Replace an existing node with a new node                              |

### Removal

| Method             | Description       |
| ------------------ | ----------------- |
| node.removeChild() | Remove child node |
| node.remove()      | Remove node       |

### Copy

| Method           | Description |
| ---------------- | ----------- |
| node.cloneNode() | Clone node  |