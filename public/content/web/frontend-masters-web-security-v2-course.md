
## Links and reading resources

- https://speakerdeck.com/stevekinney/web-security-frontend-masters
- https://stevekinney.net/courses/web-security

## 2 Cookies

### 2.1 Cookies overview

Small pieces of data stored on the client-side to track and identify users.

HTTP is stateless, so they are used to implement sessions e.g. auth user, shopping carts, tracking users etc.

Like many things, the original implementation of cookies was fast and loose.

There was also no spec to begin with. In 2011, there was one RFC 6265.

Cookie is the HTTP header, while there is a key and value for that cookie.

### 2.2 Cookie attributes

You can think of it as a key-value store, but there are some special values.

To expire a cookie, you need to set an `Expires` or `Max-Age` property. You can't delete a cookie, although you can set an expiry to the past and let is expire itself.

Scoping is interesting as well. If you set `Domain` as `.xyz.com`, it will allow the cookie to be sent to any subdomain of that domain. This might be undesirable for domains like `.vercel.com`.

### 2.3 Plaintext passwords

It starts with the example Express app being used. It also shows the cookie-parser library being used to show us how to use it within an express app as middleware.

In the demonstration, it gives an example of a username being stored in a cookie. Bad news since they can just adjust that username.

### 2.4 Sessions & HttpOnly

The idea of a session is that an identifier can be associated with a session for a device. This enables us to clean out sessions quickly.

On the server, when setting the cookie, the `HttpOnly` option was added to where to cookie was created. This means that JavaScript cannot be used to hijack the cookie. If you also set `secure: true`, then it means the cookie can only be sent along with encrypted requests.

- httpOnly flag:
    - When set, this flag prevents client-side scripts (like JavaScript) from accessing the cookie.
    - It helps protect against cross-site scripting (XSS) attacks by ensuring that the cookie can only be accessed by the server.
    - The cookie is still sent with requests to the server, but cannot be read or modified by scripts in the browser.
- Secure flag:
    - When set, this flag ensures that the cookie is only transmitted over HTTPS (encrypted) connections.
    - It prevents the cookie from being sent over unencrypted HTTP connections, reducing the risk of interception by malicious actors.
    - This is particularly important for sensitive data like session tokens or authentication information.

### 2.5 Signing cookies & creating sessions

#### Signed cookies

Signing a cookie:

- Signing a cookie involves adding a digital signature to the cookie's value.
- The signature is typically created using a secret key known only to the server.
- When the cookie is sent back to the server, the signature is verified to ensure the cookie hasn't been tampered with.
- This process helps prevent cookie forgery and ensures the integrity of the data stored in the cookie.
- Signing doesn't encrypt the cookie's contents, it just verifies that the content hasn't been altered.

To do this, on the server you can set a secret as part of the middleware, and then add it as an attribute.

#### Creating sessions

In this scenario, we have a database that is maintaining the sessions of users that keeps a unique session for them.

So now instead of the user ID being sent along as a cookie, we instead pass along the session ID instead of the user ID and then behind the scenes we find out the user ID, etc.

This also enables us to clear sessions remotely ourselves.

### 2.6 Same Origin Policy & Cookie Vulnerabilities

The Origin of Same Origin Policy is essentially a tuple of the protocol, domain and port. If any of those change, they are **not** the same origin.

CORS (cross origin resource sharing) is the modern, accepted way to get around the same origin policy.

From Claude:

*You're correct about the Origin being defined by the protocol, domain, and port. Any change to these components results in a different origin. While CORS (Cross-Origin Resource Sharing) is the modern, standardized way to handle cross-origin requests, there have indeed been other methods used historically to work around the Same-Origin Policy. Let's explore some of these techniques:*

1. *JSONP (JSON with Padding):*
   - *Exploits the fact that `<script>` tags are not subject to the Same-Origin Policy.*
   *- The server wraps the JSON data in a callback function.*
   *- Limited to GET requests and has security implications.*

*2. Document.domain property:*
   *- Allows relaxing the same-origin policy for subdomains.*
   *- Only works for subdomains of the same parent domain.*
   *- Both pages must set their document.domain to the same super-domain.*

