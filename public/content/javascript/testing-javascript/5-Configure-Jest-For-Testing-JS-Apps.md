# 5: Configure Jest for Testing JavaScript Applications

## Support a test utilities file with Jest moduleDirectories

## Run Jest Watch Mode by default with is-ci-cli

```s
$ npm i -D is-ci-cli
```

Then the test script can be updated in `package.json`:

```json
{
  "scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch\""
  }
}
```

This will run the `test:coverage` script if `CI=1`.

## Run tests with a different config using Jest's --config flag and testMatch option

What happens if we want server-only tests that don't require certain DOM libraries loaded?

The common configuration was put in a file `test/jest-common.js` while new files were added `test/jest.client.js` and `test/jest.server.js`.

In `test/jest.server.js`:

```js
const path = require("path");
module.exports = {
  ...require("./jest-common"),
  coverageDirectory: path.join(__dirname, "../coverage/server"),
  testEnvironment: "test-environment-node",
  testMath: ["**/__server_tests__/**/*.js"],
};
```

In `test/jest.client.js`:

```js
const path = require("path");
module.exports = {
  ...require("./jest-common"),
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["..."],
  // ... The rest is added
};
```

Now when running tests, you need to specify the path to the correct config.

```s
# For running client tests
$ npx jest --config test/jest.client.js
```

## Support Running Multiple Configurations with Jest's Projects Features

Kent starts with a reference to the madness of the number of test scripts required for the different client/server configurations.

We can add a `jest.config.js` file again at the root of the app.

Inside of this, we can add the following:

```js
module.exports = {
  ...require("./test/jest-common"),
  // ... other configuration standards
  // ...
  projects: ["./test/jest.client.js", "./test/jest.server.js"],
};
```

This will run all the tests from the different projects with totally different configurations.

> Note: To make it easier to differentiate between the projects, you can update the individual project configure to have a `displayName` in the config.

## Test Specific Projects in Jest Watch Mode with jest-watch-select-projects

This helps us to deal with the noise when running watch mode.

```s
$ npm i -D jest-watch-select-projects
```

In `test/jest-common` we can add the plugin to the `watchPlugins` array in the config.

The plugin adds the option `P` to use in watch mode to get a UI where we can select which projects to select.

## Filter which tests are run with Typeahead Support in Jest Watch Mode

```$
$ npm i -D jest-watch-typeahead
```

This needs to be added to the watch plugins:

```js
watchPlugins: [
  // others ...
  "jest-watch-typeahead/filename",
  "jest-watch-typeahead/testname",
];
```

We then get a list of the files that match the output and we can head type and run those specific files. The same can be for the names of the tests.

## Run only relevant Jest Tests on Git Commit to avoid breakages

This section uses `husky` and `lint-staged` to configure some Jest test runs.

The `lint-staged` config set is the following:

```
{
	"lint-staged": {
		"**/*.+(js|json|css|html|md)": [
			"prettier",
			"jest --findRelatedTests",
			"git add"
		]
	}
}
```
