---
menu: Conventional Commits
name: Automating Versioning
---

# Automating Versioning

## Resources

1. [Automate Versioning blog post](https://medium.com/@jsilvax/automate-semantic-versioning-with-conventional-commits-d76a9f45f2fa)

## For local packages

The following is the tl;dr for getting this done.

```shell
yarn add husky @commitlint/cli @commitlint/config-conventional standard-version --dev
```

## Updating package.json

For the release script:

```json
"scripts" : {
  "release" : "standard-version"
}
```

For commit lint:

```json
"commitlint": {
 "extends": [
   "@commitlint/config-conventional"
 ],
 "rules": {
   "subject-case": [
     2,
     "never",
     [
       "start-case",
       "pascal-case"
     ]
   ]
 }
}
```

For Husky (with some examples from another project). The follow expects a generation of the `CHANGELOG.md` pre-push and also to run the test suite prior to deploy:

```json
"husky": {
  "hooks": {
    "pre-push": "yarn release && yarn test",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```
