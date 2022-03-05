---
name: Hosting NPM packages on GitHub
menu: GitHub
---

# Hosting NPM packages on GitHub

## Resources

1. [Example repo](https://github.com/Codertocat/hello-world-npm)
2. [About GitHub Packages](https://docs.github.com/en/packages/publishing-and-managing-packages/about-github-packages)

## Create an Access Token on GitHub

On GitHub, head to `Settings > Developer > Personal Access Tokens` and create a new one with:

1. Repo access
2. Read package access
3. Write package access
4. Delete package access (optional)

Copy the token and add it to `~/.npmrc` with the value `//npm.pkg.github.com/:_authToken=add-token-here`.

Now log into the registry:

```s
$ npm login --registry=https://npm.pkg.github.com
> Username: YOU_GITHUB_USERNAME
> Password: YOUR_GITHUB_TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

## Publishing the first package

Head to the [hello-world-npm repo](https://github.com/Codertocat/hello-world-npm) and fork it into your own GitHub account.

Once forked, let's clone it into your local. That should be `git clone https://github.com/your-username/hello-world-npm.git`.

Change into that directory and open it up into an editor. We want to make some changes to `package.json`:

```json
{
  "name": "@your-username/hello-world-npm",
  "version": "1.0.2",
  "description": "A simple npm package to demonstrate GitHub Package Registry",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/hello-world-npm.git"
  },
  "author": "Your name",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/your-username/hello-world-npm/issues"
  },
  "homepage": "https://github.com/your-username/hello-world-npm#readme",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```

Save and let's commit this and push back up.

```s
git add package.json
git commit -m "feat: Updating package details"
git push
```

Finally, let's publish the package!

```s
npm publish
```

Bingo! We should be ready to roll.

## Installing the package

Let's start a new Nodejs project.

```s
mkdir hello-first-pkg
cd hello-first-pkg
# init with basic details
yarn init -y
touch index.js .npmrc
```

We need to add `@your-username:registry=https://npm.pkg.github.com` to the `.npmrc` file to tell it to look for your packages.

Then run `nnpm i @your-username/hello-world-npm`.

This should successfully install. Once happy, let's test it out! Add the following inside `index.js`:

```javascript
const myPackage = require('@your-username/hello-world-npm');
myPackage.helloWorld();
```

We are now all set to try it out! Run `node index.js` and we'll get our glorious response!

```s
> node index.js
Hello World!
```

The important part from all of this is to ensure that you have correctly configured `package.json` for your NPM packages.