*3. Window.postMessage():*
   *- Enables secure communication between windows/iframes across different origins.*
   *- Provides a controlled way to send messages between different origins.*

*4. Reverse Proxy:*
   *- Server-side solution where your server acts as an intermediary.*
   *- Requests are sent to your server, which then forwards them to the target server.*

*5. Flash as a proxy:*
   *- Historically, Flash could make cross-domain requests.*
   *- Used as a bridge for making requests to other domains.*

*6. Server-Side Request:*
   *- Make the cross-origin request from your server instead of the client.*
   *- The server isn't bound by the Same-Origin Policy.*

*7. iframe and fragment identifier messaging:*
   *- Uses the fragment identifier (hash) of the URL to pass messages between windows.*
   *- Limited in the amount of data that can be passed.*

*8. WebSockets:*
   *- While initial handshake is subject to SOP, once established, WebSockets can communicate cross-origin.*

*9. CORS with Proxy:*
   *- Use a CORS proxy service that adds appropriate headers to enable cross-origin requests.*

*It's important to note that many of these methods (especially older ones like JSONP) have security implications and should be used cautiously, if at all. CORS is the recommended standard for handling cross-origin requests securely.*

#### Some common vulnerabilities of cookies

1. Session hijacking. Exploiting active sessions to gained unauthorized access.
2. Cross-Site Scripting (XSS): a malicious script injected via input fields or URLs. The script then accesses the cookies and sends them to an attacker.
3. Cross-Site Request Forgery (CSRF): An innocent user is tricked into executing actions via a forged request, exploiting that user's authenticated session.

## 3 Session hijacking & injection

### 3.1 Privilege escalation

1. Privilege escalation: attacker gaining elevated levels of access to resources that are normally protected from an application or user.
2. Session hijacking: Using a cookie value in an attempt to try to trick the server into thinking that you're someone that you're not.
3. Man-in-the-middle attack: Intercepting and altering the communication.

### 3.2 SQL injection

In this example, there is a store with multiple users. The SQL injection done applies the `' OR 1=1--` SQL injection script to see if anything will come back.

It also talks about the importance of having a library implements all the security features to prevent things like SQL injection as well.

### 3.3 Stored queries

If possible, use an ORM or have abstractions that are secure that you can use instead of writing things yourself (more in the case that you need to do something in the middle of the night).

There are also stored queries on databases that you could make use of. That is applicable to databases like Postgres.

### 3.4 Parameter injection

This demonstration shows spread operators on JavaScript. The saving grace here is just to validate input sent across to the server.

This is even more interesting where there actually exists a property that does exist on a database but you still allow the validation of the value. Even doing something as simple as object de-structuring can save you here.

### 3.5 Other types of injection attacks

Others types that weren't covered were:

1. Man-in-the-middle attacks. Just use HTTPS.
2. Command injection. Being able to execute arbitrary commands on the host OS via a vulnerable application.
3. File upload vulnerabilities. Check the files for security issues.
4. Remote code execution e.g. using `eval`.

The `SameSite` attribute is **not** the same as the original. If two addresses have the same top-level domain + one more level, they are considered the same.

There is also a public suffix list that are the exceptions to this case.

## 4 Cross-Site Request Forgery

### 4.1 Case studies

A vulnerability that allows an attacker to make unauthorized requests on the user's behalf. It attempts to trick a user's browser into doing something that they aren't trying to do.

For example, The Twitter Worm (2010) would allow you to create a post with a URL.

Netflix in (2006) allowed img tags to fetch and download movies using a URL.

The New York Times (2008) had an article that made a POST request but enabled attacked to get a user's name and email address.

ING Direct (2008) allowed an attacker to open accounts.

YouTube (2008) had issues with most requests.

TikTok (2020) allowed account take overs.

### 4.2 Elements of a CSRF Attack

The three ingredients:

1. A relevant action (something interesting to the attacker, email/password changes etc).
2. Cookie-based session handling.
3. No unpredictable parameters. The attacked needs to be able to guess what it ought to send to get the desired outcomes.

