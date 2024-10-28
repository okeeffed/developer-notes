---
menu: web
name: Web Performance Fundamentals v2
---

## Links

- https://github.com/toddhgardner/fundametals-of-web-performance

## 2 Importance of Web Performance

### 2.1 User expectations of performance

1. User experience: Reduce frustration
2. SEO: 
3. Online advertising

For a user:

1. Instant less than 0.1s
2. Uninterupted flow at 1 second.
3. User break flow at 10 seconds and frustration.

Some stats:

- 40% will abandon a site after three seconds
- 75% of users that experience a "slow" site will not return

### 2.2 SEO & Advertising

You want good SEO for high rankings. There is an image shared about how horrific the drop-off is after the first three.

The Core Web Vitals were blended into the page ranking from Google. You need to be fast to get to the top site.

Online advertising is important for anyone involved with ecommerce sites. If your site is bad, you can lose the value of having users click onto your website.

Here is a good website for performance correlation to money https://wpostats.com/.

### 2.3 Waterfall Charts

This section covers the importance of diving into waterfall charts.

They measure time, but there are multiple streams in the data point.

In general, the order of the information it tells you:

1. Time from start is the queue connecting.
2. Then comes request waiting when the document begins to load.
3. There is the content downloading phase.
4. Then the final part is waiting on the main thread.

The charts also break down into categories:

- HTML document
- Stylesheets
- JavaScript
- Images
- Fonts
- Fetch/other

### 2.4 Measuring DOMContentLoaded & Load Events

These are considered "legacy" performance metrics in the sense that they are no longer used as the primary metrics for web performance.

This covers:

- **DOMContentLoaded**: The structure of the page is done, but images may or may not be displayed.
- **Load** (event): When HTML and all known resources have been downloaded and rendered (except those that are lazy-loaded).

### 2.5 The problem with the legacy metrics

After client-side rendering came in 2010, applications changes their structure.

Because of it, it meant that the app could be initialised straight away and then the load event happens right away (before the page had actually loaded).

There was no longer any meaningful connection between these metrics.

## 3 Core Web Vitals & Other Perf Metrics

What it measures:

1. How fast your site visibly loads.
2. How smooth things load.
3. How quickly users can interact.

This translates to the following metrics:

1. Largest contentful paint (LCP)
2. Cumulative layout shift (CLS)
3. Interaction to next paint (INP)

### 3.1 Largest content paint (LCP)

https://web.dev/articles/lcp

How fast your site visibly loads the most important element (according to Google).

All we care about:

1. img
2. video
3. css:background-elements
4. text

What counts?

- Opacity > 0
- Size < 100%
- Low Entropy Images < 0.05.

Entropy is counted as the number of bits per visible pixel. If we have an unencoded 3.9MB image (~31 million bytes) and we render it on 2800x1200 (3,360,000 pixels), the entropy is calculated as 31M / 3M ~= 9.93. This image would qualify for LCP.

If you placeholder is low LCP, then Google will wait for the image to load.

This code can find all the images on the pages and calculate the entropy for you:

```js
console.table(
	[ ... document. images].map((img) => {
	const entry = performance.getEntriesByName(img.currentSrc)[0];
	const bytes = (entry?. encodedBodySize * 8);
	const pixels = (img-width * img.height);
	return f src: img.currentSrc, bytes, pixels, entropy: (bytes / pixels) 
	};
});
```

Things to note:

- LCP stops are user first interaction.
- Should be less than 2.5s for good, after 4s is poor.

### 3.2 Cumulative Layout Shift (CLS)

https://web.dev/articles/cls

How smooth and predictably elements load into the page.

An example could be ads loading into websites (which is an anti-pattern).

https://shifty.site was built to demonstrate how annoying CLS is.

The calculation show is:

Impact Fraction * Distance Fraction = Layout shift value

For the example, we had a banner shift everything down:

