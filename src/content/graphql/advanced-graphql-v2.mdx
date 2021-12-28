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
8. [GraphQL Lodash library](https://github.com/APIs-guru/graphql-lodash)

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

## Authentication Example

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

        // handled error happened here
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

> When demoing subscriptions in the UI, it is important that you need to run Graphiql in two different tabs. One that subscribes, the other that can make the mutation.

## Error Handling

If you throw errors, GraphQL will ensure they are caught. In the context of GraphQL, any error will be caught and passed back in the query.

The query will give back an errors property with an array of errors that contain things including the error name and stack trace etc.

The response can contain errors or data.

If you are in production mode, the stacktrace won't be passed in the response when using Apollo.

Note that Apollo has its own errors exposed from the API that you can extend.

### Formatting and Error Codes

You can also intercept and change errors from the `ApolloServer` using the `formatError` object method.

Here is a good spot to use something like Sentry etc to help filter what errors to send to Sentry.

## Testing

Testing resolvers:

- Unit test resolver functions.
- Mock out data sources.
- Mock out DB calls.

Testing schema:

- Convert TypeDefs into Schema.
- Unit test Object types.
- Not a lot of people unit test their schema.

Testing the server:

- Integration testing the entire server.
- Create a test client to use to issue queries and mutations with against a testing instance of your server.
- Mock out whatever you want. Variables, constants etc.

### Testing Example

There is a helper for setting up the server in the `tests` directory.

Because the schema is typed, it makes it very easy to turn on mocks! This means you don't have to wait for the end users.

```javascript
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../src/typedefs');
const resolvers = require('../src/resolvers');

const createTestServer = ctx => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // these two are closely tied
    mockEntireSchema: false,
    mocks: true,
    context: () => ctx,
  });

  return createTestClient(server);
};

module.exports = createTestServer;
```

As for the test itself, you can see an example here:

```javascript
// query.test.js
const gql = require('graphql-tag');
const createTestServer = require('./helper');
const FEED = gql`
  {
    feed {
      id
      message
      createdAt
      likes
      views
    }
  }
`;

describe('queries', () => {
  test('feed', async () => {
    // this is where the test server will
    // take an object
    const { query } = createTestServer({
      user: { id: 1 },
      models: {
        Post: {
          findMany: jest.fn(() => [
            {
              id: 1,
              message: 'hello',
              createdAt: 12345839,
              likes: 20,
              views: 300,
            },
          ]),
        },
      },
    });

    const res = await query({ query: FEED });
    expect(res).toMatchSnapshot();
  });
});
```

## Directives

Allow you to add logic and metadata to your Schemas, Queries or Mutations. Can act like middleware for Schemas, or post processing hooks for your Queries and Mutations.

Why use directives?

- Fine-grain control down to the field level on your `TypeDefs`.
- Eliminate post processing on your clients after you query.
- Extendable. Can have directives use directives etc.

### Directives on the Server Side

For example, using the deprecate, formatDate and log directive - one from GraphQL, the other two that we declare:

Directives can go on a property (as seen below) or even on a type ie `type User @deprecate { ... }`.

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
    email: String! @deprecated
    avatar: String!
    verified: Boolean!
    createdAt: String! @formatDate
    posts: [Post]!
    role: Role!
    settings: Settings!
  }
`;
```

This then also helps support our GraphQL docs.

Note that `@deprected` takes an argument ie `@deprecated(reason: "use another field")`.

### Clientside Directives

Front the client query, we can add clientside directives.

```graphql
query GetMe($yes: Boolean!) {
  me {
    # based on query variables
    error @include(if: $yes)
    username
    createdAt
  }
}
```

