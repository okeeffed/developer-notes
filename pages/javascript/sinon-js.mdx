---
name: Sinon JS
menu: Java Script 
---
# Sinon JS

## Table of contents

<!-- TOC -->

*   [Sinon JS](#sinon-js)
    *   [Table of contents](#table-of-contents)
    *   [Basic example](#basic-example)

<!-- /TOC -->

## Basic example

```javascript
// form/index.js
import { create } from 'apisauce';

export const api =
    process.env.NODE_ENV === 'production'
        ? create({
              baseURL: 'http://',
              headers: {
                  Accept: 'application/vnd.github.v3+json'
              }
          })
        : create({
              baseURL: 'http://localhost:4444',
              headers: {
                  'Content-Type': 'application/json'
              }
          });

export default class Form {
    static submit = async (values) => {
        // ! This is what I am targeting
        const res = await api.post('/form', values);
        return res;
    };
}

// form/form.mocha.js
import form, { api } from './index';
import sinon from 'sinon';

describe('#submit()', function() {
    it('should return 201', (done) => {
        (async () => {
            // ! We'll stub api.post so a request is not sent
            var post = sinon.stub(api, 'post');
            post.onCall(0).returns({ ok: true, status: 201 });

            const res = await form.submit({ test: true });
            post.restore();
            expect(res.status).to.equal(201);
            done();
        })();
    });
});
```