The viewport height is 768px, and the impact size is 708px, so the calculation for impact fraction is 708/768 = 0.922. The distance was the promo banner height (180px) so the distance fraction is 180px / 768px = 0.234.

So the score is 0.922 * 0.234 = 0.215.

There was another score calculated for mobile as well.

The CLS final score is the sum of all of these scores.

What's not included:

- Movements within 500ms of a user action.

How bad can it be? You want less than 0.1.

### 3.4 Flame charts

This is important to under INP, the final metric.

The flame chart measures tasks over time.

It covers a few actions:

1. Browser tasks
2. Parse HTML
3. Layout and paint
4. Evaluate and compile scripts (passthrough)
5. JavaScript execution (working)
6. Extensions

### 3.5 Interaction to Next Paint (INP)

How quickly can users interact.

What's an interaction?

1. Click
2. Drag
3. Touch
4. Keypress

The main tactic here is yielding the main thread by deferring execution (using promises, etc).

Considerations:

- There might not be an interaction.
- We don't know the worst until it's over.
- Heavily influenced by device capability.

The metrics you want:

- Good is less than 200ms.
- Needs improvement less than 500ms.
- Poor above that.

### 3.6 First Input Delay (FID)

This is a recent change, but it's no longer used for the core web vitals (effectively retired).

Measured by the first input delay. This wanted to check if you were sending a lot of JavaScript down the page.

It emphasised blocking time over processing time, which wasn't a great fit for core web vitals.

### 3.7 Time to First Byte (TTFB)

It's a metric on how quickly you host responds. Has nothing to do with your code but your server.

TTFB is when the first byte is received.

https://web.dev/articles/ttfb

This will have an impact of LCP, but isn't directly impacting things like SEO.

### 3.8 First Contentful Paint (FCP)

It's the first time we go from white to showing *something*.

Not impactful to core web vitals but still useful for understanding LCP.

## 4 Capturing Performance Metrics

### 4.1 Performance API

We can capture all of these programmatically.

https://developer.mozilla.org/en-US/docs/Web/API/Performance
https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver

You'll likely use a tool built for this, but if you wanted to capture it yourself, you could.

The covered the following:

- `performance.now()`
- `performance.getEntries()` -- this has a lot of information available to you

### 4.2 Performance Observer

The problem with the Performance API is that you slow down the metrics by trying to measure them.

The performance observer differs by delaying the work until things are idle.

This is also good because you can also specify the type of property you want to observe.

Google has it's own package `web-vitals` that let's you subscribe to web vitals.

### 4.3 Browser support for perf metrics

Browser engines:

- Blink
- Webkit
- Gecko

- Webkit doesn't support LCP, CLS, INP
- Gecko doesn't support CLS, INP

## 5 Testing & Tools

### 5.1 Testing performance

Where do we measure from?

1. Lab data: Somewhere close to the host. Normally a local test that you do.
2. Synthetic data: Telling a robot someone to go to the website and test.
3. Field data: From actual users.

You want to get as much field data as possible to get an accurate representation for users visiting the site.

### 5.2 Statistics

- Average statistics comes with its own problems.
- Instead of averages, we talk about percentiles for web performance. p50 will be the median. So p75 if the 75th worst score. p95 and p99 are also useful.

To sum up, lab data is diagnostic, while field data is experience.

### 5.3 Google Lighthouse

At the time of the course, a list of some of the tools available to you:

1. Lighthouse
2. Device toolbar
3. Network panel
	1. Network throttling
4. Performance panel
	1. Waterfall chart
	2. Flame chart
	3. CPU throttling

The is also a point made about popping out the dev tools panel to not impact locally performance testing.

In the Lighthouse score example, the following is done to try to emulate a real user experience:

1. Turn on the device mode for the screen size (specifically selecting some phone dimensions).
2. Under the network tab, select some throttling.
3. Using some CPU throttling. This isn't super accurate, but the example when to use 6x slowdown with a hardware concurrency score of 10.
4. Finally on Lighthouse tab, ensure that you have selected devtools throttling.

