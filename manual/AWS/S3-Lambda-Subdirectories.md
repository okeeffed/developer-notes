---
name: S 3 Lambda Subdirectories
menu: AWS 
---
# Setting up a Lambda/Cloudfront setup to fetch subdirectories in S3

## Links

- [Useful blog guide](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/)
- [Serving CRA from subdirectories](https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1)

## Setup

### 1. S3 Bucket

Set up a restricted S3 bucket. Within this bucket, have subdirectories that house their own index.html file.

### 2. Set up CloudFront

Follow the permissions setup in the above article to know how to set up the correct event.

### 3. This is the setup for a JavaScript Lambda call.

This must be done in a region that supports Lambda@next.

```javascript
'use strict';
exports.handler = (event, context, callback) => {
 // Extract the request from the CloudFront event that is sent to Lambda@Edge
 var request = event.Records[0].cf.request;

 // Extract the URI from the request
 var olduri = request.uri;

 // Match any '/' that occurs at the end of a URI. Replace it with a default index
 var newuri = olduri.replace(/\/$/, '/index.html');

 // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
 console.log('Old URI: ' + olduri);
 console.log('New URI: ' + newuri);

 // Replace the received URI with the URI that includes the index page
 request.uri = newuri;

 // Return to CloudFront
 return callback(null, request);
};
```

### Deploying CRA App

### 1. Update package.json

```json
"homepage": ".",
```

### 2. Update router

```javascript
export const devRouter = () => (
 <Router history={browserHistory}>
  <Route path={'/page-profile'} component={PageProfile} />
  <Route path="*" exact={true} component={PageHome} />
 </Router>
);

export const prodRouter = () => (
 <Router history={browserHistory}>
  <Route path={'/page-profile'} component={PageProfile} />
  <Route path={'/'} component={PageHome} />
  <Route path={'*'} exact={true} component={PageHome} />
 </Router>
);

export const router = () =>
 process.env.NODE_ENV !== 'development' ? prodRouter() : devRouter();
```

### 3. Update router.push calls

```javascript
import Config from 'src/app.json';
router.push(process.env.PUBLIC_URL + '/test');

// In use
function handleLink(e, d) {
 if (d.href[0] === '/') {
  e.preventDefault();
  const { router } = this.props;
  router.push(Config.baseUrl + d.href);
 }
}
```

### 4. Set a baseUrl in app.json

```json
{
 "baseUrl": "/dato-cms-test"
}
```
