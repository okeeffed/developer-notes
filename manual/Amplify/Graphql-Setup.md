---
name: Graphql Setup
menu: Amplify 
---
# GraphQL Setup

## Links

https://blog.expo.io/how-to-build-cloud-powered-mobile-apps-with-expo-aws-amplify-2fddc898f9a2
https://hackernoon.com/introducing-the-aws-amplify-graphql-client-8a1a1e514fde

## To get it running

```bash
amplify init
amplify add api
# > GraphQL
# > name
# > API Key
# > No
# > Yes
# Select single or one-to-many
# y
```

Not that you can preset a schema to have used for Amplify.

Example, create a `schema.graphql` file with following and pass the path during setup:

```javascript
type Pet @model {
  id: ID!
  name: String!
  description: String
  hello: String
}
```

### Example schema

```javascript
type Pet @model {
  id: ID!
  name: String!
  description: String
}
```

### Example mutation

```javascript
import API, { graphqlOperation } from '@aws-amplify/api';

// define mutation
const createPet = `
  mutation($name: String!, $description: String) {
    createPet(input: {
      name: $name
      description: $description
  }) {
    id
    name
    description
  }
}`;
// execute a mutation
state = { name: '' };
onChangeText = (value) => {
  this.setState({ name: value });
};
createPet = async () => {
  const pet = this.state;
  await API.graphql(graphqlOperation(createPet, pet));
};
```

### Example query

```javascript
// define query
const listPets = `
  query {
    listPets {
      items {
        id
        name
        description
      }
    }
 }
`
// execute query
getPets = () => {
  const data = await API.graphql(graphqlOperation(listPets))
  // do something with data
}
```

## Autogenerating code for the schema

```bash
amplify codegen add
```

## 1-many, many-to-many relationship schemas

```javascript
type Post @model {
  id: ID!
  title: String!
  editors: [PostEditor] @connection(name: "PostEditors")
}
# Create a join model and disable queries as you don't need them
# and can query through Post.editors and User.posts
type PostEditor @model(queries: null) {
  id: ID!
  post: Post! @connection(name: "PostEditors")
  editor: User! @connection(name: "UserEditors")
}
type User @model {
  id: ID!
  username: String!
  posts: [PostEditor] @connection(name: "UserEditors")
}
```
