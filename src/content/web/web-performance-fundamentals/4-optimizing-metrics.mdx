---
name: 4) Optimizing metrics
---

# Optimizing metrics

## Improving FCP Practice

1. Servers need to be quick
2. Files that need to be delivered are small
3. Distance for delivery is short

### Quick servers

"Do fewer things"

1. Sized correctly
2. Minimal processing
3. Network bandwidth

### Small documents

1. Content size
2. Compression (things like gzip, etc - specific to technology stack)

This will be dependent on the application, but there are certain upper limits on what you should send.

### Short transmission

1. Where the servers are
2. How our CDNs are working
3. How many hops are made between servers

> These performance changes are hard to demo, but on the course they were demo'd by simulating the compression and CDN locations.

## Improving LCP

1. Defer resources until later
2. Optimize images
3. Reduce request overhead

We can chooce `View original trace` in a lighthouse report to see the trace waterfall that went into the calculated score.

In the metrics that we are looking at, we can see how the web vitals are calculated on a timeline and compare this to our specific pages to get a better insight into what might the cause.

### Defer resources

Maybe things like the JS and images are not shown on the screen or are optional?

We can defer using a few options (not all will be explored):

1. Decorate script with an `async` attribute (prevent blocking loads but still executes)

```html
<script async ... />
```

2. Decore script a `defer` attribute (don't execute until we are done)

```html
<script defer ... />
```

3. Change the order of things that happen

```html
<body>
  <img />
  <img />
  <script />
  <script />
</body>
```

4. Allow `loading="lazy"` for images - no longer a factor of LCP. The compatibility table of this shows a problem (Safari).

```html
<img loading="lazy" />
```

5. Solve lazy loading with JavaScript. Solves compatibility issue.

### Responsive Images practice

Even though you can delay images, they may still be quite big.

The example given related to the `srcset` and `sizes` attribute for the `<img />` tag.

The other alternative is to use tools to crunch images (like TinyPNG, Squoosh, Sharp etc).

### Reduce overhead

1. Use HTTP/2 (enables multiplexing)
2. Make use of cached assets locally
3. Pre-loading (can be done for things such as CSS with fonts, @imports etc) - done with the `<link rel="preconnect" />` or `<link rel="preload" />`.

## Improving CLS

The aim of the game here is to prevent things from moving around.

> Everything that we've worked on with "deferring" image load can be the enemy of CLS.

1. Changing decisons on where elements go.
2. Preparing deferred elements to have "placeholder" sizes that keep the space we expect it to take.

## Improving FID

This is a little bit more abstract. This is the timed delay between the first click and execution of app code.

> This has an interaction wil LCP. If users can click before the deferred LCP assets are parsed and executed, the event callback of the app code for the click could be delayed significantly.

Really, what we want is to answer if the users will wait for the content that is loading:

1. How valuable is it to them?
2. How anxious are they?
3. Do they understand the wait?

## Data beyond spreadsheets

Did we improve performance? There were many changes that we made to improve the different metrics.

1. We collected the field data and pasted it into the spreadsheets.
2. Because of the improvements we made, we can make estimations based on the desired business outcomes.

Other charts that can help:

1. Flame chart: relative performance for each user and how many experienced that.
2. Web vitals: another data layout that can give some insight for users over time.
3. Page load breakdowns: charting that information over time to see what went well/bad.
