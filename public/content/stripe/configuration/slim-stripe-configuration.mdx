---
menu: Stripe
name: Configuring Stripe for PHP and Slim
---

# Configuring Stripe for PHP and Slim

## Resources

1. [Composer installation](https://getcomposer.org/download/)
2. [Getting started with Slim](http://www.slimframework.com/docs/v4/start/installation.html)
3. [Request Object - Slim](http://www.slimframework.com/docs/v4/objects/request.html)
4. [PHP Exceptions](https://www.php.net/manual/en/language.exceptions.php)
5. [Receiving input into a Slim 4 application](https://akrabat.com/receiving-input-into-a-slim-4-application/)
6. [PHP Dotenv](https://github.com/vlucas/phpdotenv)
7. [Stripe PHP Github](https://github.com/stripe/stripe-php)
8. [Stripe API](https://stripe.com/docs/api)
9. [getParsedBody Slim](https://hotexamples.com/examples/slim.http/Request/getParsedBody/php-request-getparsedbody-method-examples.html)

## Get Started

Ensure `composer` is installed correctly and run the following. Note that you need to ensure that the downloaded `composer.phar` file from the installation instructions must be in your `$PATH` as `composer`.

```shell
mkdir slim-stripe && cd slim-stripe
composer require slim/slim:"4.*"
# required to enable App::Run() etc without manual ServerRequest
composer require slim/psr7
# installing for Stripe
composer require stripe/stripe-php
# required to read dotenv vars
composer require vlucas/phpdotenv
mkdir -p src/public
touch src/public/index.php
touch .env
```

To check Slim is up and working, add this to `src/public/index.php`:

```php
<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});

$app->run();
```

Once completed, change into `src/public` and run `php -S localhost:8080`.

If we now ping `curl localhost:8080` we will see our `Hello world!` response.

## Setting up .env

Our `.env` file should contain our keys for development. Get these from your Stripe Developer dashboard.

Add the following to the `.env` file in the root of your project directory:

```shell
SK_TEST_KEY= sk_test...
PK_TEST_KEY=pk_test...
```

## Making a simple charge with Stripe API

Let us update `src/public/index.php` to take a simple request to make a charge to our Stripe account.

```php
<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$stripeKey = getenv('SK_TEST_KEY');
\Stripe\Stripe::setApiKey($stripeKey);

$app = AppFactory::create();

// Parse json, form data and xml
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});

$app->post('/api/charge', function (Request $request, Response $response, $args) {
  try {
    $data = $request->getParsedBody();

    // parse attributes from JSON
    $receiptEmail = $data['receiptEmail'];
    $amount = $data['amount'];

    // create the charge
    $charge = \Stripe\Charge::create([
      'amount' => $amount,
      'currency' => 'usd',
      'source' => 'tok_visa',
      'receipt_email' => $receiptEmail
    ]);

    $response->getBody()->write('Successful charge');
    $response->withStatus(201);
    return $response;
  } catch (Exception $e) {
    $response->getBody()->write('Failed charge');
    $response->withStatus(500);
    return $response;
  }
});

$app->run();
```

Note that in the above example we are loading keys from `.env`, setting the Stripe API key, then using Slim 4's body parsing middleware to help us with parsing the request body from JSON.

If we run `http POST http://localhost:8080/api/charge amount:=500 receiptEmail=hello@example.com` (using HTTPie) from the console, we will get our `Successful charge` message back.

We can head to our dashboard on Stripe and head to `Developers > Events` to see the log of our successful charge for `US$5.00`. Hooray!
