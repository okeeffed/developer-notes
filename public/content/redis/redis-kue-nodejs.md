---
name: Redis queues and forking with Kue
menu: Redis
---

# Redis queues and forking with Kue

Reference these links:

https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917
https://medium.com/@niratattri/workers-and-node-kue-it-up-1c1215d9bddf
https://github.com/Automattic/kue

## tl;dr

```javascript
const { fork } = require('child_process');

const kue = require('kue');
kue.app.listen(3050);
const port = process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379';
const host = process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1';

let queue = kue.createQueue({
  redis: {
    host: host,
    port: port
  }
});

queue.process('build', 1, (job, done) => {
  run(job, done);
});

const run = async (job, done) => {
  try {
    const { data } = job.data;
    // process is a forked process
    const compute = fork('./processes/buildWeb.js');
    compute.send(data);

    compute.on('message', (_) => {
      return done();
    });
  } catch (err) {
    console.error(err);
    return done(new Error(JSON.stringify(err)));
  }
};

module.exports = (app) => {
  app.post('/', async function(req, res) {
    try {
      // Create a fork for a process
      const buildJob = queue
        .create('build', {
          // Job Type
          project: project, // Job Data
          data: req.body
        })
        .removeOnComplete(true) // REMOVE THE JOB FROM THE QUEUE ONCE IT'S COMPLETED
        .attempts(5) // The maximum number of retries you want the job to have
        .backoff({ delay: 60 * 1000, type: 'exponential' }) // Time between retries. Read docs.
        .save(); // PERSIST THE DAMN JOB LOL

      buildJob.on('failed', function(errorMessage) {
        console.log('Job failed');
        let error = JSON.parse(errorMessage);
        // error now contains the object passed from the worker when the job failed
        console.log(error); // Check it out for yourself
        // call pagerduty or whatever jazz you wanna do in case of failure
      });

      res.status(200).send('Building ' + project);
    } catch (err) {
      return res.status(500).send('Failed');
    }
  });
};

// buildWeb.js
const run = async (data) => {
  try {
    setTimeout(() => {
      process.send('Done');
    }, 3000);
  } catch (err) {
    console.error(err);
  }
};

process.on('message', (data) => {
  run(data);
});
```
