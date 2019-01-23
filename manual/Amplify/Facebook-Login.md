---
name: Facebook Login
menu: Amplify 
---
# Facebook Login

If using Expo, first you need to follow the setup instructions.

https://docs.expo.io/versions/latest/sdk/facebook

## tl;dr

1. Head to `developers.facebook.com` and set up the login.
2. Update `app.json` to look like the following:

```json
{
  "expo": {
    "sdkVersion": "27.0.0",
    "privacy": "unlisted",
    "name": "Exposition",
    "icon": "./assets/icon.png",
    "version": "1.0.0",
    "slug": "nodular-exposition",
    "facebookScheme": "<% fromFacebook %>",
    "facebookAppId": "<% fromFacebook %>",
    "facebookDisplayName": "Exposition",
    "ios": {
      "bundleIdentifier": "com.nodular.exposition"
    },
    "android": {
      "package": "com.nodular.exposition"
    }
  }
}
```

3. Install the ExpoFacebook common js module.
4. Update the code flow for Amplify to be similar to the one [provided from their website](https://docs.aws.amazon.com/cognito/latest/developerguide/facebook.html):

```javascript
FB.login(function(response) {
  // Check if the user logged in successfully.
  if (response.authResponse) {
    console.log('You are now logged in.');

    // Add the Facebook access token to the Cognito credentials login map.
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'IDENTITY_POOL_ID',
      Logins: {
        'graph.facebook.com': response.authResponse.accessToken
      }
    });

    // Obtain AWS credentials
    AWS.config.credentials.get(function() {
      // Access AWS resources here.
    });
  } else {
    console.log('There was a problem logging you in.');
  }
});
```

5. Ensure auth is added to the project `wsmobile user-signin configure` and selecting `Advanced` > `Add Facebook`.
