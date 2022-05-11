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
const path = require('path')
module.exports = {
	...require('./jest-common'),
	coverageDirectory: path.join(__dirname, '../coverage/server'),
	testEnvironment: 'test-environment-node',
	testMath: ['**/__server_tests__/**/*.js']
}
```

In `test/jest.client.js`:

```js
const path = require('path')
module.exports = {
	...require('./jest-common'),
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['...']
	// ... The rest is added
}
```

Now when running tests, you need to specify the path to the correct config.

```s
# For running client tests
$ npx jest --config test/jest.client.js
```

## Support Running Multiple Configurations with Jest's Projects Features

Kent starts with a reference to the madness of the number of test scripts required for the different client/server configurations.

## Test Specific Projects in Jest Watch Mode with jest-watch-select-projects

## Run only relevant Jest Tests on Git Commit to avoid breakages