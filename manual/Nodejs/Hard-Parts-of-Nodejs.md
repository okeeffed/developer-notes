---
menu: Nodejs
name: The Hard Parts of Servers & Node.js
---

# The Hard Parts of Servers & Node.js

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/servers-node-js/)
2. [Course Slides](https://static.frontendmasters.com/resources/2019-04-24-servers-node-js/Hard-Parts-Servers-Node.pdf)
3. [Node.js Stream documentation](https://nodejs.org/api/stream.html#stream_stream)
4. [setImmediate docs](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args)
5. [Node.js event loop](https://nodejs.org/uk/docs/guides/event-loop-timers-and-nexttick/)
6. [Node API](https://nodejs.org/api/)
7. [Node Cluster documentation](https://nodejs.org/api/cluster.html)

## Streams

What if Node used the 'event' (message-broadcasting) pattern to send out a message ('event') each time a sufficient batch of the data had been loaded in? This is the idea behind streams.

Streams bring in the event loop and callback queue in Nodejs.

> The default size of batches in a stream is 64kB.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // `req` is an http.IncomingMessage, which is a Readable Stream.
  // `res` is an http.ServerResponse, which is a Writable Stream.

  let body = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added.
  req.on('data', chunk => {
    body += chunk;
  });

  // The 'end' event indicates that the entire body has been received.
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh! bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

server.listen(1337);

// $ curl localhost:1337 -d "{}"
// object
// $ curl localhost:1337 -d "\"foo\""
// string
// $ curl localhost:1337 -d "not json"
// error: Unexpected token o in JSON at position 1
```

Alternative to the above, you can process the chunks on the `data` event instead of doing it all at the end:

```javascript
let cleanedTweets ''

function cleanTweets(tweetsToClean) {
  // algo to remove bad tweets from tweetsToClean
}

// fires after each batch comes through!
function doOnNewBatch(data) {
  cleanedTweets += cleanTweets(data)
}

const accessTweetsArchive = fs.createReadStream('./tweetsArchive.json')
accessTweetsArchive.on('data', doOnNewBatch)
```

The "callback queue" comes into play to ensure that any data coming through on the next batch does not trigger the callback straight away with the new data. The function with the next batch is stored to this callback queue and the event loop pulls it off the queue once the previous work is done.

> All these streaming events do not share the same queue.

Note: once the stream is done, it will run the `close` event. Note that everything comes in as a buffer.

## Async Node

Here are some important definitions to know:

- Call stack: JavaScript keeps track of what functionis being run and where it was run from. Whenever a function is to be run, it’s added to the call stack.
- Callback queue: any functions delayed from running (and run automatically by Node) are added to the callback queue when the background Node task has completed (or there’s been some activity like a request)
- Event loop: Determines what function/code to run next from the queue(s)

> Here is there things: there are a bunch of different queues and the event loop is very restrictive about what is allow on the call stack.

What order is the following code run?

```javascript
function useImportedTweets(errorData, data) {
  const tweets = JSON.parse(data);
  console.log(tweets.tweet1);
}
function immediately() {
  console.log('Run me last!');
}
function printHello() {
  console.log('Hello');
}
function blockFor500ms() {
  // Block JS thread DIRECTLY for 500 ms
  // With e.g. a for loop with 5m elements
}
setTimeout(printHello, 0); //  printHello goes to Timer Queue
fs.readFile('./tweets.json', useImportedTweets); // useImportedTweets goes to I/O queue
blockFor500ms();
console.log('Me first');
setImmediate(immediately); // immediately added to Check Queue
```

Note that in the above and because of what happens with async Node, the order to be fired is that `blockFor500ms` will run, then the `printHello` function will come off the timer queue, then `useImportedTweets` from the I/O queue, then `immediately` from the check queue.

## Queue Rules

1. Hold each deferred function in one of the task queues when the Node background API 'completes'
2. Add the function to the Call stack (i.e. execute the function) ONLY when the call stack is totally empty (Have the Event Loop check this condition)
3. Prioritize functions in Timer 'queue' over I/O queue, over setImmediate ('check') queue

### Timer Queue

- `useSetTimeout` is an example of something in the timer queue that runs through libuv.

### I/O Queue

- Examples functions from the `fs` module.
- Network socket is another example.

### Check Queue

- `setImmediate` is a under the check queue.

### Microtask

The Microtask queue that comes with Promises is actually prioritised over the top of the others, and between it there is also two types.

1. `process.nextTick()` would get put in the first type of queue.
2. Other promises would be put in the other part.

### Close Queue

The "close" handle queue is used for close events.
