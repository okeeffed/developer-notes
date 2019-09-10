---
menu: Nodejs
name: Advanced Concepts
---

# Nodejs Advanced Concepts

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

One approach is the include more CPU Cores. Technically one core can process more than one thread at a time through a process known as `multithreading` (sometimes called `hyperthreading`).

## The Event Loop

The event loop is used by Node to handle asynchronous code written in our applications.