---
name: Sandbox
menu: Braintree 
---
# Getting started with the Braintree Sandbox

Published: October 5th 2018

Braintree is one of those methods to get started with payments.

I've been looking for alternatives to Stripe more for comparisons sake to see what would be easiest to implement and more relevant to what I am trying to achieve en masse down the road.

This is a small hello world into getting up and running with Braintree using Express on the serverside and React on the frontend.

## Prerequisites

If you are following along, you should sign up for a Sandbox account.

This tutorial will use create-react-app and a user contributed npm module to abstract some of the time required for setup.

Another useful link comes from [their website for Node.js and JS](https://developers.braintreepayments.com/start/tutorial). Although I will be deterring away from it, it is still a useful reference.

We are going to treat this project as a monorepo for now, so in the root directory we need to create a subdirectory for the frontend and a directory for the server.

## Building the Express server

### Installation

```bash
mkdir server
cd server
yarn init -y
yarn add express body-parser morgan cors dotenv braintree
mkdir routes
touch server.js .env .gitignore routes/index.js
```

### .gitignore

For the sake of doing things right, let's just quickly update our file to ignore `node_modules` and the `.env` file.

```bash
.env
node_modules/
```

### .env

Here we need to update our file with the sandbox tokens given to us from the Braintree sandbox environment. The keys and configuration can be found on your Braintree dashboard:

```bash
BRAINTREE_MERCHANT_ID=<use_your_merchant_id>
BRAINTREE_PUBLIC_KEY=<use_your_public_key>
BRAINTREE_PRIVATE_KEY=<use_your_private_key>
```

Now we can use `dotenv` in our app to access the variables and keep them out of our git history.

### server.js

To set up the main server, update the server.js file to look like so:

```javascript
// Add variables from dotenv into process.env vars
require('dotenv').config();

// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

// Routes Setup
const routes = require('./routes');

// App Setup
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add routes after setting up middleware
routes(app);

// Server Setup
const port = process.env.NODE_ENV == 'production' ? 80 : 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
```

This `server.js` file will load the `routes/index.js` file, which we will now update.

### routes/index.js

Let's now update our `routes/index.js` to take setup the gateway and setup three routes - one for a simple ping test, another for fetching a client token and a third for making a payment:

```javascript
const braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

module.exports = function(app) {
  app.get('/braintree', function(req, res) {
    res.send('Braintree route is healthy');
  });

  app.get('/api/braintree/v1/getToken', async function(req, res) {
    try {
      gateway.clientToken.generate({}, function(err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post('/api/braintree/v1/sandbox', async function(req, res) {
    try {
      // Use the payment method nonce here
      var nonceFromTheClient = req.body.paymentMethodNonce;
      // Create a new transaction for $10
      var newTransaction = gateway.transaction.sale(
        {
          amount: '10.00',
          paymentMethodNonce: nonceFromTheClient,
          options: {
            // This option requests the funds from the transaction once it has been
            // authorized successfully
            submitForSettlement: true
          }
        },
        function(error, result) {
          if (result) {
            res.send(result);
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (err) {
      // Deal with an error
      console.log(err);
      res.send(err);
    }
  });
};
```

Now if we run `node server.js`, we should have our app up and running on port 5000!

We can run `curl http://localhost:5000/braintree` from another terminal to see our `Braintree route is healthy` response.

Now we need to set up the clientside.

## Building the React frontend

### React Installation

```bash
create-react-app clientside
cd clientside
yarn add braintree-web braintree-web-drop-in-react axios
```

### Updating the app

Go to our App.js file and clean it out. Replace the file with the following:

```javascript
import React, { Component } from 'react';
import './App.css';
import 'braintree-web';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';

class App extends Component {
  instance;

  state = {
    clientToken: null
  };

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get(
        'http://localhost:5000/api/braintree/v1/getToken'
      );
      const clientToken = response.data.clientToken;

      this.setState({ clientToken });
    } catch (err) {
      console.error(err);
    }
  }

  async buy() {
    try {
      // Send the nonce to your server
      const { nonce } = await this.instance.requestPaymentMethod();
      const response = await axios.post(
        'http://localhost:5000/api/braintree/v1/sandbox',
        nonce
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{
              authorization: this.state.clientToken
            }}
            onInstance={(instance) => (this.instance = instance)}
          />
          <button onClick={this.buy.bind(this)}>Buy</button>
        </div>
      );
    }
  }
}

export default App;
```

This code is a variation of the intro code found on the [Braintree Web Drop-in React Github intro](https://github.com/cretezy/braintree-web-drop-in-react).

If we run `yarn start` we should load up the React app on locahost and you should be able to see the following:

![React Frontend](https://res.cloudinary.com/gitgoodclub/image/upload/v1538698065/samples/braintree-one.png 'React Frontend')

If that is the case, perfect! We are ready to roll.

### Making the payment

The following comes directly from the [Node.js quickstart for Braintree](https://developers.braintreepayments.com/start/tutorial).

```bash
Card number: 4111 1111 1111 1111
Expiry: 09/20
CVV: 400
Postal Code: 40000
```

If we insert both the card number and expiry, that should be enough for us to get to the end of the road! After inserting and making the payment, our front end should look like the following:

![Payment made](https://res.cloudinary.com/gitgoodclub/image/upload/v1538698064/samples/braintree-two.png 'Payment made')

Opening up `devtools`, we can even inspect the response object we are logging to see our great success!

![Devtools](https://res.cloudinary.com/gitgoodclub/image/upload/v1538698065/samples/braintree-three.png 'Devtools')

Bingo!

### The server terminal

If we checkout the server terminal, we should be able to see how events went down thanks to Morgan doing our logging:

![Express App](https://res.cloudinary.com/gitgoodclub/image/upload/v1538698063/samples/braintree-four.png 'Express App')

The image above can help us fully understand the process. When our frontend app loads, we make a `GET` request to fetch the token from `/api/braintree/v1/getToken`. This token is required for when that final payment request was made. The `OPTIONS` 204 request we see there secondly is a CORS preflight request made to ensure we are allowed to make the call and finally and `POST` 200 to `/api/braintree/v1/sandbox` is our success response after making the payment.

## Confirmation

If we now go back to our Sandbox dashboard, we can now see the successful transaction has been recorded!

![Success](https://res.cloudinary.com/gitgoodclub/image/upload/v1538698732/braintreedashboard.png 'Success')

Very cool. We just went from 0 to payment in a short amount of time.

## Next steps

What's next? Something I like about Braintree is UI extensibility. Although we used a frontend package on this occassion, try building out your own UI for taking payments!

Whether or not you are a fan of Braintree or Stripe really is up to you and your business needs at the end of the day. It is worth looking up both the pros and cons of the developer docs and the rates to decide what is best for your specific usecase (or any other payment platform for that case).

Original post: https://www.dennisokeeffe.com/blog/braintree-node-react

Git repo: https://github.com/okeeffed/hello-braintree

_**Depth** is a series that goes into more detail for projects than it's friendly counterpart series "Hello"._
