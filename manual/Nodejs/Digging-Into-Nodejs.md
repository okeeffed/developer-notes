---
menu: Nodejs
name: Digging Into Nodejs
---

# Digging Into Nodejs

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/digging-into-node/)
2. [GitHub Stream handbook](https://github.com/substack/stream-handbook)
3. [readable.pipe](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options)
4. [Cancelable Async Functions - GitHub](https://github.com/getify/caf)

## Streams

There are two stream modes that are known as "simplex" (unidirectional):

1. Read/readable stream that you can consume.
2. Write/writeable stream that they can receive inputs and you can write to them.

There is also a "duplex" stream that is bidirectional (can be written to and read from). Duplex is not covered in this course.

```javascript
var stream1; // readable
var stream2; // writeable

// "Take my readable stream and pipe it to my writeable"
var stream3 = stream1.pipe(stream2); // chunks at a time using binary buffers
```

> Think of streams as gardens hoses that you want to be able to connect things to.

It is important to know that a return value from a `.pipe` call stream is another readable stream.

This also means that we can keep chaining and piping as many writables as possible as possible.

```javascript
var stream1; // readable
var stream2; // writeable

// "Take my readable stream and pipe it to my writeable"
// stream1 into stream2 into stream5 into final
var stream3 = stream1
  .pipe(stream2)
  .pipe(stream5)
  .pipe(final); // chunks at a time using binary buffers
```

### Creating the read stream

```javascript
let stream = fs.createReadStream('path/to/file');
processFile(stream);

function processFile(inStream) {
  var outStream = inStream;
  var targetStream = process.stdout;
  outStream.pipe(targetStream); // pipe to process.stdout
}
```

> This difference here is that we don't keep the entire file in the buffer.

## Transform Stream

```javascript
// other requires omitted for brevity
var Transform = require('stream').transform;

let stream = fs.createReadStream('path/to/file');
processFile(stream);

function processFile(inStream) {
  var outStream = inStream;

  var upperStream = new Transform({
    // Note: next is a callback
    transform(chunk, enc, next) {
      this.push(chunk.toString().toUpperCase());
      // Only using set time out to prove stream.
      // Normally you just call next().
      setTimeout(next, 500);
    },
  });

  outStream = outStream.pipe(upperStream);

  var targetStream = process.stdout;
  outStream.pipe(targetStream); // pipe to process.stdout
}
```

## Outputting to file

```javascript
// other requires omitted for brevity
var Transform = require('stream').transform;

let stream = fs.createReadStream('path/to/file');
processFile(stream);

function processFile(inStream) {
  var outStream = inStream;

  var upperStream = new Transform({
    // Note: next is a callback
    transform(chunk, enc, next) {
      this.push(chunk.toString().toUpperCase());
      // Only using set time out to prove stream.
      // Normally you just call next().
      setTimeout(next, 500);
    },
  });

  outStream = outStream.pipe(upperStream);

  var targetStream;

  if (args.out) {
    targetStream = process.stdout;
  } else {
    targetStream = fs.createWriteStream('path/to/file');
  }

  outStream.pipe(targetStream); // pipe to process.stdout
}
```

## gzip Compression with zlib

A common transformation is the unzip, process them, then rezipping it.

```javascript
// other requires omitted for brevity
var Transform = require('stream').transform;
var zlin = require('zlip');

let stream = fs.createReadStream('path/to/file');
processFile(stream);

function processFile(inStream) {
  var outStream = inStream;

  // handling compressed files
  if (args.uncompress) {
    let gunzipStream = zlib.createGunzip();
    outStream = outStream.pipe(gunzipStream);
  }

  var upperStream = new Transform({
    // Note: next is a callback
    transform(chunk, enc, next) {
      this.push(chunk.toString().toUpperCase());
      next();
    },
  });

  outStream = outStream.pipe(upperStream);

  // Compression code!
  if (args.compress) {
    let gzipStream = zlin.createGzip();
    // adding additional stream
    outStream = outStream.pipe(gzipStream);
    // ensure name output changes
    OUTSTREAM_NAME = `${OUTSTREAM_NAME}.gz`;
  }

  var targetStream;

  if (args.out) {
    targetStream = process.stdout;
  } else {
    targetStream = fs.createWriteStream('path/to/file');
  }

  outStream.pipe(targetStream); // pipe to process.stdout
}
```

> Gzip was designed for streams, that is why it is so easy.

> Note that for `vi out.txt.gz` that Vim automatically unzips it for you!

## Determining End of Stream

```javascript
// building a helper
function streamComplete(stream) {
  return new Promise(function c(res) {
    stream.on('end', res);
  });
}

async function processFile(inStream) {
  var outStream = inStream;

  // handling compressed files
  if (args.uncompress) {
    let gunzipStream = zlib.createGunzip();
    outStream = outStream.pipe(gunzipStream);
  }

  var upperStream = new Transform({
    // Note: next is a callback
    transform(chunk, enc, next) {
      this.push(chunk.toString().toUpperCase());
      next();
    },
  });

  outStream = outStream.pipe(upperStream);

  // Compression code!
  if (args.compress) {
    let gzipStream = zlin.createGzip();
    // adding additional stream
    outStream = outStream.pipe(gzipStream);
    // ensure name output changes
    OUTSTREAM_NAME = `${OUTSTREAM_NAME}.gz`;
  }

  var targetStream;

  if (args.out) {
    targetStream = process.stdout;
  } else {
    targetStream = fs.createWriteStream('path/to/file');
  }

  outStream.pipe(targetStream); // pipe to process.stdout

  await streamComplete(outStream);
}
```

## Asynchronous Cancellation & Timeouts

```javascript
var CAF = require('caf');

processFile = CAF(processFile);

function* processFile(signal, inStream) {
  var outStream = inStream;

  // handling compressed files
  if (args.uncompress) {
    let gunzipStream = zlib.createGunzip();
    outStream = outStream.pipe(gunzipStream);
  }

  var upperStream = new Transform({
    // Note: next is a callback
    transform(chunk, enc, next) {
      this.push(chunk.toString().toUpperCase());
      next();
    },
  });

  outStream = outStream.pipe(upperStream);

  // Compression code!
  if (args.compress) {
    let gzipStream = zlin.createGzip();
    // adding additional stream
    outStream = outStream.pipe(gzipStream);
    // ensure name output changes
    OUTSTREAM_NAME = `${OUTSTREAM_NAME}.gz`;
  }

  var targetStream;

  if (args.out) {
    targetStream = process.stdout;
  } else {
    targetStream = fs.createWriteStream('path/to/file');
  }

  outStream.pipe(targetStream); // pipe to process.stdout

  signal.pr.catch(function f() {
    outStream.unpipe(targetStream);
    outStream.destroy(); // kill the stream process
  });

  yield streamComplete(outStream);
}

// later
let tooLong = CAF.timeout(3); // cancel at 3
processFile(tooLong, stream)
  .then(() => console.log('Complete'))
  .catch(error);
```

## Child Processes

```javascript
const childProc = require('child_process');
async function main() {
  var child = childProc.spawn('node', ['index.js']);
  child.on('exit', function(code) {
    console.log('Child finished', code);
  });
}
```

### Exit Codes

The commands are based on POSIX standards.

| Code | Meaning |
| ---- | ------- |
| 0    | Success |
| 1    | Fail    |

You can use `process.exitCode(value)` in the child processes to communicate back.
