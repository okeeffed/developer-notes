---
menu: Contentful
name: Contentful JS API
---

# Contentful JS API

## Installation

```shell
yarn add contentful
```

## Quickstart

Create a `.env` file with following values:

```shell
CONTENTFUL_SPACE_ID=FILL_IN
CONTENTFUL_API_KEY=FILL_IN
```

```javascript
require('dotenv').config();
const contentful = require('contentful');
const fs = require('fs-extra');

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY
});

client.getEntries().then(function(entries) {
  const obj = {};
  // log the title for all the entries that have it
  entries.items.forEach(function(entry) {
    console.log(entry.fields);
  });

  fs.writeJsonSync('./data.json', entries);
});
```

## Getting specific entries

```javascript
require('dotenv').config();
const contentful = require('contentful');
const fs = require('fs-extra');

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY
});

client
  .getEntries({
    'fields.sku': '<sku_value>',
    content_type: '<product_content_type_id>'
  })
  .then(function(entries) {
    entries.items.forEach(function(entry) {
      console.log(JSON.stringify(entry.fields.sku));
    });
  });
```
