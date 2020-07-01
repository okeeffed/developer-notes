---
menu: Puppeteer
name: Screenshot Anything
---

# Screenshot Any Valid HTML with Puppeteer

## Resources

1. [KaTeX from example](https://katex.org/docs/browser.html)
2. [Yargs Parser](https://github.com/yargs/yargs-parser)
3. [Puppeteer Issue](https://github.com/puppeteer/puppeteer/issues/728)
4. [SixthForm - KaTeX examples](http://sixthform.info/katex/guide.html#example)
5. [KaTeX - Font Size](https://stackoverflow.com/questions/50896041/katex-font-size)
6. [CSS - w3schools](https://www.w3schools.com/html/html_css.asp)
7. [Puppeteer Docs - page.goto](https://pptr.dev/#?product=Puppeteer&version=v3.0.4&show=api-pagegotourl-options)

## Working Code

```javascript
/**
 * Usage from CLI:
 * node index.js --math="f(a,b,c) = (a^2+b^2+c^2)^3"
 * node index.js --math="f(a,b,c) = (a^2+b^2+c^2)^3"
 */

const puppeteer = require('puppeteer');
const argv = require('yargs-parser')(process.argv.slice(2));

//${argv._.join(' ')}
const html = `<!DOCTYPE html>
<!-- KaTeX requires the use of the HTML5 doctype. Without it, KaTeX may not render properly -->
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">

    <!-- The loading of KaTeX is deferred to speed up page rendering -->
    <script src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js" integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>

    <!-- To automatically render math in text elements, include the auto-render extension: -->
    <script src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous"
        onload="renderMathInElement(document.body);"></script>
    <style>
      .katex { font-size: 48px !important; } 
    </style>
  </head>
  <span id="mykatex" style="display: inline-block;">...</div>
  <script>
    katex.render("${argv.math}", mykatex);
  </script>
</html>`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' });
  const element = await page.$('#mykatex');
  await element.screenshot({ path: 'math.png' });

  await browser.close();
})();
```

For `networkidle0` - wait until.

> networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
