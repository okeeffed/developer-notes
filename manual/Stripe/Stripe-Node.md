---
name: Stripe Node
menu: Stripe
---

# Using Stripe with Node

## Prereqs

1.  Sign up
2.  `yarn add stripe` to your Node.js Project
3.  Build out a server

## Example Express configuration

Configure the .env file and upload

[Node Stripe Github](https://github.com/stripe/stripe-node)

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.SK_TEST_KEY);

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// create a payment intent
app.post('/api/v1/create', (req, res) => {
  res.send('Success');
});

// receive and log webhooks
app.post('/api/v1/events/webhook', (req, res) => {
  console.log('@ Webhook received', req.body);
  res.send('Success');
});

app.listen(port, () =>
  console.log(`Stripe example app listening on port ${port}!`),
);
```
