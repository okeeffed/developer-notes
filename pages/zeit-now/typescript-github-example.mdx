---
menu: Zeit Now
name: TypeScript + Github Example
---

# TypeScript + Github Example

In this example, we are going to create a Zeit Now project that we can use to update files on a repo based on what is passed.

## Setting up

Initialise a project in a folder `yarn init -y`.

Prerequisites:

```shell
mkdir project
cd project
yarn init -y # or npm
npm i -g now # or yarn
mkdir api
touch api/example.ts tsconfig.json now.json .env .gitignore test.json
yarn add --dev @now/node @types/js-base64
yarn add @octokit/rest js-base64
```

## API Setup

Add the following to `api/example.ts`:

```typescript
import { NowRequest, NowResponse } from '@now/node';
import Octokit from '@octokit/rest';
import { Base64 } from 'js-base64';

const gh = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const owner = 'your_github_user_name';

// some helper functions for creating a repo
// and writing a file - we won't update in this example
const createOrUpdateFile = async (
  repo: string,
  content: string,
  sha?: string,
) => {
  try {
    return gh.repos.createOrUpdateFile({
      owner,
      repo,
      sha,
      path: 'hello.json',
      message: 'Updating the Hello JSON file',
      content: Base64.encode(JSON.stringify(content)),
    });
  } catch (err) {
    // basic handling
    console.error(err.message);
    return undefined;
  }
};

const createRepo = async (repo: string) => {
  try {
    await gh.repos.createForAuthenticatedUser({
      name: repo,
      private: true,
    });
  } catch (err) {
    // basic handling
    console.error(err.message);
    return undefined;
  }
};

export default async (_req: NowRequest, res: NowResponse) => {
  const { repoName, content } = _req.body;
  const repo = await fetchRepo(repoName);
  await createRepo(repoName);
  const sha = upFile ? upFile.data.sha : undefined;
  const updatedJson = await createOrUpdateFile(repoName, content, sha);
  res.status(200).send({ success: true });
};
```

## TSConfig

Add this is tsconfig.json (taken from [this Zeit Now example](https://github.com/zeit/now-examples/blob/master/gatsby-functions/tsconfig.json)):

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es2015"],
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true
  }
}
```

## Git Ignore

Ignore npm modules + .env where we will store the local key in our `.gitignore` file:

```shell
node_modules/
.env
```

## Dotenv

In the `.env` file, add a personal GitHub token that we will use for authentication. This token is required for programmatic operations via the API.

If you need to create one, [follow this article from the GitHub site](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

```shell
GITHUB_TOKEN=TOKEN_VALUE
```

## Now.json

We will use `now.json` to help define some env variables.

```github
{
  "name": "project-name",
  "version": 2,
  "env": {
    "GITHUB_TOKEN": "@github-token"
  }
}
```

## Test JSON

For what we will upload, add this to `test.json`:

```json
{
  "hello": "world"
}
```

## Local Development

Now we can develop locally. Run `now dev` to get localhost running on port 3000.

Once the port is running, we can ping `http://localhost:3000/api/example` and pass some params to generate a new repo and add some JSON.

In this example, I am using [HTTPie](https://httpie.org/doc#json) and running `http POST localhost:3000/api/example repoName=temp-zeit-a content:=@test.json` on the command line will lead to the creation of a new private repo `temp-zeit-a` with content from the `test.json` local file saved into the `hello.json` file on the repo.

Hooray!

## Production

To deploy to production, we simply run `now`.

## Moving forward

Updating the file on Github requires the SHA, so use the other Octokit methods to help with all of these issues.
