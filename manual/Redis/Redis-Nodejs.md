---
name: Redis with Nodejs
menu: Redis
---

# Redis with Nodejs

`yarn install redis` and use the controller. Example controller setup.

```javascript
const redis = require('redis');

function setHashSet(key, field, value) {
  return new Promise((resolve, reject) => {
    client.hset(key, field, value, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function getHashSet(key) {
  return new Promise((resolve, reject) => {
    client.hvals(key, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function delKey(key) {
  return new Promise((resolve, reject) => {
    client.del(key, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function getKeys(key) {
  return new Promise((resolve, reject) => {
    client.hkeys(key, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function getValue(key, field) {
  return new Promise((resolve, reject) => {
    client.hget(key, field, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function setArray(key, arr) {
  return new Promise((resolve, reject) => {
    client.sadd(key, ...arr, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function getArray(key) {
  return new Promise((resolve, reject) => {
    client.smembers(key, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function pushToList(key) {
  return new Promise((resolve, reject) => {
    client.rpush(key, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function popFromList(key) {
  return new Promise((resolve, reject) => {
    client.lpop(key, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function deleteArrayMember(key, value) {
  return new Promise((resolve, reject) => {
    client.srem(key, value, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

module.exports = {
  setHashSet,
  getHashSet,
  getKeys,
  getValue,
  setArray,
  getArray,
  deleteArrayMember
};
```
