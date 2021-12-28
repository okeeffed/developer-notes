---
name: Stripe React + Node.js
menu: Stripe
---

# Using Stripe with Node.js

## Resources

1. [Payment Migration Guide](https://stripe.com/docs/payments/payment-intents/migration)
2. [Payment Intents](https://stripe.com/docs/payments/payment-intents)
3. [Stripe.js Docs](https://stripe.com/docs/js/payment_intents/confirm_card_payment)
4. [React Stripe Elements GitHub](https://github.com/stripe/react-stripe-elements)

## Intro

This will show how to make payments without needing card details to hit the server using Payment Intents. There is two sections to this:

1. Node Express server
2. React App

## Prereqs

- Ensure you have a Stripe account
- Basic knowledge on Express.js
- Basic knowledge for `create-react-app`

## 1. The Express Server

```shell
mkdir server
cd server
yarn init -y # skip yarn init with defaults for now
yarn add express body-parser stripe cors morgan
```

Configure the .env file to contain your Stripe key (we're only using the test key for now):

```shell
SK_TEST_KEY=sk_test...
```

Create `index.js` and add the following:

```javascript
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(process.env.SK_TEST_KEY);

const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const morgan = require('morgan');
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


// basic route create a payment intent
app.post('/api/v1/create', async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'aud',
    payment_method_types: ['card'],
  });
  res.json({ intent: intent.client_secret });
});

app.post('/api/v1/charge', async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 1600,
    currency: 'aud',
  });
  res.json(charge);
})

// basic route create a setup intent
app.post('/api/v1/setup-intent', async (req, res) => {
    payment_method_types: ['card'],
  });
  res.json({ intent: intent.client_secret });
});

// basic route to receive and log a webhook
app.post('/api/v1/events/webhook', (req, res) => {
  console.log('@ Webhook received', req.body);
  res.json({ status: 'success' });
});

app.listen(port, () =>
  console.log(`Stripe example app listening on port ${port}!`),
);
```

For testing the webhook URL, we can use the Stripe CLI (unless you want to setup the webhook for your account):

```shell
stripe listen --forward-to localhost:8080/hooks # listen for events and forward to local URL
stripe trigger payment_intent.created # trigger a payment_intent.created event
stripe payment_intents create --amount=100 --currency=usd # create a payment intent from the CLI
```

## 2. For the React App

```shell
npx create-react-app react-stripe
cd react-stripe
yarn add axios
```

As for the code, you can create `Stripe.js` in the main directory and change the `StripeProvider` publishable API key with your own.

We are using axios here to chat to the Express server.

The code looks as follows:

```javascript
import React from 'react';
import { render } from 'react-dom';

import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';
import axios from 'axios';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize: string, padding: ?string) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        ...(padding ? { padding } : {}),
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CreatePaymentMethod extends React.Component {
  state = {
    error: null,
    processing: false,
    message: null,
  };

  handleSubmit = ev => {
    ev.preventDefault();
    if (this.props.stripe && this.props.elements) {
      this.props.stripe
        .createPaymentMethod({
          type: 'card',
          card: this.props.elements.getElement('card'),
        })
        .then(payload => {
          if (payload.error) {
            this.setState({
              error: `Failed to create PaymentMethod: ${payload.error.message}`,
              processing: false,
            });
            console.log('[error]', payload.error);
          } else {
            this.setState({
              message: `Created PaymentMethod: ${payload.paymentMethod.id}`,
              processing: false,
            });
            console.log('[paymentMethod]', payload.paymentMethod);
          }
        });
      this.setState({ processing: true });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          stripe.createPaymentMethod
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        {this.state.error && <div className="error">{this.state.error}</div>}
        {this.state.message && (
          <div className="message">{this.state.message}</div>
        )}
        <button disabled={this.state.processing}>
          {this.state.processing ? 'Processing…' : 'Create'}
        </button>
      </form>
    );
  }
}

const CreatePaymentMethod = injectStripe(_CreatePaymentMethod);

class _HandleCardPayment extends React.Component {
  state = {
    clientSecret: null,
    error: null,
    disabled: false,
    succeeded: false,
    processing: false,
    message: null,
  };

  handleSubmit = async ev => {
    ev.preventDefault();
    if (this.props.stripe && this.props.elements) {
      const res = await axios.post('http://localhost:8080/api/v1/create');
      this.props.stripe
        .confirmCardPayment(res.data.intent, {
          payment_method: {
            card: this.props.elements.getElement('card'),
          },
        })
        .then(payload => {
          if (payload.error) {
            this.setState({
              error: `Charge failed: ${payload.error.message}`,
              disabled: false,
            });
            console.log('[error]', payload.error);
          } else {
            this.setState({
              succeeded: true,
              message: `Charge succeeded! PaymentIntent is in state: ${payload.paymentIntent.status}`,
            });
            console.log('[PaymentIntent]', payload.paymentIntent);
          }
        });
      this.setState({ disabled: true, processing: true });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          stripe.confirmCardPayment
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        {this.state.error && <div className="error">{this.state.error}</div>}
        {this.state.message && (
          <div className="message">{this.state.message}</div>
        )}
        {!this.state.succeeded && (
          <button disabled={this.state.disabled}>
            {this.state.processing ? 'Processing…' : 'Pay'}
          </button>
        )}
      </form>
    );
  }
}

const HandleCardPayment = injectStripe(_HandleCardPayment);

class _HandleCardSetup extends React.Component {
  state = {
    clientSecret: null,
    error: null,
    disabled: false,
    succeeded: false,
    processing: false,
    message: null,
  };

  handleSubmit = async ev => {
    ev.preventDefault();
    if (this.props.stripe && this.props.elements) {
      const res = await axios.post('http://localhost:8080/api/v1/setup-intent');
      this.props.stripe
        .confirmCardSetup(res.data.intent, {
          payment_method: {
            card: this.props.elements.getElement('card'),
          },
        })
        .then(payload => {
          if (payload.error) {
            this.setState({
              error: `Setup failed: ${payload.error.message}`,
              disabled: false,
            });
            console.log('[error]', payload.error);
          } else {
            this.setState({
              succeeded: true,
              message: `Setup succeeded! SetupIntent is in state: ${payload.setupIntent.status}`,
            });
            console.log('[SetupIntent]', payload.setupIntent);
          }
        });
      this.setState({ disabled: true, processing: true });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          stripe.confirmCardSetup
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        {this.state.error && <div className="error">{this.state.error}</div>}
        {this.state.message && (
          <div className="message">{this.state.message}</div>
        )}
        {!this.state.succeeded && (
          <button disabled={this.state.disabled}>
            {this.state.processing ? 'Processing…' : 'Setup'}
          </button>
        )}
      </form>
    );
  }
}

const HandleCardSetup = injectStripe(_HandleCardSetup);

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({ elementFontSize: '18px' });
      }
    });
  }

  render() {
    const { elementFontSize } = this.state;
    return (
      <div className="Checkout">
        <h1>React Stripe Elements with PaymentIntents</h1>
        <Elements>
          <CreatePaymentMethod fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <HandleCardPayment fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <HandleCardSetup fontSize={elementFontSize} />
        </Elements>
      </div>
    );
  }
}

const StripeApp = () => {
  return (
    <StripeProvider apiKey="pk_test_...">
      <Checkout />
    </StripeProvider>
  );
};

export default StripeApp;
```
