---
menu: Stripe
name: Rails Stripe Configuration
---

# Rails Stripe Configuration

## References

1. [Using Rails for API only](https://guides.rubyonrails.org/api_app.html)
2. [Stripe Ruby Github](https://github.com/stripe/stripe-ruby)
3. [Dotenv Ruby Github](https://github.com/bkeepers/dotenv)
4. [Scaffolding routes](http://www.xyzpub.com/en/ruby-on-rails/3.2/scaffold_anlegen.html)
5. [HTTP Requests in Rails Apps](https://thoughtbot.com/blog/back-to-basics-http-requests)
6. [Action Controlller Overview](https://guides.rubyonrails.org/v5.2/action_controller_overview.html)

## Getting Started

Assuming you have Rails installed, run the following:

```shell
rails new ruby-rails-stripe
cd ruby-rails-stripe
```

Add the following to the top of your `Gemfile` for us to read local dotenv values and bundle Stripe.

```ruby
gem 'dotenv-rails', groups: [:development, :test]
gem 'stripe'
```

On the console, run `bundle`.

## Scaffolding the Charges Route

From the console run:

```shell
rails generate controller Charges create
```

This will scaffold our `app/controllers/charges_controller.rb` controller.

Inside that, let's update the code:

```ruby
require 'stripe'

class ChargesController < ApplicationController
  # POST /charge
  # POST /charge.json
  def create
    # `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
    charge = Stripe::Charge.create({
      amount: params[:amount],
      currency: 'aud',
      source: 'tok_amex',
      receipt_email: params[:receipt_email],
      description: 'My First Test Charge (created for API docs)',
    })
    render json: charge
  end
end
```

This code will make a charge to Stripe using the JSON body params `amount` and `receipt_email`.

If the charge is successful, it will return the charge information as JSON.

## Updating config/routes.rb

Ensure routes has the following for POST:

```ruby
Rails.application.routes.draw do
  # ... the rest is omitted for brevity
  post 'charges/create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```

This ensures that we can send a POST request to `http://localhost:PORT/charges/create` when we run the server.

## Running the code

Run `rails server` to get our server up and running (defaulting to 3000), then call `http POST http://localhost:3000/charges/create amount:=1700 receipt_email=hello_rails@example.com` (using HTTPie) and we will get back our charge results sent as JSON. Hooray!
