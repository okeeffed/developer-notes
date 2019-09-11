---
menu: Nodejs
name: Enhancing Nodejs Performance
---

# Enhancing Nodejs Performance

We're going to look at two ways to improve performance:

1. Using Node in 'Cluster' Mode
2. Using Worker Threads

The recommended approach would be using `cluster` mode, whereas worker threads are way more experimental.

## Test App

We'll use a tiny express server for playing around.

```javascript
// app.js
const express = require('express');
const app = express();

function doWork(duration) {
  const start = new Date.now();
  while (Date.now() - start < duration) {
    // do nothing else
  }
}

app.get('/', (req, res) => {
  doWork(5000);
  res.send('Hello');
});

app.listen(3000);
```

This app will be continually updated to show the performance updates.

## Blocking the Event Loop

Keep in mind:

```shell
[Single Thread]
Request => Node Server => Response
```

We start to run into issues here when our request requires a lot of processing power (in the example app, this will be the function `doWork`).

Note that with the `doWork` function call, we are blocking the entire event loop. **This blocks the entire server from handling other requests.**

## Clustering in Theory

```shell
Cluster Manager
  => Single Threaded Node Server
  => Single Threaded Node Server
  => Single Threaded Node Server
```

The `cluster manager` is only responsible for monitoring the health of individual `node server` instances. It will still be up to the instances to handle the request handling and processing.

```shell
# RUN node app.js
└── app.js  ===================> Worker Instance
    └──  Cluster Manager
        └── cluster.fork() # forks app.js
```

## Forking Children With Cluster

When running the manager, note that Node will first run all the JavaScript code in the file and then startup the `Cluster Manager`. We want to ensure there is at least one scenario with the forked app running as expected.

```javascript
// app.js
const cluster = require('cluster');
// Is file executed in the master mode?
if (cluster.isMaster) {
  // Cause app.js to be executed again but in child mode
  cluster.fork();
} else {
  // Child - operate as normal server
  const express = require('express');
  const app = express();

  function doWork(duration) {
    const start = new Date.now();
    while (Date.now() - start < duration) {
      // do nothing else
    }
  }

  app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hello');
  });

  app.listen(3000);
};
```

If we add multiple `cluster.fork()` calls, we can have multiple instances of the server ready to run.

## Benchmarking Server Performance

For benchmarking, we will use a program called `ab`. (Available for MacOS)

Usage: `ab -c 50 -n 500 localhost:3000/fast` where `-c` is 50 concurrent requests and `-n` indicates 500 requests.

In the bottom code, we're going show how you can get diminishing returns by adding more children. It is important that we keep a threadpool size of `1` for this example.

```javascript
// app.js
process.env.UV_THREADPOOL_SIZE = 1; // just for benchmarking purposes
const cluster = require('cluster');
// Is file executed in the master mode?
if (cluster.isMaster) {
  // Cause app.js to be executed again but in child mode
  cluster.fork();
} else {
  // Child - operate as normal server
  const crypto = require('crypto');
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hello');
    })
});

  app.listen(3000);
};
```

If we run `ab -c 1 -n 1 localhost:3000/` we will see that we get a `Time taken for tests` to be ~1000ms.

We can see the timing of this is similar to the example for `crypto` we had in `Nodejs/Node Interals` when demoing the `crypto` module.

If we run `ab -c 2 -n 2 localhost:3000/`, we see that one requests took 1s, while the other took 2s. This is similar to what we saw in `Node Internals`. Given the one thread, we see that the second request needs to wait for the first request to be released from the threadpool.

If we update our code to add another child process using `cluster.fork();`, we will notice that both the requests now get processed in the two child processes (STILL USING ONE THREAD) and have come back with the expected time ~1000ms.

### What happens with too many children?

If we forked six processes and ran `ab -c 6 -n 6 localhost:3000/` we will see that for some reason, we are now taking 3.5 seconds for each of the 6 requests across the board.

Why is this? It depends on the kind of computer that you have. Note that for the example above, it was run on a dual-core CPU. That's because the CPU is now trying to do a little bit of work on all 6 threads. So although we could now process the children in parallel, we have overallocated our resources.

If we now reduced the forked processes to 2 and still ran `ab -c 6 -n 6 localhost:3000/`, we will notice that the slowest request is still around 3.4s, while our fastest request is now ~1s. This is because at a cluster with two children, we know that we can at most handle two requests at the same time. 

Essentially, the first two requests are processed in the first second, the next two in the second, the last two in the third - this makes perfect sense. This means that we have ended with a far better performance profile.

## PM2 Configuration

PM2 can supercharge our clustering setup. PM2 makes cluster management super easy for Nodejs. It can be installed through `npm` globally using `npm i -g pm2`.

To run the script in `pm2`, we need to update our app once again.

```javascript
// app.js

// Child - operate as normal server
const crypto = require('crypto');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
 crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
   res.send('Hello');
 })
});

app.listen(3000);
```

`pm2 start index.js -i 0` will tell pm2 to auto-configure how many instances to setup based on the amount of logical cores (physical * virtual cores) are available.

| Call                    | Definition                                    |
| ----------------------- | --------------------------------------------- |
| pm2 monit               | Show pm2 monitor                              |
| pm2 list                | List all pm2 processes                        |
| pm2 start index.js -i 0 | Start index.js with auto-configured instances |
| pm2 delete index        | Delete all index children                     |

`pm2` is generally used in production environments only.

## Web Worker Threads

At the time of writing - these were in experimental phase.

In this example, we are using the module `webworker-threads`.

```shell
Our App
└── Worker Interface (communicates with Worker)
    └── postMessage <===> onmessage (Worker)
    └── onmessage <===> postMessage (Worker)
```

The `Worker` itself is working on its own thread. Remember: a lot of the Nodejs standard lib functions ALREADY work on their own thread. You only really want to use it for your own heavy-duty business logic.

Note: any function passed to the worker cannot access the parent scoped variables. It is also important to use the function keyword on purpose.

```javascript
// app.js
const Worker = require('webworker-threads').Worker;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      // emulate heavy work
      let counter = 0;
      whilte (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    }
  });

  worker.onmessage = function(counter) {
    console.log(counter);
    res.send('' + message.data); // casting as send requires string
  }

  worker.postMessage();
});

app.listen(3000);
```

For benchmarking these workers, we can again use `ab`. `ab -c 1 -n 1 localhost:3000/` and `ab -c 2 -n 2 localhost:3000/` should run with similar results on a dual-core Mac. 