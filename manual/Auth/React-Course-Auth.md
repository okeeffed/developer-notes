---
menu: Auth
name: React Course Auth
---

# React Course Auth

## Resources

1. [React Redux course](https://www.udemy.com/course/react-redux/learn/lecture/19607022#overview)
2. [Simpel + Secure OAuth app](https://auth0.com/blog/create-a-simple-and-secure-node-express-app/)

## General Authentication notes

There are generally two types of authentication: email/password and OAuth.

**Email/Password Auth**

1. Store record in DB
2. When user logs in, compare email/pw with DB storage
3. User logged in when correct

**OAuth Authentication**

1. Auths with outside service provider
2. Auths app to access information
3. Outside provider tells us about user
4. We are trusting the outside provider to correcty handle ID of user
5. Can be used for user ID + us making actions on user's behalf

OAuth generally will require you to request scope for information.

## OAuth Servers vs JS Browser apps

For the server:

1. Results in a 'token' that a server can use to make requests on behalf of the user.
2. Usually used when we have an app that needs to access user data when they are not logged in
3. More difficulty in setting up (need to store a lot about user)

For JS Browser apps:

1. Results in `token` that a browser app can use to make requests on behalf of the user
2. Usually used when we have an app that only needs to access data while logged in
3. Easier to setup
