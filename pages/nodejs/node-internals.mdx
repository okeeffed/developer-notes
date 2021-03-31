---
menu: Nodejs
name: Nodejs Internals
---

# Nodejs Internals

Course by Stephen Grider found [here](https://www.udemy.com/advanced-node-for-developers/).

## Node Internals

Two of the most important dependencies of the NodeJS project are `V8` and `libuv`.

`V8` is an open source JavaScript engine created by Google. The purpose is to execute JavaScript code outside of the browser.

`libuv` is an open source C++ library that gives NodeJS access to the underlying OS filesystem, networking and some aspects of concurrency + more.
 
```shell
Javascript Code We Write
└── Node JS
    └── V8
    └── libuv
```

What is the purpose of NodeJS instead of the dependencies? 

Some of the dependencies are not all JavaScript. V8 is ~70% C++ and libuv is 100% C++.

The other thing Node does is set a consistent set of wrappers ie `http`, `fs`, `path`, `crypto` etc which is mostly wrappers for the `libuv` project.

By makin use of NodeJS, we don't have to worry about the underlying C++.

## Module Implementations

To understand this, we can:

1. Pick a function in Node standard library
2. Find where its implemented in the Node source code
3. See how V8 and libuv are used to implement that function

The example here we will use is `pbkdf2`, which is the name of a hashing algorithm found within Nodejs' 'crypto' library.

How does the implementation work? Looking through `github.com`, we see that we pass a `password`, `salt` and `other options`.

When checking the Nodejs Github account, we can check `lib` as the JavaScript side of the project, while `src` is the C++ implementation of all those functions - this is where `Node` pulls in `libuv`.

You'll notice in the `pbkdf2` JavaScript function, it returns `_pbkdf2` which itself does a bunch of error checking until you get to a block of code that calls `PBKDF2`. This function `PBKDF2` is where C++ handles the function.

You can see `PBKDF2` is required from `process.binding('crypto')` - that line is where the magic happens between binding C++ to the JavaScript.

```shell
Javascript Code We Write
└── Nodes JS side (lib folder in repo)
 └── process.binding() # connects JS and C++ functions
   └── V8 # converts values between JS and C++ world
      └── Nodes C++ side (src folder in repo)
        └── libuv # gives Node easy access to underlying OS
```

## C++ In Node

Within the `src` directory of the Node project on Github, we can find the JS equivalent `.cc` file for the module `node_{module-name}.cc`.

In the case before, we could check `node_crypto.cc` for the Crypto module.

## Where does V8 and libuv come into play?

Within the `.cc` files, you'll see a lot of `using v8::{name}` where `v8` allows us to import the C++ definition of JavaScript concepts.

`libuv` is harder to see the presence. If you search `uv` you'll find works like `uv_work_t` where `libuv` is used heavily for concurrency.

Note that there is a lot of interopability between `v8` and the `libuv` project.

## The Basics of Threads

When you run something up on the computer, you run a process.

Within a process, you can have multiple things called "threads" that you can think of as a "todo list" for the CPU to complete.

A single process can have multiple threads inside of it. You can tell this is possible thanks to things such as `Activity Monitor` which tells you the number of processes and threads.

`Scheduling` refers to the OS ability to decide which thread to process at any given time. This becomes relevant with many processes and threads running.

The `OS Scheduler` makes sure no important threads don't wait too long.

There are strategies to help with the process that these `threads` get processed.

One approach is the include more CPU Cores. With more cores, we can process multiple threads in parallel.

Note: Technically one core can process more than one thread at a time through a process known as `multithreading` (sometimes called `hyperthreading`).

While one thread is processing and waiting for an asynchronous reply, the OS scheduler can schedule another thread for work. This is important for the Nodejs event loop.

## The Nodejs Event Loop

The event loop is used by Node to handle asynchronous code written in our applications.

When we start up a Node program, Node automatically creates one thread and executes all code on that one thread.

The `event loop` itself is like a control structure that tells the one thread what it should be doing at any given time.

Every program that we run has exactly one `event loop`. This is extremely important to know in order to understand how the program behaves which in turn will help us with performance issues.

Understanding it is not easy - but it is notoriously difficult to wrap your head around.

Instead of looking at complicated diagrams, we will write some pseudocode to emulate the event loop.

```javascript
// node myFile.js
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // Node does three checks

  // Check 1: Are there any functions registers with setTimeout, setInterval or setImmediate?

  // Check 2: Check if there are any pending OS tasks eg http server listening to requests on some port

  // Check 3: Are there any pending long running operations still being executed eg function call inside the fs module

  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// pseudo mocking the event loop "tick" for each iteration - executes entire body in one "tick"
while(shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called (setTimeout, setInterval)

  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

  // 3) Node pauses execution temporarily and sits around waiting for new events to occur. Continue when ...
  // - a new pendingOSTask is done
  // - a new pendingOperation is done
  // - a timer is about to complete

  // 4) Node again looks at pendingTimers. (does not care about setTimeout, setInterval - only setImmediate). Call any setImmediate.

  // 5) Handle any 'close' events eg readStream.on('close', callback)
}

// exit back to terminal
```

## Is Node Single Threaded?

- Node `Event Loop` = single threaded
- Some of Node `Framework/Std Lib` = NOT single threaded

The `Event Loop` itself is truly single threaded. This is commonly seen as a bad thing, as the event loop can only run on one CPU core.

However, some of the functions included in the standard library of Node are not single threaded - they run outside of the event loop.

Example:

```javascript
// thread.js
const crypto = require('crypto');

const start = Date.now();

// note both following calls will be invoked at the same time
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});
```

You'll notice that you'll get two benchmarks that are very similar in time.

If it were single threaded, we would have expected the times to not be so similar.

This indicates that we are breaking out of a single threaded function with Nodejs.

This is thanks to the `libuv` thread pool.

## The Libuv Thread Pool

All the work from the `crypto.pbkdf2` function is delegated to Node's C++ side.

The `libuv` module has a responsibility for some expensive standard library functions to be handled outside of the event loop.

These functions make use of the thread pool. It's a series of four threads that can be used for computationally expensive tasks. These are in addition to the event loop.

Many of the standard library functions make use of this thread pool.

In order to test when the thread loop is full:

```javascript
// thread.js
const crypto = require('crypto');

const start = Date.now();

// note both following calls will be invoked at the same time
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});
```

Note that the result we get is that some logs happen almost simultaneously (but with double the amount of time), where there is a pause before other results come through. This is the thread pool itself in action.

## Changing Threadpool Size

```javascript
// thread.js
process.env.UV_THREADPOOL_SIZE = 2; // tells libuv to only create two threads in the thread pool

const crypto = require('crypto');

const start = Date.now();

// note both following calls will be invoked at the same time
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});
```

You'll notice that the timing now happens even quicker for the first two calls. Customising the thread pool here has worked in our favour.

If we did this using the value of `5`, we notice that all 5 calls complete at a similar time but with a longer timeframe for all to return from completion.

## Common Threadpool Questions

1. Can we use the threadpool for JS code or can it only be used with certain NodeJS functions? We can write custom JS code that uses the thread pool.
2. What functions in `node std lib` make use of the threadpool? All FS module function, some crypto stuff. Depends on OS (Windows vs Unix based).
3. How does this threadpool stuff fit into the event loop? Tasks running in the threadpool are the `pendingOperations` in the pseudocode example.

## Explaining OS Operations + Libuv OS Delegation

What are the `pendingOSTasks` that we talk about in the pseudocode?

We will explain this by using another benchmark.

```javascript
// async.js
const https = require('https');

const start = Date.now();

function doRequest() {
  https.request('https://www.google.com', res => {
     res.on('data', () => {});
     res.on('end', () => {
       console.log(Date.now() - start);
     });
   }).end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
```

It appears as if all the `doRequest` calls are completed at near the same time - distinctly different behaviour to the thread pool given we ran the request six times.

What we're seeing here is more evidence of `libuv` in play, but it is not the thread pool. It also have some function that make use of the underlying operating system.

Neither `libuv` nor `node` has the operations to handle the request making. It is actually the real operating system making the http request. Because the work is delegating to the operating system, the OS decides on whether to make a new thread or not. We're not touching the thread pool at all in this case.

## Commmon OS/Async Questions

1. What functions in `node std lib` use the OS's async features? Almost everything around networking for all OS's. Some other stuff is OS specific.
2. How does this OS Async stuff fit into the event loop? Tasks using the underlying OS are reflected in our `pendingOSTasks` array.

## Crazy Node Behaviour

```javascript
// multitask.js
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https.request('https://www.google.com', res => {
     res.on('data', () => {});
     res.on('end', () => {
       console.log('HTTPS:', Date.now() - start);
     });
   }).end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:' Date.now() - start);
});

// specifically called 4 times
doHash();
doHash();
doHash();
doHash();
```

Note that the `fs` call exhibits some really interesting behaviour. Given the `libuv` threadpool of 4, the OS scheduler and core threading.

The answers deals with the pausing times required for the `fs.readFile` function.

Given the size of the thread pool, the `fs` call would be assigned to thread #1, while the next three `doHash` calls were assigned to the other threads. 

Thread #1 then loads up the last `doHash` call while thread #1 offloads the `fs.readFile` to the hard drive until the callback completes.

Once thread #2 finishes the work, it checks if any info has come back from the `hard drive` (which it has), so the `fs.readFile` function the completes. Note: it does have a second pause callback, but given the worker thread was free, it was able to handle the second response straight away.

Note that setting `process.env.UV_THREADPOOL_SIZE = 5;` would allow `fs` to have a spare thread to complete quickly with the other four `doHash` calls finishing at a similar timeframe, whereas `process.env.UV_THREADPOOL_SIZE = 1;` would block the `fs` call from finishing until right at the end. 