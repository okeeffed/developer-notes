---
menu: Next
name: Next Auth with local MySQL Container
---

## Resources

1. [Next.js - Getting Started](https://nextjs.org/docs/getting-started)
2. [Next Auth](https://next-auth.js.org/providers/credentials)
3. [Set up a GitHub OAuth Application](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)
4. [Ngrok alternative - PageKite](https://pagekite.net/)
5. [Docker - mysql/mysql-server](https://hub.docker.com/r/mysql/mysql-server/)

## Setting up MySQL with Docker

This example demonstrates a setup and expects you to understand some basics behind Docker containers.

```shell
docker pull mysql/mysql-server
docker run --name sql-test -e MYSQL_ROOT_PASSWORD=password -p 6000:3306 -d mysql/mysql-server:latest
# confirm container running
docker ps
```

You should see something like the following:

```s
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS                            PORTS                               NAMES
30be83a35610        mysql/mysql-server:latest   "/entrypoint.sh mysq…"   6 seconds ago       Up 2 seconds (health: starting)   33060/tcp, 0.0.0.0:6000->3306/tcp   sql-test
```

We have the server port forwarding from 3306 on the container to 6000 for us to access on localhost.

```s
# where 30be83a35610 is there CONTAINER ID
docker exec 30be83a35610 -it /bin/bash
```

This will take you into the Docker container shell, where we can login into MySQL.

```s
mysql -u root -p
# enter "password" when prompted
```

> You can go straight into mysql from the docker exec, but I thought going the long way might be more fun for those playing around with containers.

Now we can create a database to use for this example.

```sql
create database next_auth;
show databases;
-- you should now be able to see "next_auth"
```

In order to get things going, you may need to make some changes. I had to do the following.

```sql
UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='root';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

> Note: Using the root isn't a great idea, but this is simply for demonstration purposes and to get things up and running.

For here, you can `exit` the MySQL shell and run `exit` it again to leave the Docker container.

### Setting up Next.js

```shell
npx create-next-app
```

Fill out the defaults for it and get it loading.

```shell
yarn add next-auth mysql dotenv
```

> We are using "dotenv" for loading a local `.env` file for local development.

Here, we are just going to use [GitHub OAuth](https://next-auth.js.org/providers/github) for logging in.

## Setting up Next Auth in the application

Create a file `pages/api/auth/[...nextauth].js`.

Add the following:

```javascript
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

require('dotenv').config();

const options = {
  site: process.env.SITE || 'http://localhost:3000',

  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
```

Create a page `pages/index.js`:

```javascript
import React from 'react';
import { useSession } from 'next-auth/client';

export default () => {
  const [session, loading] = useSession();

  return (
    <p>
      {!session && (
        <>
          Not signed in <br />
          <a href="/api/auth/signin">Sign in</a>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <a href="/api/auth/signout">Sign out</a>
        </>
      )}
    </p>
  );
};
```

That is all we need to do for the application! We won't start running anything just yet

## Setting up ngrok

We are using tunneling to forward our localhost address out to the big, bad world.

```s
ngrok http 3000 # will forward 3000 out
```

Once you run that, you will get an address to use.

## Setting up GitHub OAuth

Follow the guide on how to set up a [GitHub OAuth Application](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

We will need to grab both the ID and the token given back.

> Note: For the authentication callback, you will need to keep the format `{server}/api/auth/callback/{provider}`. This will be the ngrok server address.

## Env Variables

```shell
GITHUB_ID=<from-github>
GITHUB_SECRET=<from-github>
# The MySQL database being forwarded from Docker,
# where 'next_auth' is the database we created
DATABASE_URL="mysql://root:password@127.0.0.1:6000/next_auth?synchronize=true"
SITE=<ngrok-server>
```

## Running Dev

Now is the fun part.

```shell
yarn dev
```

If we head to `http://localhost:3000`, we will see the application, however we want to head to the ngrok address instead in our case.
