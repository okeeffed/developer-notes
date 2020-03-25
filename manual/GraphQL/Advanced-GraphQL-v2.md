---
menu: GraphQL
name: Advanced GraphQL v2
---

# Advanced GraphQL v2

## Resources

1. [Advanced GraphQL course](https://frontendmasters.com/courses/advanced-graphql-v2/)
2. [Course Materials - GitHub](https://github.com/FrontendMasters/advanced-gql-v2)
3. [Course Solutions - GitHub](https://github.com/FrontendMasters/advanced-gql-v2/tree/solution/src)
4. [Course Slides](https://docs.google.com/presentation/d/1DaTDx2Jdolkws2xPx44ee6WuQYMiIAyaaEmN-IBaW1s/edit#slide=id.g62311a3d9f_0_5)
5. [GraphQL Mutations and Input Types](https://graphql.org/graphql-js/mutations-and-input-types/)
6. [GraphQL Resolvers](https://www.apollographql.com/docs/graphql-tools/resolvers/)
7. [GraphQL Context](https://graphql.org/learn/execution/#root-fields-resolvers)

## Introduction

> GraphQL is a spec that describes a declarative query language that your clients can use to ask an API for the exact data they want. This is achieved by creating a strongly typed Schema for your API, ultimate flexibility in how your API can resolve data and client queries validated against your Schema. - Course definition.

The main parts:

1. Type Definitions
2. Resolvers
3. Schema
4. Data Sources

Tools and libs:

- graphql-js
- Apollo Server
- Express
- GraphQL Playground

## Create a GraphQL Server

### Type Definitions

Example type definitions we are creating:

```javascript
const gql = require('graphql-tag');

module.exports = gql`
  directive @log(format: String) on FIELD_DEFINITION
  directive @formatDate(format: String = "d, MMM, yyyy") on FIELD_DEFINITION
  enum Theme {
    DARK
    LIGHT
  }
  enum Role {
    ADMIN
    MEMBER
    GUEST
  }
  type User {
    id: ID! @log(format: "hello")
    email: String!
    avatar: String!
    verified: Boolean!
    createdAt: String! @formatDate
    posts: [Post]!
    role: Role!
    settings: Settings!
  }
  type AuthUser {
    token: String!
    user: User!
  }
  type Post {
    id: ID!
    message: String!
    author: User!
    createdAt: String!
    likes: Int!
    views: Int!
  }
  type Settings {
    id: ID!
    user: User!
    theme: Theme!
    emailNotifications: Boolean!
    pushNotifications: Boolean!
  }
  type Invite {
    email: String!
    from: User!
    createdAt: String!
    role: Role!
  }
  input NewPostInput {
    message: String!
  }
  input UpdateSettingsInput {
    theme: Theme
    emailNotifications: Boolean
    pushNotifications: Boolean
  }
  input UpdateUserInput {
    email: String
    avatar: String
    verified: Boolean
  }
  input InviteInput {
    email: String!
    role: Role!
  }
  input SignupInput {
    email: String!
    password: String!
    role: Role!
  }
  input SigninInput {
    email: String!
    password: String!
  }
  type Query {
    me: User!
    posts: [Post]!
    post(id: ID!): Post!
    userSettings: Settings!
    feed: [Post]!
  }
  type Mutation {
    updateSettings(input: UpdateSettingsInput!): Settings!
    createPost(input: NewPostInput!): Post!
    updateMe(input: UpdateUserInput!): User
    invite(input: InviteInput!): Invite!
    signup(input: SignupInput!): AuthUser!
    signin(input: SigninInput!): AuthUser!
  }
  type Subscription {
    newPost: Post
  }
`;
```

For more information on the `mutation` and `input` types, check the [GraphQL docs](https://graphql.org/graphql-js/mutations-and-input-types/).

### Resolvers

We can then declare resolvers to handle the Queries, Mutations etc.

```javascript
const { AuthenticationError } = require('apollo-server');
const { PubSub } = require('apollo-server');
const { authenticated, authorized } = require('./auth');

const pubsub = new PubSub();
const NEW_POST = 'NEW_POST';

/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
module.exports = {
  Query: {
    me: authenticated((_, __, { user }) => {
      return user;
    }),
    posts: authenticated((_, __, { user, models }) => {
      return models.Post.findMany({ author: user.id });
    }),

    post: authenticated((_, { id }, { user, models }) => {
      return models.Post.findOne({ id, author: user.id });
    }),

    userSettings: authenticated((_, __, { user, models }) => {
      return models.Settings.findOne({ user: user.id });
    }),
    // public resolver
    feed(_, __, { models }) {
      return models.Post.findMany();
    },
  },
  Mutation: {
    updateSettings: authenticated((_, { input }, { user, models }) => {
      return models.Settings.updateOne({ user: user.id }, input);
    }),

    createPost: authenticated((_, { input }, { user, models }) => {
      const post = models.Post.createOne({ ...input, author: user.id });
      pubsub.publish(NEW_POST, { newPost: post });
      return post;
    }),

    updateMe: authenticated((_, { input }, { user, models }) => {
      return models.User.updateOne({ id: user.id }, input);
    }),
    // admin role
    invite: authenticated(
      authorized('ADMIN', (_, { input }, { user }) => {
        return {
          from: user.id,
          role: input.role,
          createdAt: Date.now(),
          email: input.email,
        };
      }),
    ),

    signup(_, { input }, { models, createToken }) {
      const existing = models.User.findOne({ email: input.email });

      if (existing) {
        throw new AuthenticationError('nope');
      }
      const user = models.User.createOne({
        ...input,
        verified: false,
        avatar: 'http',
      });
      const token = createToken(user);
      models.Settings.createOne({
        user: user.id,
        theme: 'DARK',
        emailNotifications: true,
        pushNotifications: true,
      });
      return { token, user };
    },
    signin(_, { input }, { models, createToken }) {
      const user = models.User.findOne(input);

      if (!user) {
        throw new AuthenticationError('wrong email + password combo');
      }

      const token = createToken(user);

      return { token, user };
    },
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator(NEW_POST),
    },
  },
  User: {
    posts(root, _, { user, models }) {
      if (root.id !== user.id) {
        throw new AuthenticationError('not your posts');
      }

      return models.Post.findMany({ author: root.id });
    },
    settings(root, __, { user, models }) {
      return models.Settings.findOne({ id: root.settings, user: user.id });
    },
  },
  Settings: {
    user(settings, _, { user, models }) {
      return models.Settings.findOne({ id: settings.id, user: user.id });
    },
  },
  Post: {
    author(post, _, { models }) {
      return models.User.findOne({ id: post.author });
    },
  },
};
```

You can read more on Resolvers on the [GraphQL docs](https://www.apollographql.com/docs/graphql-tools/resolvers/).

## Authentication

Authorization:

1. Should not be coupled to a resolver.
2. Can provide field level custom rules.
3. Can authorize some of your schema and not all.

Authentication:

1. Providers the users to resolvers.
2. Should not be coupled to a resolver.
3. Can protect some of your Schema and not all of it.
4. Can provide field level protection.

### Auth Approaches

How to auth:

1. Outside of GraphQL: On the server prior to execution.
2. When creating context: On initialisation of the server. Can access the incoming request to determine authentication. Not extra work to pass to GraphQL resolvers.
3. Inside the resolvers: Encapsulated on each resolver (note that it should not be).

#### Outside of GraphQL

The downside is it completely locks down all GraphQL queries and mutations. Extra complexity as well as need to pass auth info to GraphQL.

#### When Creating Context

For the creation of context, that can happen right at the server:

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // whatever is put here will be returned
  // as the third argument in a resolver.
  // This could give us access to Express req etc.
  context({req}) {
      const token = req.headers.authorization
      const user = getUserFromToken(token)
      return {
        {...db, user, createToken}
    }
  }
})

server.listen().then({url} => console.log('Server running'))

// then in the resolvers file
// code omitted for brevity
module.exports = {
Mutation: {
     // 3rd arg is the CONTEXT
    updateSettings(_, { input }, { user, models }) {
      return models.Settings.updateOne({ user: user.id }, input);
    },
}
```

Read more about `context` on the [GraphQL Docs](https://graphql.org/learn/execution/#root-fields-resolvers).

#### Inside Resolvers

Ties the business logic too close to the authentication logic. Not a good use of separation of concerns.

## Authentication

Here is an example of using authentication:

```javascript
const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { models } = require('./db');
const secret = 'catpack';

const createToken = ({ id, role }) => jwt.sign({ id, role }, secret);

const getUserFromToken = token => {
  try {
    const user = jwt.verify(token, secret);
    return models.User.findOne({ id: user.id });
  } catch (e) {
    return null;
  }
};

const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError('must authenticate');
  }

  return next(root, args, context, info);
};

const authorized = (role, next) => (root, args, context, info) => {
  if (context.user.role !== role) {
    throw new AuthenticationError(`you must have ${role} role`);
  }

  return next(root, args, context, info);
};

module.exports = {
  getUserFromToken,
  authenticated,
  authorized,
  createToken,
};
```

When using it in our resolvers, we can then run the following.

```javascript
const { AuthenticationError } = require('apollo-server');
const { PubSub } = require('apollo-server');
const { authenticated, authorized } = require('./auth');

const pubsub = new PubSub();
const NEW_POST = 'NEW_POST';

/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
module.exports = {
  Query: {
    me: authenticated((_, __, { user }) => {
      return user;
    }),
  },
};
```

> There was a question about whether to use directives instead for authentication, with the answer comparing their simularities but the advantage is you won't need to wrap all your resolvers, which gives the benefit of less code.

> Another great question was to use the wrappers to operate like Middleware that can also handle things like schema validations that GraphQL's built-in type cannot.

## Subscriptions in GraphQL

There are two options for real-time with GraphQL:

1. Subscriptions - A well supported GraphQL operation that's useful for notifiying clients of events.
2. Live Queries - Client side implementation to be notified when data changes.

Nothing stops you from using other real-time solutions, but these two are the ones built into GraphQL.

Subscriptions vs Live Queries:

- Subscriptions are part of the spec
- Subscriptions are concerned on event observations (as opposed to data changes)
- Subscriptions have great support
- LQ are experimental (coming from the GraphQL spec)
- LQ concerned on data observation
- LQ support is getting there
- Both are flexible transports and protocols (websockets, polling, SSE all supported)
- Both have predictable responses

> "Just use subscriptions" - Course runner.

The why subscriptions:

- Use if manual refetching and polling have too high of a latency cost (chat apps)
- Initial state being huge but changes are small
- LQ is just not there yet

Adding subscription support:

- Subscriptions must be added to your Schema like Queries of Mutations
- Setup PubSub protocol server side
- Create Subscription event resolvers
- Add any needed authentication and context
- Client side setup

Example subscription from our `resolvers.js` file:

```javascript
const { PubSub } = require('apollo-server');

module.exports = {
  Mutation: {
    // publish the event to the pubsub from here
    createPost: authenticated((_, { input }, { user, models }) => {
      const post = models.Post.createOne({ ...input, author: user.id });
      // must pass the payload to the client
      pubsub.publish(NEW_POST, { newPost: post });
      return post;
    }),
  },
  Subscription: {
    newPost: {
      // `asyncIterator just allows you to process things
      // one at a time asynchronously
      subscribe: () => pubsub.asyncIterator(NEW_POST),
    },
  },
};
```

As for the server we need to pass `connection` property and handle the context creation a little differently to pass the connection context.

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    log: LogDirective,
    formatDate: FormatDateDirective,
  },
  context({ connection }) {
    // passing connection context
    if (connection) {
      return { ...connection.context };
    }

    const token = req.headers.authorization;
    const user = getUserFromToken(token);
    return { ...db, user, createToken };
  },
  subscriptions: {
    // used to get `connectParams` and set connection for context
    onConnect(connectionParams) {
      if (connectionParams.auth) {
        const user = getUserFromToken(connectionParams.auth);

        if (!user) {
          throw new AuthenticationError('not authenticated');
        }

        return { user };
      }

      throw new AuthenticationError('not authenticated');
    },
  },
});
```
