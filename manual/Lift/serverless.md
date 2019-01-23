---
name: Serverless
menu: Lift 
---
# Serverless Lift

## Prequisites

`npm i -g serverless` to install the serverless framework.

Create a basic `up.yml` file:

```bash
serverless:
  - express:
      name: hello-lift-express
      routes:
        - base
```

Requirements from the base file of the app:

```bash
#!/bin/bash
yarn init -y
kratos init
kratos store lift _lift
kratos store express-routes routes
kratos install lift serverless
lift up
shotgun run
touch .env
```

We should now be up and running! GET and POST reqs to / should be all you need to verify this.

## Local development

```bash
ndb index.local.js
// or
node index.local.js
// or
nodemon index.local.js
// or best
ndb nodemon index.local.js
```

## Deployment

```bash
sls deploy
```

## .env variables

Put all .env variales in `serverless.env.yml`.
