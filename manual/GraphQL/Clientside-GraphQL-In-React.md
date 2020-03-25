---
menu: GraphQL
name: Clientside GraphQL in React
---

# Clientside GraphQL in React

## Resources

1. [Course Slides](https://static.frontendmasters.com/resources/2019-10-14-full-stack-graphql/client-graphql-react.pdf)
2. [Course Repo](https://github.com/FrontendMasters/fullstack-graphql)
3. [Apollo Client - Mutation docs](https://www.apollographql.com/docs/react/data/mutations/)
4. [Apollo Link Docs](https://www.apollographql.com/docs/link/)
5. [GraphQL Voyager](https://github.com/APIs-guru/graphql-voyager)
6. [GraphQL Lodash](https://github.com/APIs-guru/graphql-lodash)
7. [Graphiql Explorer](https://github.com/OneGraph/graphiql-explorer)
8. [OneGraph](https://www.onegraph.com/)
9. [fly.io - app on the edge](https://fly.io/)
10. [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator)

## Introduction

> Purpose of GraphQL was to solve how I view can consume data in the exact shape required from the server.

These days GraphQL is its own process to build schemas, its own language and more.

GraphQL is a spec that describes a declarative query language that your clients can use to ask an API for the exact data they want. This is achieved by creating a strongly typed Schema for your API, ultimate flexibility in how your API can resolve data, and client queries validated against your Schema.

There are several variations and implementations of that spec.

## GraphQL Basics

### Queries

Responsible for retrieving data. We give it an operation name, with optional arguments.

Operation names are unique names for the cliest side Query and Mutation operations. Used for client side chachingm indexing inside of tools like GraphQL playground, etc. Like naming your functions in JS vs keeping them anonymous.

```graphql
query AllCharacters {
  characters {
    results {
      name
    }
  }
}
```

Variables with operations: we can also define arguments. We use the `$` to indicate we're using a placeholder, so to we could name an arg page `$page`. Query params can also take object.

```graphql
query AllCharacters($page: string) {
  # takes query variable $page
  characters(page: $page) {
    results {
      name
    }
  }
}
```

### Multiple Queries & Mutations

We can use aliases to change the return variable name. The following changes `name` to `fullName`.

```graphql
query AllCharacters($page: string) {
  # takes query variable $page
  characters(page: $page) {
    results {
      fullName: name
    }
  }
}
```

> Note that you can do this for any of the query scopes ie `characters` could also change to `filteredCharacters: characters`.

A `Mutation` is used to alter data and can be declared like so:

```graphql
mutation CreateACharacter {
  createCharacter() {

  }
}
```

## Apollo Client

Encapsulates HTTP logic used to interact with a GraphQL API. Doubles as a client side state management alternative as well. If you GraphQL API is also an Apollo Server, it provides some extra features. Offers a plug approach for extending its capabilities. Also framework independent.

Apollo no longer depends on Redux as well!

### Storing API Data

- By default, Apollo is going to store all the nodes flat by a unique ID. This also enables it to be easy to update the cache.
- Unique ID is defaulted to `.id` or `._id` from nodes. You can change this.
- Every node should send an `.id` or `._id`, or none at all. Or you have to customize that logic.

### Client + Querying

Setting up the client:

```javascript
// client.js
import { ApolloClient } from 'apollo-client';
// the is the default cache
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
// tell the click where the server is
const link = new HttpLink({ uri: 'http://localhost:4000/' });

// initialising the client
const client = new ApolloClient({
  cache,
  link,
});

const query = gql`
  {
    # takes query variable $page
    characters(page: $page) {
      results {
        id
        name
      }
    }
  }
`;

client.query({ query }).then(result => console.log(result));

export default client;
```

### Setting up the Provider

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// the important parts
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import App from './components/App';
import './index.css';

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
```

### Querying and Mutation Data From React Hooks

The important part for queries is using the `useQuery` hook ie `const pets = useQuery(GET_PETS);`.

For mutations, it is `const [createPet, newPet] = useMutation(CREATE_PET, options)`.

For more indepth information, checkout [Apollo's Mutation docs](https://www.apollographql.com/docs/react/data/mutations/).

```javascript
import React, { useState } from 'react';
import gql from 'graphql-tag';
import PetBox from '../components/PetBox';
import NewPet from '../components/NewPet';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loader from '../components/Loader';

// fragment used for reusable code
const PET_DETAILS = gql`
  fragment PetDetails on Pet {
    id
    type
    name
    img
    vacinated @client
  }
`;

const GET_PETS = gql`
  query petsList($input: PetsInput) {
    pets(input: $input) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

const CREATE_PET = gql`
  mutation CreatePet($input: NewPetInput!) {
    addPet(input: $input) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  // consists of object data, loading, error
  const pets = useQuery(GET_PETS);

  const [createPet, newPet] = useMutation(CREATE_PET, {
    update(
      cache,
      {
        data: { addPet },
      },
    ) {
      // this is the the integral part to the update
      // of the pets var at the function scope level
      const { pets } = cache.readQuery({ query: GET_PETS });

      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [addPet, ...pets] },
      });
    },
  });

  if (pets.loading) return <Loader />;
  if (pets.error || newPet.error) return <p>ERROR</p>;

  const onSubmit = input => {
    setModal(false);
    createPet({
      // passing required variables for the createPet mutation
      variables: { input },
    });
  };

  const petsList = pets.data.pets.map(pet => (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <PetBox pet={pet} />
      </div>
    </div>
  ));

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className="row">{petsList}</div>
      </section>
    </div>
  );
}
```

## Caching & Synchronicity

We need to update the local cache for us to inform React to re-render with the updated data.

We can keep the cache in sync by:

1. Refetch matching queries after a mutation.
2. Use update method on mutation. This is the standard approach.
3. Watch Queries.

```javascript
const [createPet, newPet] = useMutation(CREATE_PET, {
  update(
    cache,
    {
      data: { addPet },
    },
  ) {
    // this is the the integral part to the update
    // of the pets var at the function scope level
    const { pets } = cache.readQuery({ query: GET_PETS });

    cache.writeQuery({
      query: GET_PETS,
      data: { pets: [addPet, ...pets] },
    });
  },
});
```

## Optimistic Updates

> Your UI does not wait until after a mutation operation to update itself. Instead it anticipates the response from the API and proceeds as if the API call was sync. The API response replaces the generated one. This gives the illusions of being really fast.

### Optimistic Loading

```javascript
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

// used for optimistic UI
const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success();
      }, 800);
    }),
);