There is a [library](https://github.com/APIs-guru/graphql-lodash) that can even do Lodash changes to your queries from the clientside.

## Creating Directives

Can be challenging if you're unfamiliar with how GraphQL works. You will need to work with the AST.

It also requires a definition in your schema.

Finally, you need to create logic for your Directive to use.

```javascript
// the rest is omitted for brevity.
module.exports = gql`
  directive @log(format: String) on FIELD_DEFINITION
  directive @formatDate(format: String = "d, MMM, yyyy") on FIELD_DEFINITION
`;
```

The, we can define the logic for our directive:

```javascript
const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver, GraphQLString } = require('graphql');
const { formatDate } = require('./utils');

class LogDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, type) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(root, { format, ...rest }, ctx, info) {
      console.log(`⚡️  ${type.objectType}.${field.name}`);
      return resolve.call(this, root, rest, ctx, info);
    };
  }
}

class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { format: defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString,
    });

    field.resolve = async function(root, { format, ...rest }, ctx, info) {
      const date = await resolve.call(this, root, rest, ctx, info);
      return formatDate(date, format || defaultFormat);
    };
  }
}

module.exports = { LogDirective, FormatDateDirective };
```

For the server, you need to make sure you link the directives for this to all work.

```javascript
const server = new ApolloServer({
  // rest omitted for brevity
  schemaDirectives: {
    log: LogDirective,
    formatDate: FormatDateDirective,
  },
});
```

We can use `defaultFieldResolver` from `graphql` which takes a value, looks at the keys and if the keys match the field, it returns that.

This is used to make sure our definition logs when it is called instead of on startup:

```javascript
visitFieldDefinition(field, type) {
  // guves access to old resolver or using the default one
  const { resolve = defaultFieldResolver } = field;

  field.resolve = async function(root, { format, ...rest }, ctx, info) {
    console.log(`⚡️  ${type.objectType}.${field.name}`);
    return resolve.call(this, root, rest, ctx, info);
  };
}
```

Directives can also take a string as an argument. In fact, we can set the directive to take args from the query params:

```javascript
const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver, GraphQLString } = require('graphql');

class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { format: defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString,
    });

    field.resolve = async function(root, { format, ...rest }, ctx, info) {
      const date = await resolve.call(this, root, rest, ctx, info);
      return formatDate(date, format || defaultFormat);
    };
  }
}
```

## Example Auth Directive

```javascript
class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver;
    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.user) {
        throw new AuthenticationError('not auth');
      }
      return resolver(root, args, ctx, info);
    };
  }
}

class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver;
    const { role } = this.args;

    field.resolve = async (root, args, ctx, info) => {
      if (ctx.user.role !== role) {
        throw new AuthenticationError('wrong role');
      }
      return resolver(root, args, ctx, info);
    };
  }
}
```

Then in the GraphQL Tag:

```javascript
module.exports = gql`
  directive @authenticated on FIELD_DEFINITION
  directive @authorized(role: Role!) on FIELD_DEFINITION
`;
```

Finally, we add it onto the server:

```javascript
const server = new ApolloServer({
  // rest omitted for brevity
  schemaDirectives: {
    authentication: AuthenticationDirective,
    authorization: AuthorizationDirective,
  },
});
```

You can then use it in a GraphQL theory like so:

```graphql
module.exports = gql`
  type Query {
    me: User! @authenticated @authorized(role: ADMIN)
    posts: [Post]!
    post(id: ID!): Post!
    userSettings: Settings!
    feed: [Post]!
  }
`
```

Note that the directives can be added to type definitions as well!

## Caching

There is:

1. Application Caching (DB, external data source, resolvers)
2. Network Caching (HTTP caching)
3. Client-side Caching

Application Caching is the preferred way to cache GraphQL right now. Have many options and levels to cache depending on your server.

A bunch of misunderstandings around HTTP caching and GraphQL. This can be complicated if you're not using...

- Apollo Cache Control
- Engine
- Automatic Persisted Queries

A persisted query is that you build all the queries at runtime and send it to the server. The server prevalidates and stores them on a DB somewhere.

You get that for free with Apollo if you're using the client and the server packages. You can also use edge applications to program your own cache logic. Examples being Lambda Edge, CloudFlare Edge etc.

You can also handle or restrict Mutations over `/GET`.

### Client side caching

- Apollo client handles this well
- Use any client-side state management (Redux, RxJS etc)
- Persisted Queries in coordination with the server

### How should you cache?

- If you are able to use HTTP caching, enable it
- Cache external HTTP data sources
- Cache client-side

## Conclusion and Q&A

1. Are directions part of the GraphQL spec? Yes.
2. How does he feel about Apollo Federation? Speaker sounds impressed.
3. How do you limit query length? Security. GitHub counts how many nodes per interval. There is a really nice GraphQL blog for this on "how to GraphQL".
4. Does Apollo have a data valiation directive? No but there is some packages out there.
