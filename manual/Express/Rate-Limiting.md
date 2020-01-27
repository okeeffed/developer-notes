---
menu: Express
name: Rate Limiting
---

# Rate Limiting

## Resources

1. [Express Rate Limit](https://github.com/nfriedly/express-rate-limit)

## tl;dr

For `index.js`:

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 8080;`

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.get('/', (_, res) => res.send('RESPONSE_SUCCESS'));

app.listen(port, () => console.log('Server started'));
```

For `index.test.js`:

```javascript
const execa = require('execa');

describe('rate limiter server', () => {
  test('expects GET / to return "Success"', async () => {
    const { stdout } = await execa('ab', [
      '-n',
      '200',
      '-v',
      '3',
      'http://localhost:8080/',
    ]);
    const matches = stdout.match(/RESPONSE_SUCCESS/g);
    expect(matches.length).toEqual(100);
  });
});
```