The attacker also doesn't need to access to your site.

How does it work?

1. User logs into a web application and receives an auth token (e.g. a cookie).
2. User visits a malicious website while still authenticated.
3. The malicious website contains code that sends a request to the authenticated web application.
4. Unauthorized action: the web application processes the request as if it were made by the user.

### 4.3 Implementing a CSRF Attack

In the example given, there is a login for a "bank account" with funds that can be transferred.

In the example of the "evil" address, it attempts to submit a form to make a transfer on behalf of the user.

So the way to solve this is to use `SameSite=Strict`. There are still None or Lax as the other options.

This really does get back into the weirdness where a site and origin is different. Best to refer to web.dev for this one: https://web.dev/articles/same-site-same-origin

### 4.4 Lax vs strict

Not totally out of the woods if people have very old machines.

There is a mention of something called "the two minute rule". Not sure what it referred to... maybe two minute expiry allowed for a cookie with SameSite as None.

### 4.5 Using CSRF tokens

A random value generated by the server. If a request is either missing or has an invalid token, then the server will reject the request.

In the example, a CSRF token was rendered into the form. The token used is associated with the session on the table.

Once the form was submitted, the CSRF token was validated.

Word of warning: do **not** include your CSRF tokens in GET requests.

While we were here, it was also noted that you also should not include PII as part of the query params.

There are alternatives like the double-signed cookie pattern, or even add a second-step as part of the validation.

## 5 CORS and cross-site scripting

CORS is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page, addressing the issue of cross-origin requests.

POST requests from forms, **are not** covered by CORS.

Simple requests are not subject to CORS policies. It's easier to describe what is not a simple request:

1. Content-Type is something other than `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.
2. Request method is something other than GET, POST or HEAD.

The basic mechanics:

1. Browsers use preflight checks for complex requests (e.g. using methods like PUT or DELETE, or with custom headers) to ensure that the request is safe.
2. The server responds with the specific HTTP header (Access-Control-Allow-Origin, Access-Control-Allow-Methods, etc) to specify whether the request is allowed.

There is a mention in this section to not use the wildcard as it will end up causing more problems than you think.

Some additional security headers prefixed with `sec-` can be used.

### 5.2 Cross-Site Scripting

A type of injection attack where malicious scripts are injected into otherwise benign, trusted websites.

It comes in a few flavours:

- Stored: Malicious data is stored on the backend.
- Reflected: The malicious data is slid into the URL or query params.
- DOM-based: The malicious data is input into the DOM (e.g. an input field that changes the page).

XSS comes from within your "world" whereas CSRF comes from outside of it.

How it works:

1. Injection of a malicious script. This usually happens via user input.
2. Execution of Client-Side Code: Script runs in the context of the victim's user's session.
3. Data theft and manipulation: Since the script executes as if it were part of the original website, it can steal cookies, session tokens and other sensitive information.

### 5.3 XSS In the real world

- The Samy Worm (2005) from MySpace. MySpace didn't strip out interesting edge cases.
- Twitter Worm (2009) used a stored XSS vuln where `@` broke the HTML parser.
- The TweetDeck Worm (2014)
- eBay (2015-2016) supported a `redirectTo`
- McDonald's (2017) where McDonald's decrypted passwords clientside.

### 5.4 Finding XSS Exploits

In this example, the demonstration was adding script tags to user input as well as to the query params.

### 5.5 XSS Best Practices

1. Input validation
2. Output encoding
3. Content Security Policy (CSP)
4. Use Safe Methods
5. Libraries and frameworks
6. Safe sinks (DOM methods) e.g. `element.textContent` instead of `element.innerHTML` - the DOMPurify library has a list of these.
7. xss-payload-list is a list that can be used to help you test for sanitisation 

## 6 Content security policy

### 6.1 CSP overview

This is a security feature that helps prevent a range of attacks, including XSS and data injection attacks. Works by allowing web devs to control the resources the browser is allowed to load for their site.

How it works:

1. Allowlist domains
2. Directive-based
3. Report violations: optionally configure a URI to report violations to

### 6.2 Implementing a CSP

This can be done by adding a CSP header or using a meta tag in the head of the HTML document.

In the example shown, helmet was used with the prevent certain things from running (remote loaded images, inline script tags). Other servers like Hono have their own equivalent.

For strict CSPs, disallow inline styles and scripts, eval and friends, only allowed resources loaded from highly specific, trusted resources and implement strict nonce or hash-based techniques to control script and style execution.

### 6.3 Nonce

If you need an inline script, you can either:

1. Use a nonce (number used once). If it matches what's in the header, it will be happy. Some downsides is that you cannot cache the HTML.
2. Alternatively you can use a hash. The example given was the integrity fro the script used to load jQuery.

## 7 Other attack vectors

### 7.1 Clickjacking

A technique that focuses on clicking something else that is different from what a user perceives, effectively hijacking the page.

How it works:

1. Embedding a webpage within an iframe
2. Opacity & positioning
3. Deceptive UI
4. User interaction

There were header options here to deny this or using a frame-ancestors CSP.

### 7.2 postMessage

This demonstration shows how using `window.addEvenListener('message', ...)` can be problematic.

A big fix is just to filter out message that come from a different origin.

### 7.3 Tabnabbing

Tabnabbing is a type of phishing attack that exploits browser tab behavior and user trust. Here's how it works:

1. The user opens a legitimate website in a tab.
2. The user then switches to a different tab, leaving the first one open but not in focus.
3. The malicious site in the original tab uses JavaScript to rewrite itself to look like a login page for a trusted site (e.g., Gmail, Facebook).
4. When the user returns to the original tab, they see what appears to be a login page for a familiar site.
5. If the user enters their credentials, the attacker captures them.

#### Why it's effective:

- Users often have multiple tabs open and may not notice the change.
- The attack leverages the trust users have in sites they've already opened.
- The URL in the address bar doesn't change, so users might not check it.

#### Prevention methods:

1. Use the `rel="noopener"` attribute on links:

```html
   <a href="https://example.com" target="_blank" rel="noopener">Link</a>
