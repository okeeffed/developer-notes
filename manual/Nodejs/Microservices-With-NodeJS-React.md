---
menu: Nodejs
name: Microservices with NodeJS
---

# Microservices with NodeJS

## Resources

1. [Express validator](https://express-validator.github.io/docs/)
2. [Udemy Course](https://udemy.com/course/microservices-with-node-js-and-react/)
3. [Cookie Session](https://github.com/expressjs/cookie-session)
4. [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)

## Fundamental Auth Strategies

- User auth in microservices is an unsolved problem.
- There are many ways to do it.
- Outline a few approaches, but use one that works but has downsides.

In the body of a request, a user needs to prove their auth with a JWT, Cookie or something similar.

### Approaches to Auth - Strategy One

Individual services rely on a central auth service.

A microservice after receiving a request will need to check with an authentication service.

> Sync Request in microservices is a request directly to a auth service.

### Approaches to Auth - Strategy Two

Similar to the first, however the authentication service comes through a central gateway.

### Approaches to Auth - Strategy Three

You teach each service how to decide whether a user is authenticated.

You teach the service how to inspect the JWT/Cookie and decide if the user is authenticated.

The downside to this method is that authentication method is that communicating between microservices becomes difficult.

The issue would be how to let individual services that handle their own auth known when auth tokens (JWTs, Cookies, etc.) are no longer valid.

You can get around this by only ensure that a JWT is only good for however minutes. You can use an event bus to head around to all of services to ensure their access is short-lived.

## Cookies vs JWTs

### Cookies

They are a transport mechanism.

The flow goes:

1. Request to server
2. Response has `Set-Cookie` header with a particular value.
3. The browser will make sure it always appends following requests with this cookie. It is an arbitrary piece of information.

### JWTs

An authentication/authorization mechanism.

We take an arbitrary piece of information (payload) and apply it through a JWT creation algorithm.

This can be both encoded and decoded.

This JWT can now have that JWT through a few methods: as a Authorization header, a token in the body, or still set it as a Cookie.

JWTs don't require some kind of backing store.

There are some issues that pop up with JWTs and SSR.

When you are doing SSR, you must use a Cookie to communicate during the initial page load. You can work around this with service workers.

## Stores

### Cookie Session

We are using `cookie-session` in this example, but you nees to be careful about whether or not this encrpytion method is understood across different languages.

You need to check the encryption method.

JWTs are tamper resistent so are not encrypted in this example.

### Generating a JWT

```js
// generating a JWT
const payload = { key: 'somethingAboutUser', id: 123, email: 'user@email.com' };
const userJwt = jwt.sign(payload, 'secret');

// storing on session
req.session = {
  jwt: userJwt,
};
```

If you head to JWT.io, you can see with a token that the information passed can be decoded. However, if you do not pass the signing key, it will not be a valid token.

## Verifying the token

```js
// middleware for the user
import jwt from 'jsonwebtoken';

export const currentUser = (req, res, next) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
    req.currentUser = payload;
  } catch (e) {
  }
  next();
};
```

## Storing Secrets

You never want to hardcode the secret. Based on what you are running (Kubernetes, Lambda, etc.) you will want to keep the secret stored as a secret based on your approach.

## Typing aside

Extending types:

```ts
interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
```
