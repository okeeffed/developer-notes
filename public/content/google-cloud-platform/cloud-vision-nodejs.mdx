---
menu: Google Cloud Platform
name: Cloud Vision
---

# Cloud Vision w/ Nodejs

## References

- https://cloud.google.com/vision/docs/ocr#vision_text_detection-nodejs

## Prerequisites

Ensure you have set up a GCP project with Cloud Vision enabled. Follow the link above if you need help.

Move the project creds to the right directory and install `@google-cloud/vision` for the project.

## TypeScript Example

```typescript
// src/index.ts
const vision = require('@google-cloud/vision');
const util = require('util');
const ss = require('string-similarity');
const cc = require('lodash.camelcase');
const up = require('lodash.capitalize');
const path = require('path');

const components: string[] = [
  'Select',
  'Text',
  'Button',
  'TextField',
  'Image',
  'Icon',
];

const run = async () => {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Base file required for the src folder detection
  const fileName = './src/img/testFour.jpg';

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log('=== STARTING ===');
  const fullDetection = detections[0];
  const { description } = fullDetection;

  console.log('Description:', description);

  let res = '';

  description.split('\n').map((line: string) => {
    res += '<div>\n';
    line.split(',').map((text) => {
      const { bestMatch } = ss.findBestMatch(up(cc(text)), components);
      res += `\t<${bestMatch.target} />\n`;
    });
    res += '</div>\n';
  });
  console.log('=== RES ===');
  console.log(res);
};

run();
```

Running `node --require ts-node/register src/index.ts` should result in the output we want.
