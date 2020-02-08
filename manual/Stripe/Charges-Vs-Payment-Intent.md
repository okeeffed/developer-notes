---
menu: Stripe
name: Charges vs Payment Intents
---

# Charges vs Payment Intents

## Resources

1. [Stripe Documentation](https://stripe.com/docs/payments/payment-intents/migration/charges)
2. [Setup Intents](https://stripe.com/docs/payments/setup-intents)

## How it works

There are three ways to accept payments on Stripe today:

1. Stripe Checkout
2. Charges API
3. Payment Intents API

## Stripe Checkout

> A prebuilt payment page that you can redirect your customer to for simple purchases and subscriptions. It provides many features, such as Apple Pay, Google Pay, internationalization, and form validation.

## Charges vs Payment Intents

The Charges and Payment Intents APIs let you build custom payment flows and experiences.

We designed the Payment Intents API to be the unifying API for all Stripe products and payment methods. While we are not deprecating Charges, we plan to focus product development on Payment Intents to make it the foundational Stripe API.

## Setup Intents

Use the Setup Intents API to set up a payment method for future payments. Similar to a payment, but no charge is created.

> The goal is to have payment credentials saved and optimized for future payments, meaning the payment method is configured correctly for any scenario. When setting up a card, for example, it may be necessary to authenticate the customer or check the card’s validity with the customer’s bank. Stripe updates the SetupIntent object throughout that process.
