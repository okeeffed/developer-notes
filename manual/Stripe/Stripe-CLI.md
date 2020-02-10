---
menu: Stripe
name: Stripe CLI
---

# Stripe CLI

## Resources

1. [Stripe CLI Docs](https://stripe.com/docs/stripe-cli)
2. [Stripe CLI GitHub Wiki](https://github.com/stripe/stripe-cli/wiki/commands)
3. [Supported Stripe Events](https://github.com/stripe/stripe-cli/wiki/trigger-command#supported-events)
4. [Stripe CLI - Samples Wiki](https://github.com/stripe/stripe-cli/wiki/samples-command)

## tl;dr

```shell
# helpers
stripe listen --forward-to localhost:5000/hooks # listen for events and forward to local URL
stripe trigger payment_intent.created # trigger a payment_intent.created event
stripe payment_intents create --amount=100 --currency=usd # create a payment intent from the CLI
# samples
stripe samples create accept-a-card-payment # accept a card payment
stripe samples list # list example types
```

## Supported events

```md
balance.available
charge.captured
charge.dispute.created
charge.failed
charge.refunded
charge.succeeded
checkout.session.completed
customer.created
customer.deleted
customer.source.created
customer.source.updated
customer.subscription.created
customer.subscription.deleted
customer.subscription.updated
customer.updated
invoice.created
invoice.finalized
invoice.payment_failed
invoice.payment_succeeded
invoice.updated
payment_intent.amount_capturable_updated
payment_intent.canceled
payment_intent.created
payment_intent.payment_failed
payment_intent.succeeded
payment_method.attached
setup_intent.canceled
setup_intent.created
setup_intent.setup_failed
setup_intent.succeeded
```