const cache = new InMemoryCache();
const http = new HttpLink({
  uri: 'http://localhost:4000/',
});

// adding in the delay via link
// @see https://www.apollographql.com/docs/link/
const link = ApolloLink.from([delay, http]);

const client = new ApolloClient({
  cache,
  link,
});

export default client;
```

### Optimistic Repsonses

This will optimistically add something to the cache.

```javascript
// omitting other code for brevity
const onSubmit = input => {
  setModal(false);
  createPet({
    // passing required variables for the createPet mutation
    variables: { input },
    // this is the object we can use to be optimistic
    optimisticResponse: {
      __typename: 'Mutation',
      addPet: {
        __typename: 'Pet',
        id: Math.round(Math.random() * -1000000) + '',
        type: input.type,
        name: input.name,
        img: 'https://via.placeholder.com/300',
        vacinated: true,
      },
    },
  });
};
```

> Note: If there is an error, Scott says you will need to clean the cache yourself.

## Client Side Schemas

We can extend the server schema through our options in the client by providing `typeDefs` and `resolvers`.

```javascript
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Pet {
    vacinated: Boolean!
  }
`;

const resolvers = {
  Pet: {
    vacinated: () => true,
  },
};

// used for optimistic UI
const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success();
      }, 800);
    }),
);

const cache = new InMemoryCache();
const http = new HttpLink({
  uri: 'http://localhost:4000/',
});

// adding in the delay via link
// @see https://www.apollographql.com/docs/link/
const link = ApolloLink.from([delay, http]);

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

export default client;
```

We then set a directive on a GraphQL tag to indicate that the value comes from the clientside:

```javascript
// fragment used for reusable code
const PET_DETAILS = gql`
  fragment PetDetails on Pet {
    id
    type
    name
    img
    vacinated @client
  }
`;
```

## Fragments

"Little pieces of something". The below is a great example of them in action:

```javascript
const PET_DETAILS = gql`
  fragment PetDetails on Pet {
    id
    type
    name
    img
    vacinated @client
  }
`;

const GET_PETS = gql`
  query petsList($input: PetsInput) {
    pets(input: $input) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

const CREATE_PET = gql`
  mutation CreatePet($input: NewPetInput!) {
    addPet(input: $input) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;
```

## Possible directives

Out-of-the-box directions:

```javascript
const PET_DETAILS = gql`
  fragment PetDetails on Pet {
    id @skip
    type @include
    name
    img
    vacinated @client
  }
`;
```

## Tools

1. [GraphQL Voyager](https://github.com/APIs-guru/graphql-voyager)
2. [GraphQL Lodash](https://github.com/APIs-guru/graphql-lodash)
3. [Graphiql Explorer](https://github.com/OneGraph/graphiql-explorer)
4. [OneGraph](https://www.onegraph.com/)
5. [fly.io - app on the edge](https://fly.io/)
6. [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator)
