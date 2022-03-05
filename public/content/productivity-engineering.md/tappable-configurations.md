---
name: Tappable Configurations
menu: Productivity Engineering
---

# Productivity Engineering

Below is some code that attempts to emulate what happens with Webpack.

```js
class HelloWorldPlugin {
  constructor() {
    this.name = 'HelloWorldPlugin';
  }

  apply(taskRunner) {
    taskRunner.hooks.beforeRun.tapSync(() => {
      console.log('Running things before everything else');
    });

    taskRunner.hooks.done.tapSync((
      stats /* stats is passed as an argument when done hook is tapped.  */,
    ) => {
      console.log('DONE! Hello World!');
    });
  }
}

class GoodbyeWorldPlugin {
  constructor(context) {
    this.name = 'GoodbyeWorldPlugin';
    this.context = context;
  }

  apply(taskRunner) {
    taskRunner.hooks.beforeRun.tapSync(() => {
      if (this.context) {
        console.log(this.context);
      }
    });
  }
}

class SyncHook {
  constructor(name) {
    this.name = name;
  }

  tapSync = fn => {
    this.tapSync = fn;
  };

  compile() {
    try {
      this.tapSync();
    } catch (err) {
      // do nothing
    }
  }
}

const hook = hookName => (pluginName, callback) => {
  console.log(`[${pluginName}] ${hookName}`);
  callback();
};

class TaskRunner {
  constructor(context) {
    this.hooks = Object.freeze({
      done: new SyncHook('done'),
      beforeRun: new SyncHook('beforeRun'),
    });

    this.context = context;
  }

  run() {
    this.hooks.beforeRun.compile();
    this.hooks.done.compile();
  }
}

// emulated module.exports from `webpack.config.js`
const config = {
  plugins: [
    new HelloWorldPlugin(),
    new GoodbyeWorldPlugin({
      options: true,
    }),
  ],
};

// emulated lib code assuming it imports from `webpack.config.js`
for (const plugin of config.plugins) {
  const task = new TaskRunner();
  plugin.apply(task);
  task.run();
}
```
