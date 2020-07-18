---
menu: Next
name: NextJS Lambda w/ Express Server
---

# NextJS Lambda w/ Express Server

Not huge amounts of info here.

```js
// server.js

const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/', (req, res) => {
      return app.render(req, res, '/', req.params);
    });

    server.get('/about', (req, res) => {
      return app.render(req, res, '/about', req.params);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.log(ex);
    process.exit(1);
  });
```

## Resources

1. [Deploy NextJS to Lambda](https://moondaddi.dev/post/2019-01-11-Deploy-Nextjs-app-to-AWS-Lambda/)
2. [AWS Serverless Express](https://github.com/awslabs/aws-serverless-express)
3. [AWS Vault](https://github.com/99designs/aws-vault)
