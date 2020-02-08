---
menu: Stripe
name: Product Line
---

# Product Line

## Resources

1. [Stripe website](https://stripe.com/)

## Products

1. Payments - Full platform for online payments
2. Billing - Smart invoicing and subscription management
3. Connect - Multi-party acceptance and payouts
4. Sigma - a powerful way to query business data
5. Atlas - a easy-to-use platform for forming a company
6. Radar - fraud protection
7. Issuing - toolkit for managing and creating cards (US invite only)
8. Terminal - Stripe payments to point of sale (US only)

## Payments

Integrate online payments using the Stripe APIs and client libraries.

The `Charges` API is the older API that is no longer worked on, while `PaymentIntents` is the newer API that supports:

1. Automatic auth handling
2. No double charges
3. No idempotency key issues
4. Support for Strong Customer Authentication (SCA) and similar regulatory changes

### How cards work

1. Checking card details
2. Customer authentication
3. Authorization
4. Capture

## Billing

Smart invoicing and subscription management. Build and scale the recurring business model.

### Billing Features

- Different blocks for billing:
  1. Flat rate: for a standard, flat cost subscription
  2. Multiple plans: for composing bills
  3. Per seat: cost per user
  4. Usage based: tiered billing
  5. Flat rate + overage: extra charges for exceeded quota
- End-to-end billing: Once set up, you can manage subscriptions + invoices directly from the dashboard.
- Protect your revenue, simplify PSD2 compliance
- Webhook notifications
- Billing proration
- Renewal rules

## Connect

Everything platforms need to get sellers paid. It is the solution for businesses that needs to process payments and pay out to sellers and service providers.

> Stripe Connect provides a powerful API and other tools you need to accept payments, as well as onboard, verify, and pay sellers and service providers.

### Connect Features

- Specifying how money moves from the customer to you, and ultimately to your platform’s sellers or service providers
- Collecting fees for your service
- Assigning payout schedules and payout methods
- Supporting different types of Stripe accounts

### Connect Use Cases

- Crowdfunding services, like Kickstarter and Ulule
- E-commerce platforms, like Shopify and Squarespace
- Marketplaces, like OfferUp and Catawiki
- On-demand services, like Lyft and Glovo
- Invoicing solutions, like Xero
- Booking platforms, like OpenTable
- Travel and event providers, like Tito Travel and Musement
- Extensions on Stripe, like Segment and Avalara

## Sigma

Sigma allows you to use SQL queries to create custom reports from all of the transational data.

### Sigma Features

- Viewing/downloadng query results
- Query history
- Templates with example queries to use
- Data availability within one day
- Ability to join tables on a `foreign key`
- Can save + share queries

## Atlas

A seamless way to start your company in the U.S. It helps entrepreneurs launch a startup.

## Radar

Stripe Radar is a suite of modern tools to help you fight fraud. It’s fully integrated into your payments flow and you can start using it without any additional development time.

At the center of Stripe Radar is a machine learning system that provides real-time transaction scoring based upon thousands of signals about each incoming card payment.

> If you’ve integrated with Stripe Checkout, Payment Intents, or Setup Intents, you may also use Stripe Radar to dynamically prompt your customers for authentication with 3D Secure, giving you a liability shift against fraudulent payments that have been verified by the card issuer.

### Radar Features

- Risk evaluation
- Risk settings
- Reviews
- Lists
- Rules

### Radar Implementation

If you use one of three different Stripe API objects for payments (Charges, PaymentIntents and SetupIntents), Radar's rules are design to take 4 different actions:

- Request 3DS authentication
- Allow the creation of the object
- Block the creation of the object
- Review the creation of a Charge
