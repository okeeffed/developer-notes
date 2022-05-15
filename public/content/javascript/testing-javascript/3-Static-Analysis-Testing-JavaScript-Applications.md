# Static Analysis Testing JavaScript Applications

## Auto-format all files and validate relevant files in a precommit script with lint-staged

In this example, the `editor.formatOnSave` was turned off for the demonstration.

With an example of bad formatting, the pre-commit hook that validate format fails. We can remedy this with `lint-staged`.

```s
$ npm i -D lint-staged
$ touch .lintstagedrc
```

In `.lintstagedrc`:

```json
{
	"*.+(js|ts|tsx)": [
		"eslint"
	],
	"**/*.+(js|json|ts|tsx)": [
		"prettier --write",
		"git add"
	]
}
```

The example then updates `.huskyrc` to change the `pre-commit` hook to `lint-staged`.

## Run multiple npm scripts in parallel with npm-run-all

```s
$ npm i -D npm-run-all
```

The example npm `validate` script was the updated:

```json
{
	"scripts": {
		"validate": "npm-run-all --parallel check-types check-format lint build"
	}
}
```