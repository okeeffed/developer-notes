---
menu: Web
name: Web Authentication APIs
---

## Links

- [Web auth APIs](https://firtman.github.io/authentication/)
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
- https://webauthn.guide/

## 1 Introduction

### 1.2 Auth conceps

- A section here covers authentication vs authorisation.
- Today's course is 95% on authentication (Authn).

Some important concepts:

1. Credentials: What is needed to identify the user server-side.
2. Single Sign On (SSO): More to do with Authz than Authn.
3. 2FA (two factor auth)
4. MFA (multi-factor auth) -- two of more factors to authn a user.
5. OAuth 2.0 -- more to do with authz. It's a login flow to log into a third-party server.
6. JWT (JSON Web Token) -- also more to do with Authz.
7. OTP (one-time password): a "password" like codes sent via a phone, magic email link, etc.
8. Public Key Cryptography.

### 1.3 Implementation overview

You normally do one of the three:

1. Build custom auth. Normally user/pass or WebAuthn.
2. Use identify providers. OpenID, SAML 2.0.
3. You use IDaaS (identity-as-a-service).

## 2 Web Auth Strategies

### 2.1 HTTP auth & password security

There are some security risks to be aware of:

1. Man in the middle attacks
2. Keyloggers
3. Easy to guess passwords
4. Web servers and DBs attacks
5. Phishing and social engineering attacks

A good website to use for "have I been pwned".

https://haveibeenpwned.com/

### 2.2 Multi-Factor & Passwordless Authn

- Security issues are mentioned here about MFA weaknesses that are attempted to be exploited by scammers.
- Passwordless uses public keys and private keys to establish secure authn. The public keys end up in the database. It is also mentioned that the private keys are associated with the origin domain.

### 2.3 Auth strategies usage

From most-used to least:

1. Form-based auth
2. Multi-factor auth
3. WebAuthn
4. Passwordless auth

It also mentions passkeys coming into the fray and it being powerful for passwordless.

It's also mentioned that the difference between 3 and 4 will be covered later, but with (3) the passkeys are stored on device and not multi-device, whereas (4) will be stored on the cloud with the larger companies (i.e. iCloud for Apple, etc).

## 3 Classic login flow

I skipped most of this section since I believe it would just cover basic login process with username and password.

## 4 Credential management

### 4.1 Credential Management API

This API let's up save and retrieve data in the browser's password manager. It can store:

- Credentials (username/password)
- Federated credentials
- Public/private keys (what WebAuthn is using behind the scenes)

It let's us implement auto login safely.

For credentials, it's Chromium-only. This is very important for feature detection.

Some super useful links related to this section that I've found:

1. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/credentials
2. https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential
3. https://web.dev/articles/security-credential-management-retrieve-credentials
4. https://whatwebcando.today/credentials.html

### 4.2 Saving credentials

For post login, you can save the credentials:

```js
// Credential Management API 
if (window.PasswordCredential && user.password) { 
	const credential = new PasswordCredential({ name: user.name, id: user.email, password: user.password }); navigator.credentials.store(credential); 
}
```

When logging out, we should also add this:

```js
if (window.PasswordCredential) { navigator.credentials.preventSilentAccess() }
```

This means it will prevent an auto-login next visit. Safari may be missing this at the time of this course (2022 maybe).

### 4.3 Retrieving credentials

This enables auto-logins:

```js
if (window.PasswordCredential) { 
	const credentials = await navigator.credentials.get({ password: true }); 
	try { 
		document.getElementById("login_email").value = credentials.id; 
		document.getElementById("login_password").value = credentials.password; 
		Auth.login(); 
	} catch (e) {} 
}
```

In the above example, you still need to submit the login.

## 5 Federated login

I've also skipped over this part as I am familiar with enough with it.

## 6 WebAuthn

### 6.1 WebAuthn overview

- A multi-vendor effort 
- FIDO alliance W3C
- Store safely private keys while sending public keys to the server
- The API can work with FIDO2 (could be a USB key etc) and platform authenticators (FaceID, etc)
- It is typically used as 2FA (exception being when it's used for the password-less effort)
- It can use PIN-based keys, FIDO2 USB keys, Biometric authenticators.

### 6.2 WebAuthn workflows

This party covers the relationship between the website, user and authenticator.

### 6.3 SimpleWebAuthn & WebAuthn.io

You have three options, but you can use IDaaS.

For libraries, the recommendation is https://simplewebauthn.dev/

There is a also a website to demo webauthn https://webauthn.io/

With the demo, it showed how different browsers respond to the request the register.

### 6.5 WebAuthn Server endpoints

Find more here https://firtman.github.io/authentication/lessons/using-webauthn/setting-up-endpoints

Adding in the registration endpoints:

```js
app.post("/auth/webauth-registration-options", (req, res) =>{ const user = findUser(req.body.email); const options = { rpName: 'Coffee Masters', rpID, userID: user.email, userName: user.name, timeout: 60000, attestationType: 'none', /** * Passing in a user's list of already-registered authenticator IDs here prevents users from * registering the same device multiple times. The authenticator will simply throw an error in * the browser if it's asked to perform registration when one of these ID's already resides * on it. */ excludeCredentials: user.devices ? user.devices.map(dev => ({ id: dev.credentialID, type: 'public-key', transports: dev.transports, })) : [], authenticatorSelection: { userVerification: 'required', residentKey: 'required', }, /** * The two most common algorithms: ES256, and RS256 */ supportedAlgorithmIDs: [-7, -257], }; /** * The server needs to temporarily remember this value for verification, so don't lose it until * after you verify an authenticator response. */ const regOptions = SimpleWebAuthnServer.generateRegistrationOptions(options) user.currentChallenge = regOptions.challenge; db.write(); res.send(regOptions); }); app.post("/auth/webauth-registration-verification", async (req, res) => { const user = findUser(req.body.user.email); const data = req.body.data; const expectedChallenge = user.currentChallenge; let verification; try { const options = { credential: data, expectedChallenge: `${expectedChallenge}`, expectedOrigin, expectedRPID: rpID, requireUserVerification: true, }; verification = await SimpleWebAuthnServer.verifyRegistrationResponse(options); } catch (error) { console.log(error); return res.status(400).send({ error: error.toString() }); } const { verified, registrationInfo } = verification; if (verified && registrationInfo) { const { credentialPublicKey, credentialID, counter } = registrationInfo; const existingDevice = user.devices ? user.devices.find( device => new Buffer(device.credentialID.data).equals(credentialID) ) : false; if (!existingDevice) { const newDevice = { credentialPublicKey, credentialID, counter, transports: data.response.transports, }; if (user.devices==undefined) { user.devices = []; } user.webauthn = true; user.devices.push(newDevice); db.write(); } } res.send({ ok: true }); });
```

Login endpoints:

```js
app.post("/auth/webauth-login-options", (req, res) =>{ 
	const user = findUser(req.body.email); 
	// if (user==null) { // res.sendStatus(404); // return; // } 
	const options = { timeout: 60000, allowCredentials: [], devices: user && user.devices ? user.devices.map(dev => ({ id: dev.credentialID, type: 'public-key', transports: dev.transports, })) : [], userVerification: 'required', rpID, }; const loginOpts = SimpleWebAuthnServer.generateAuthenticationOptions(options); if (user) user.currentChallenge = loginOpts.challenge; res.send(loginOpts); }); app.post("/auth/webauth-login-verification", async (req, res) => { const data = req.body.data; const user = findUser(req.body.email); if (user==null) { res.sendStatus(400).send({ok: false}); return; } const expectedChallenge = user.currentChallenge; let dbAuthenticator; const bodyCredIDBuffer = base64url.toBuffer(data.rawId); for (const dev of user.devices) { const currentCredential = Buffer(dev.credentialID.data); if (bodyCredIDBuffer.equals(currentCredential)) { dbAuthenticator = dev; break; } } if (!dbAuthenticator) { return res.status(400).send({ ok: false, message: 'Authenticator is not registered with this site' }); } let verification; try { const options = { credential: data, expectedChallenge: `${expectedChallenge}`, expectedOrigin, expectedRPID: rpID, authenticator: { ...dbAuthenticator, credentialPublicKey: new Buffer(dbAuthenticator.credentialPublicKey.data) // Re-convert to Buffer from JSON 
	}, requireUserVerification: true, }; verification = await SimpleWebAuthnServer.verifyAuthenticationResponse(options); } catch (error) { return res.status(400).send({ ok: false, message: error.toString() }); } const { verified, authenticationInfo } = verification; if (verified) { dbAuthenticator.counter = authenticationInfo.newCounter; } res.send({ ok: true, user: { name: user.name, email: user.email } }); });
```

### 6.6 Registering & Authorising

```js
addWebAuthn: async () => { 
	const options = await API.webAuthn.registrationOptions(); 
	options.authenticatorSelection.residentKey = 'required'; 
	options.authenticatorSelection.requireResidentKey = true; 
	options.extensions = { credProps: true, }; 
	const authRes = await SimpleWebAuthnBrowser.startRegistration(options); 
	const verificationRes = await API.webAuthn.registrationVerification(authRes); 
	if (verificationRes.ok) { 
		alert("You can now login using the registered method!"); 
	} else { alert(verificationRes.message) } 
},
```

### 6.7 Login with WebAuthn

```js
webAuthnLogin: async (optional) => { 
	const email = document.getElementById("login_email").value; 
	const options = await API.webAuthn.loginOptions(email); 
	const loginRes = await SimpleWebAuthnBrowser.startAuthentication(options); 
	const verificationRes = await API.webAuthn.loginVerification(email, loginRes); 
	if (verificationRes) { 
		Auth.postLogin(verificationRes, verificationRes.user); 
	} else { 
		alert(verificationRes.message) 
	} 
}
```

### 6.8 Passkeys

Passwordless options:

1. Magic links
2. OTP
3. Passkeys

"It's the new DNA of WebAuthn". The idea is to use WebAuthn as first factor auth

Authenticators are saving the keys in the cloud, so you can use them on different devices.

https://passkeys.io is a great website for a demo.

### 6.9 Next steps and best practices

This is some recommendations if you wanted to continue on with the project from the the course https://firtman.github.io/authentication/lessons/bonus/next-steps
