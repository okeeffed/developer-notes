---
menu: p5.js
name: Intro to p5.js
---

# Intro to p5.js

## Resources

1. [Getting Started with p5js](https://p5js.org/get-started/)
2. [Random Chords](https://p5js.org/examples/math-random-chords.html)

## Random Chords

```js
function setup() {
  createCanvas(400, 400);
  background(255, 255, 255);

  // translucent stroke using alpha value
  stroke(0, 0, 0, 15);
  noLoop();
}

function draw() {
  // draw two random chords each frame
  for (let i = 0; i < 1000; i++) {
    randomChord();
  }
}

function randomChord() {
  // find a random point on a circle
  let angle1 = random(0, 2 * PI);
  let xpos1 = 200 + 200 * cos(angle1);
  let ypos1 = 200 + 200 * sin(angle1);

  // find another random point on the circle
  let angle2 = random(0, 2 * PI);
  let xpos2 = 200 + 200 * cos(angle2);
  let ypos2 = 200 + 200 * sin(angle2);

  // draw a line between them
  line(xpos1, ypos1, xpos2, ypos2);
}
```

## Drawing a basic, dotted sine wave

```js
x = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS);
}

function draw() {
  const amplitude = 90;
  y = sin(frameCount / 10) * (width / 4) + width / 2;

  circle(x, y, 1);

  x = x + 1;
}
```

Drawing a connected sine wave thanks to draw:

```js
var y0, x1, y1, x2, y2;

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS);

  y0 = height / 2;
  y1 = y0;
  x1 = 0;
}

function draw() {
  const amplitude = y0 / 2;

  x2 = x1 + 1;
  y2 = amplitude * sin(frameCount / 10) + y0;

  line(x1, y1, x2, y2);

  x1 = x2;
  y1 = y2;
}
```

Drawing re-sizing squiggles:

```js
var y0, x1, y1, x2, y2;

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS);

  y0 = height / 2;
  y1 = y0;
  x1 = 0;
}

function draw() {
  const amplitude = frameCount / 10;

  x2 = x1 + 1;
  y2 = amplitude * sin(frameCount / 10) + y0;

  line(x1, y1, x2, y2);

  x1 = x2;
  y1 = y2;
}
```

Drawing a wave with changing stroke color:

```js
var y0, x1, y1, x2, y2;

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS);

  y0 = height / 2;
  y1 = y0;
  x1 = 0;
}

function draw() {
  stroke(`rgba(0, 0, 0, ${(1 / width) * (600 - x1)})`);
  const amplitude = frameCount / 10;

  x2 = x1 + 1;
  y2 = amplitude * sin(frameCount / 10) + y0;

  line(x1, y1, x2, y2);

  x1 = x2;
  y1 = y2;
}
```

Handling the drawing without looping:

```js
var y0, x1, y1, x2, y2;

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS);
  noLoop();

  y0 = [];
  x1 = [];
  y1 = [];
  x2 = [];
  y2 = [];
}

function draw() {
  for (let i = 0; i < 600; i++) {
    y0[i] = height / 2;

    if (i === 0) {
      y1[i] = y0;
      x1[i] = 0;
    } else {
      y1[i] = y1[i - 1];
      x1[i] = x1[i - 1];
    }

    stroke(`rgba(0, 0, 0, ${(1 / width) * (width - x1[i])})`);
    const amplitude = i / 10;

    x2[i] = x1[i] + 1;
    y2[i] = amplitude * sin(i / 10) + y0[i];

    line(x1[i], y1[i], x2[i], y2[i]);

    x1[i] = x2[i];
    y1[i] = y2[i];
  }
}
```

Multiple lines with the draw func abstracted:

```js
var y0, x1, y1, x2, y2;

function setup() {
  createCanvas(720, 600);
  angleMode(RADIANS);
  noLoop();

  y0 = [];
  x1 = [];
  y1 = [];
  x2 = [];
  y2 = [];
}

function draw() {
  for (let i = 1; i < 50; i++) {
    drawSinWave(i);
  }
}

function drawSinWave(modifier) {
  for (let i = 0; i <= width; i++) {
    y0[i] = height / 2;

    if (i === 0) {
      y1[i] = y0;
      // slighly displace
      x1[i] = 0 + modifier;
    } else {
      y1[i] = y1[i - 1];
      x1[i] = x1[i - 1];
    }

    stroke(`rgba(0, 0, 0, ${((1 / width) * (width - x1[i] / 2)) / 5})`);
    const amplitude = (i / 10) * (modifier / 20);

    x2[i] = x1[i] + 1;
    y2[i] = amplitude * sin(i / 10) + y0[i];

    line(x1[i], y1[i], x2[i], y2[i]);

    x1[i] = x2[i];
    y1[i] = y2[i];
  }
}
```

Getting whacky with replace `sin` and `line`:

```js
var y0, x1, y1, x2, y2;
var ITER_MAX = 20;

function setup() {
  createCanvas(720, 1080);
  angleMode(RADIANS);
  noLoop();

  y0 = [];
  x1 = [];
  y1 = [];
  x2 = [];
  y2 = [];
}

function draw() {
  for (let i = 1; i < ITER_MAX; i++) {
    drawSinWave(i);
  }
}

function drawSinWave(modifier) {
  for (let i = 0; i <= width; i++) {
    y0[i] = height / 2;

    if (i === 0) {
      y1[i] = y0;
      // slighly displace
      x1[i] = 0 + modifier;
    } else {
      y1[i] = y1[i - 1];
      x1[i] = x1[i - 1];
    }

    stroke(`rgba(0, 0, 0, ${((1 / width) * (width - x1[i] / 2)) / 5})`);
    const amplitude = (i / 10) * (modifier / 20);

    x2[i] = x1[i] + 1;
    y2[i] = amplitude * sin(i / 10) + y0[i];

    ellipse(x1[i], y1[i], x2[i], y2[i]);

    x1[i] = x2[i];
    y1[i] = y2[i];
  }
}
```

Finally... I have no idea what this is:

```js
var y0, x1, y1, x2, y2;

function setup() {
  createCanvas(720, 1080);
  angleMode(RADIANS);
  background(255, 255, 255);
  noLoop();

  y0 = [];
  x1 = [];
  y1 = [];
  x2 = [];
  y2 = [];
}

function draw() {
  for (let i = 1; i < 30; i++) {
    drawTanWave(i);
    drawSinWave(i);
  }
}

function drawSinWave(modifier) {
  for (let i = 0; i <= width; i++) {
    y0[i] = height / 2;

    if (i === 0) {
      y1[i] = y0;
      // slighly displace
      x1[i] = 0 + modifier;
    } else {
      y1[i] = y1[i - 1];
      x1[i] = x1[i - 1];
    }

    stroke(`rgba(0, 0, 0, ${((1 / width) * (width - x1[i] / 2)) / 5})`);
    const amplitude = (i / 10) * (modifier / 20);

    x2[i] = x1[i] + 1;
    y2[i] = amplitude * sin(i / 10) + y0[i];

    line(x1[i], y1[i], x2[i], y2[i]);

    x1[i] = x2[i];
    y1[i] = y2[i];
  }
}

function drawTanWave(modifier) {
  for (let i = 0; i <= width - 200 - modifier; i++) {
    y0[i] = 100;

    if (i === 0) {
      y1[i] = y0;
      // slighly displace
      x1[i] = 100 + modifier;
    } else {
      y1[i] = y1[i - 1];
      x1[i] = x1[i - 1];
    }

    stroke(`rgba(0, 0, 0, ${((1 / width) * (width - x1[i] / 2)) / 5})`);
    const amplitude = i * (modifier / 5);

    x2[i] = x1[i] + 1;
    y2[i] = amplitude * atan(i / 2) + y0[i];

    rect(x1[i], y1[i], x2[i], y2[i]);

    x1[i] = x2[i];
    y1[i] = y2[i];
  }
}
```