```
   
   This prevents the opened page from accessing the `window.opener` object.

2. Use the `Referrer-Policy` header:

```
Referrer-Policy: strict-origin-when-cross-origin
```
   
   This limits the information sent in the `Referer` header.

3. Educate users about the risks and encourage them to check the URL bar before entering credentials.

4. Implement robust authentication methods like two-factor authentication (2FA).

5. Use Content Security Policy (CSP) headers to restrict what resources can be loaded and executed on your pages.

By implementing these measures, you can significantly reduce the risk of tabnabbing attacks on your website and protect your users.

### 7.4 JSON Web Token Security

For some reason, JWTs are pronounced "jot".

The anatomy of a JWT:

1. Header: Metadata about the type of token and algorithm used for signing.
2. Payload: The actual data claims.
3. Signature: Ensure it wasn't tampered with.

Claims are name-value pairs. They carry info about a subject, like a user or device. For instance, a claim could include a user's name or role.

You can use various data as claims, tailoring security and functionality for your application.

There are different types of claims: registered claims, public claims, private claims.

JWTs are more scalable and means that you don't have to manage sessions. This can be useful for distributed systems.

JWTs can be stolen if stored insecurely. Generally, session IDs are more secure.

The vulnerability for JWTs occur when they accept weak or incorrect algorithms.

### 7.5 JWT Best Practices

Where do you store JWTs?

With **local storage**, it does not support `HttpOnly` cookies and is vulnerable to XSS, but persists even after the browser is closed.

With **session storage**, doesn't last as long but also still vulnerable to XSS.

With **cookies**, there are size limitations (4KB) and you need to be aware of CSRF vulnerabilities (configure `SameSite`).

You should also keep JWT lifetimes short (15 minutes to an hour) and refresh them server-side.

Also ensure again that you use the secure algorithm when writing the token and decrypting.

## Wrapup

In the final lesson, he mentioned the importance of salts for passwords because of rainbow tables (tables with cleartext passwords that were pwned).

He also mentioned the importance of getting to know things, even if they're annoying (like CORS).


