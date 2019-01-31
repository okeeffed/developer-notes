---
name: Node.js SaaS with Stripe
menu: Stripe
---

# Node.js SaaS with Stripe

The basics plan is to:

1. Create a test customer for the subscription.
2. Create a product.
3. Create a plan for that product.
4. Create a subscription for that plan.
5. Repeating for a few products.
6. Writing a test script to do all this.
7. Fetching back a list of subscriptions for that particular user.
8. Writing out an example using Express servers.

## Building out the base functions to use for the Express app

```javascript
// controllers/stripe/index.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create a new customer based off an email address.
 *
 * @param {string} email
 * @returns {Promise} Result of attempting to create a customer.
 */
function customerCreate(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const customer = await stripe.customers.create({ email: email });
      resolve(customer);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Register a new product.
 * @example
 * {
 * name: 'My SaaS Platform',
 * type: 'service'
 * }
 *
 * @param {Object} data Name and type of product
 * @returns {Promise} Request to create new product
 */
function productCreate(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await stripe.products.create(data);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Create a new plan with a product.
 * @example
 * {
 * currency: 'usd',
 * interval: 'month',
 * product: 'prod_id',
 * nickname: 'Pro Plan',
 * amount: 12
 * }
 *
 * @param {*} data
 * @returns
 */
function planCreate(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await stripe.plans.create(data);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Create a new subscription for a user based on * a plan.
 * @example
 * {
 * customer: 'customer_id',
 * items: [
 *   {
 *     plan: 'plan_abc',
 *     quantity: 2
 *   }
 * ]
 * }
 *
 * @param {*} data
 * @returns
 */
function subscriptionCreate(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await stripe.subscriptions.create(data);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Fetch the subscription list.
 * @example
 * {
 * { limit: 99 },
 * customer: 'cus_id'
 * }
 *
 * @param {*} data
 * @returns
 */
function subscriptionList(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await stripe.subscriptions.list(data);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
```
