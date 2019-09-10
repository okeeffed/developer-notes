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