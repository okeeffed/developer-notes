---
menu: Node.js
title: Benchmarking in Node.js
---

This article [The State of Benchmarking in Node.js](https://www.webpro.nl/articles/the-state-of-benchmarking-in-nodejs) is quite useful to follow.

It also points to a library like [mitata](https://github.com/evanwashere/mitata) which is used by Bun and Deno.

## A simple example

First, set up a new project:

```sh
$ mkdir demo-mitata-benchmarking
$ cd demo-mitata-benchmarking
$ npm init -y
$ mkdir src
$ touch src/example.mjs
```

As for the code within `src/example.mjs`

```js
import { run, bench, group, baseline } from 'mitata'

function add(x, y) {
	return x + y;
}

function add2(x) {
	return add(x, 2);
}

group('add', () => {
	baseline('add', () => add(1, 2));
	bench('add2', () => add2(1));
})

await run();
```

Running the results:

```sh
$ node src/example.mjs
cpu: Apple M2 Pro
runtime: node v20.10.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• add
------------------------------------------------- -----------------------------
add           461 ps/iter     (386 ps … 57.43 ns)    448 ps    570 ps   4.23 ns
add2         3.84 ns/iter    (3.64 ns … 40.18 ns)   3.84 ns   7.55 ns   9.99 ns

summary for add
  add
   8.32x faster than add2
```