In the example, the score was so bad that there wasn't even a score set.

Something very useful about this, is that you can view the trace for the waterfall chart and flame chart for how things ran.

The network tab was also demonstrated.

### 5.4 Web Vitals Extension

A useful extension that also logs a bunch of useful information.

It also shows field data.

### 5.5 Chrome User Experience Report

This is the CruX data set. It only comes from logged in Google users.

- Field data
- Logged in Chrome Users
- Top 1M public websites
- Anon and public
- 28 day rolling average
- Google BigQuery
	- API, PageSpeed insights, Google Search Console

There is also another website where you can request these metrics https://requestmetrics.com/resources/tools/crux/ to get data from the Google data.

Another one is https://pagespeed.web.dev/ which runs Lighthouse as a synthetic test.

There is no INP scores for the synthetic tests since there is no user taking any action.

### 5.6 Using WebPageTest.org

https://www.webpagetest.org/

This one is not Google affiliated, but it gives you much more control over running synthetic tests.

This also gives you an interactive waterfall for more information.

### 5.7 Real user monitoring

RUM tooling comes in for collecting this information.

RUM gives the following benefits:

1. Field data
2. All users
3. Private sites
4. Private details
5. Realtime
6. Custom Dashboard and Alerts

There are a lot of theses tools. DataDog, Sentry, Request Metrics, etc.

It's said that Akamai is the goto RUM tool that enterprise companies use. They built [Boomerang](https://github.com/akamai/boomerang) that other RUM companies use.

## 6 Setting Performance Goals

### 6.1 How fast should your site be?

Fast is subjective by your users. It's about perceived performance.

This comes back to the psychology of waiting and how long people are willing to wait for different things.

Things to remember:

1. People want to start
2. Bored waits feel slower
3. Anxious waits feel slower
4. Unexplained waits feel slower
5. Uncertain waits feel slower
6. People will wait for value

> A company like TurboTax introduced an intentional slow down as it is perceived as more trusting.

### 6.2 Determining perf goals

It's about find business metrics to relate back to performance metrics.

User experience:

1. Bounce rate
2. Session time
3. Add-to-cart rate
4. Cart abandonment rate
5. Conversation rate

You need to relate this back to your performance metrics. Always remember that correlation is not always causation.

Weber's law also states that there needs to be a 20% difference for users to notice it. So focus on the right things.

### 6.3 Understanding your users

- Globally mobile is 2x the desktop share.
- Learn the important screen sizes. The share is distributed.
- OS share has 71.67% on Android, 27.73% on iOS.
- SpeedTest.net also shares useful averages for down and up speeds.
- Also understand your users.

## 7 Improving First Time to Byte

### 7.1 Improving performance

- Focus on he easiest fixes for your worst metrics from real user data.
- You shouldn't try to do everything. Sometimes it's fast enough.
- Do. Fewer. Things.

### 7.2 Improving FTTB

- Check your RUM tool for p75
- Enabling gzip and brotli compression. 
- Use efficient protocols (HTTP/2 & HTTP/3)
- Understand host capacity and proximity and it's implementations

### 7.3 Enabling Gzip and Brotli compression

For this, the browser will instruct what it can support and then it's up to us on the server to serve something supported. Gzip is normally better for smaller files, so you should make a decision based on file size whether to compress and what to compress with.

In the demo, it was a compression middleware that enabled this.

### 7.4 Efficient protocols

This compares the difference between HTTP and HTTP/2 and HTTP/3.

- HTTP/2 uses on TCP connection.
- HTTP/3 uses QUIC.

There is a small chat about TCP vs UDP here too.

### 7.5 Using HTTP/2 & HTTP/3

Drawbacks of HTTP/3:

1. Require HTTPS (so does HTTP/2)
2. UDP networking
3. Difficult to debug (curl cannot make

For the demos, he used https://caddyserver.com/

### 7.6 Host capacity & proximity

The rule here is to use the right-size for your workload.

To demonstrate this, the server was initially throttled to be be 1s, but it was reduced to 50ms to show within the waterfall how long the request took to respond.

Finally, it was about moving the host closer to the user.

A website added to help with figuring out the impact of proximity https://wondernetwork.com/

The solution spoke about the user of using CDNs to get data closer to the user.

## 8 Improving First Contentful Paint

### 8.1 Baseline FCP

Make sure this is a problem first.

You swiss army knife for resolving this:

1. Remove sequence chains
2. Preloading resources
3. Lazy load resources

### 8.2 Removing sequence chains

For sequence chains, that could be resources requiring more resources. CSS and fonts are render blocking and will prevent the page from rendering until they are completed.

In the example, it's demonstrated using the CSS `@import` syntax and the `@font-face` syntax.

If one request starts after another, you could guess that it's chained.

The solution is normally to use bundling. The example they use is to use https://lightningcss.dev/ to bundle the CSS.

### 8.3 Preloading resources

This is about starting the critical path resources as fast as we can.

Within our `<link/>` tags we can add `rel=preload` to instruct the browser to load it before we know that we need it.

We can preload the following:

- style
- script
- image
- font (CORS)
- fetch (CORS)

Interestingly, he mentions that you should just host the fonts yourself to pull them so that the URL can be used.

### 8.4 Lazy loading resources

JavaScript is **Parser Blocking**. It is blocking and prevents other files from being parsed.

We can use `defer` to help with that. There is also `async`.

- async will download lazy, but executes blocking.
- defer will download lazy, but executes just before DOMContentLoaded

In most cases, you will want to use `defer`.

If you use `type=module`, then it is always deferred.

## 9 Improving Largest Contentful Paint

### 9.1 Baseline for LCP

By moving FCP and TTFB, we also improve LCP.

The LCP is usually a resource, so we fixed a lot of the "resource delay", but we need resource duration and then (almost not a problem) is the render delay.

### 9.2 Lazy-loading images

LCP image, we need asap. The others maybe not so much.

For resource delay, the image/iFrame tag can use `loading="lazy"`.

Hypothetically, the hero image would be the LCP, so the loading for lazy was removed from that.

### 9.3 Eager loading

`fetchpriority="high"` can be used to critical paths. The hero images had the signal added to it to help the browser know what priority is.

This works only with Chrome for now, so the alternative is to use `preload` for the resource with the `<link/>` tags.

### 9.4 Image formats

This section covers some other possible image formats. It didn't go too deep.

Some options: JPG, PNG, WebP, AVIF.

The difference between WebP and AVIF is minimal, so it's best to use whatever is easiest.

If you need to use PNG, there is also another site that was brought up https://tinypng.com/

### 9.5 Responsive images

Sometimes we want hi-resolution, sharp images. But a lot of times, we might want to ship different sized images based on the window port.

In the demo, the `<picture>` tag was demonstrated with different source tags added as well for different sizes.

### 9.6 Optimising images

This section worked through resizing some images. Initially using  different libraries like `jimp` and `imagemin`.

Afterwards, an example using the `picture` tag was made.

There was also a reference to svgomg website for optimising it, but they're generally not the problem.

### 9.7 Caching

This section covers using caching headers to help understand whether we need to fetch an image or not. Properties such as ETag can help us with 304 not modified responses. 

In addition to this, we can use cache control locally on the device.

## 10 Improving Content Layer Shift & Interaction to Next Paint

### 10.1 Layout size hints

The one thing you need to do: give size hints to how big an image is going to be.

There was a note that you should not add `px` for the numbers.

### 10.2 Improving interaction to next paint

Reminder, this is how quickly users can interact with your website.

There is only one solution to this as well (at lest 99% of the time): yielding the main thread.

A couple of ways we can solve this:

1. `setTimeout` to schedule the code in the future
2. `requestAnimationFrame` let's you schedule code to run just before the next paint

