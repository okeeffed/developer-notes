---
menu: React
name: Data Vis For React Devs
---

# Data Vis For React Devs

## Resources

1. [Observable HQ @ d3](https://observablehq.com/@d3)
2. [FE Masters Course](https://frontendmasters.com/courses/d3-js-react/)
3. [Data Wrapper Academy - chloropleth maps](https://academy.datawrapper.de/article/134-what-to-consider-when-creating-choropleth-maps)
4. [Course Slides](https://slides.com/shirleywu/deck-11)
5. [MDN Path documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
6. [SVG Explorations - Observable](https://beta.observablehq.com/@sxywu/data-visualization-for-react-developers-starter)

## Navigating Her 3 Workshops

1. Data Vis for React Devs
2. Intro to D3
3. Building Custom Data Visualations

[3] builds on top of [2] and these notes are based on [1].

[3] will talk more about the Gestalt laws and how to design the visualisations.

## Intro To Different Data Types

There are a number of data types:

1. Categorical (genres)
2. Ordinal (t-shirt sizes)
3. Quantitative (temperatures)
4. Temporal (dates)
5. Spatial (cities)

The basic charts and when to use them:

1. Bar chart: for categorial comparisons. The domain is categorial and the range is quantitative.
2. Histogram: for categorial distributions. Domain is quantitative bins and range is the frequency of quantitative bin. Example: x-axis is movie scores and height is number of movies that fall into that score.
3. Scatter plots: for correlation. 2 attributes and the relationship between their quantitative values.
4. Line chart: for temporal trends. Domain is temporal and range is quantitative.
5. Tree: For hierarchy, parent-child relationships, multiple tiers of category. Unidirectional.
6. Node-link diagram: For connection. Shows the relationship between entities. Cyclical.
7. Chlorodepth: For spatial trends. Domain: spatial regions. Range: Quantitative. Not good for subtle differences in data.
8. Pie charts: used sparingly. For hierarchical part-to-whole. Best for: When values are around 25%, 30% or 75% (3 or 4 values). Not good for comparing fine differences and multiple totals.

## Intro to SVG

SVG is really good at drawing shapes onto the sreen. The most used SVG elements are `rect`, `circle`, `text` and `path`.

The SVG co-ordinate starts with (0,0) at the top-left and the numbers in crease for X to the right or down when talking about Y.

In the three charts the course makes (bar chart, line chart, radial chart), Susie explains that the bar chart uses `<rect/>` elements, the line chart uses `<path/>` elements and the radial chart uses `<path/>` elements.

## Data to SVG Shapes

The work here is to look at how some elements are made through the [Observable notebook](https://beta.observablehq.com/@sxywu/data-visualization-for-react-developers-starter).

D3 is a tool that helps us take data to SVG without the difficulty.

People can be intimidated by the size of the API. There is an API slide you can see [here](https://slides.com/shirleywu/deck-11#/21/0/0) that breaks down the API modules.

## Scales

> Mapping from data attributes (domain) to display (range).

```javascript
d3.linearScale()
  .domain([min, max]) // input
  .range([min, max]); // output
```

An example of taking the data and scaling by fetching min/max:

```javascript
var width = 800;
var height = 600;
var data = [
  { date: new Date('01-01-2015'), temp: 0 },
  { date: new Date('01-01-2017'), temp: 3 },
];

var min = d3.min(data, d => d.date);
var max = d3.max(data, d => d.date);

// or use extent, which gives back [min, max]
const [min, max] = d3.extent(data, d => d.date);

var xScale = d3
  .scaleTime()
  .domain([min, max])
  .range([0, width]);
var yScale = d3
  .scaleLinear()
  .domain([min, max])
  .range([height, 0]); // to account for 0,0 viewbox
```

Which scale to use and when:

| Type         | Domain     | Range      | Scale         |
| ------------ | ---------- | ---------- | ------------- |
| Quantitative | Continuous | Continuous | scaleLinear   |
| Quantitative | Continuous | Continuous | scaleLog      |
| Quantitative | Continuous | Continuous | scaleTime     |
| Quantitative | Continuous | Discrete   | scaleQuantize |
| Categorial   | Discrete   | Discrete   | scaleOrdinal  |
| Categorial   | Discrete   | Continuous | scaleBand     |

## Creating Bar Charts

You can do the example on [2 of this Observable notebook](https://observablehq.com/@sxywu/data-visualization-for-react-developers-starter).

```javascript
const barChartData = () => {
  const extent = d3.extent(data, d => d.date);
  const xScale = d3
    .scaleTime()
    .domain(extent)
    .range([0, width]);

  const tempMax = d3.max(data, d => d.high);
  const tempMin = d3.min(data, d => d.low);
  const yScale = d3
    .scaleLinear()
    .domain([tempMin, tempMax])
    .range([height, 0]);

  return data.map(d => ({
    x: xScale(d.date),
    y: yScale(d.high),
    height: yScale(d.low) - yScale(d.high),
  }));
};
```

Here we wanted to calculate the x-axis of time and y-axis of height and use these scales to calculate values for `x`, `y` and `height`.

We also used `min` and `max` functions for the temp as they were different keys in the data.

### Adding in a color scale

We add this in addition to the work in the section above.

```javascript
const barChartData = () => {
  const extent = d3.extent(data, d => d.date);
  const xScale = d3
    .scaleTime()
    .domain(extent)
    .range([0, width]);

  const tempMax = d3.max(data, d => d.high);
  const tempMin = d3.min(data, d => d.low);
  const yScale = d3
    .scaleLinear()
    .domain([tempMin, tempMax])
    .range([height, 0]);

  // the important part
  const colorExtent = d3.extent(data, d => d.avg).reverse();
  // scaleSequential allows you to use an interpolator to map
  // to the range.
  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateRdYlBu);

  return data.map(d => ({
    x: xScale(d.date),
    y: yScale(d.high),
    height: yScale(d.low) - yScale(d.high),
    fill: colorScale(d.avg),
  }));
};
```

## Creating Line Charts

The important part here is again understanding the `line` SVG and parts that go into it.

```javascript
const lineChartData = () => {
  const extent = d3.extent(data, d => d.date);
  const xScale = d3
    .scaleTime()
    .domain(extent)
    .range([0, width]);

  const tempMax = d3.max(data, d => d.high);
  const tempMin = d3.min(data, d => d.low);
  const yScale = d3
    .scaleLinear()
    .domain([tempMin, tempMax])
    .range([height, 0]);

  // you could also create two different lines and pass the .y func
  const line = d3.line().x(d => xScale(d.date));

  return [
    { path: line.y(d => yScale(d.high))(data), fill: 'red' },
    { path: line.y(d => yScale(d.low))(data), fill: 'blue' },
  ];
};
```

## Building a Radial Chart

You use `d3.arc` which is similar to `d3.line`, but we give an object of one data point as opposed to an array.

```javascript
var pie = {
  data: 1,
  value: 1,
  startAngle: 6.050474740247008,
  endAngle: 6.166830023713296,
};

var arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(100)
  .startAngle(d => d.startAngle)
  .endAngle(d => d.endAngle);

arc(pie);

// M-23.061587074244123,-97.30448705798236A100,100,0,0,1,-11.609291412523175,-99.32383577419428L0,0Z
```

> Commonly used for a pie chart.

### Creating the Radial Chart

```javascript
const radialChartData = () => {
  const radiusScale = d3
    .scaleLinear()
    .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
    .range([0, width / 2]);

  // startAngle = i * perSliceAngle
  // endAngle = (i+1) * perSliceAngle

  const arcGenerator = d3.arc();
  // get the angle for each slide
  // 2PI / 365
  const perSliceAngle = (2 * Math.PI) / data.length;

  const colorExtent = d3.extent(data, d => d.avg).reverse();
  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateRdYlBu);

  return data.map((d, i) => {
    const path = arcGenerator({
      startAngle: i * perSliceAngle,
      endAngle: (i + 1) * perSliceAngle,
      innerRadius: radiusScale(d.low),
      outerRadius: radiusScale(d.high),
    });
    return {
      path,
      fill: colorScale(d.avg),
    };
  });
};
```

## Breaking Down the D3 API

Out of the sections for D3, there are a two sections that Susan breaks is down into.

1. Data preparation: Some could be replaced by JS/Lodash etc. Chords, hierarchies and pies here are very useful.
2. Layout calculation: Calulations that help for drawing out the SVG objects themselves. This includes things like geo, chord etc.
3. DOM manipulation

...and...

1. Finishing touches: anyimations, color shemes, axes etc.
2. Interactions: making the charts interactive

> Something interesting was replacing `blocks.org` with `blockbuilder.org` ie `https://blockbuilder.org/mbostock/2e73ec84221cb9773f4c` it will take you to an interactive editor.

For React, the important sections to probably note are `selections` from DOM manipulations (basically the enter, update, exit lifecycle) and Dispatches.

### Bar Chart Exercise

With React, we don't need to both with the `enter, exit, update` lifecycle as React can handle this for us just with state.

```javascript
// helper func
const barChartData = data => {
  const extent = d3.extent(data, d => d.date);
  const xScale = d3
    .scaleTime()
    .domain(extent)
    .range([0, width]);

  const tempMax = d3.max(data, d => d.high);
  const tempMin = d3.min(data, d => d.low);
  const yScale = d3
    .scaleLinear()
    .domain([tempMin, tempMax])
    .range([height, 0]);

  // the important part
  const colorExtent = d3.extent(data, d => d.avg).reverse();
  // scaleSequential allows you to use an interpolator to map
  // to the range.
  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateRdYlBu);

  return data.map(d => ({
    x: xScale(d.date),
    y: yScale(d.high),
    height: yScale(d.low) - yScale(d.high),
    fill: colorScale(d.avg),
  }));
};

const Component = ({ data, width, height }) => {
  const res = useCallback(() => barChartData(data));

  return (
    <svg width={width} height={height}>
      {res.map(d => (
        // she manually put <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill}>
        <rect {...d} />
      ))}
    </svg>
  );
};
```

## Arc Exercise

In this particular exercise, we need to actually shift the center from `0,0` using a transformation:

```javascript
const radialChartData = () => {
  const radiusScale = d3
    .scaleLinear()
    .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
    .range([0, width / 2]);

  // startAngle = i * perSliceAngle
  // endAngle = (i+1) * perSliceAngle

  const arcGenerator = d3.arc();
  // get the angle for each slide
  // 2PI / 365
  const perSliceAngle = (2 * Math.PI) / data.length;

  const colorExtent = d3.extent(data, d => d.avg).reverse();
  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateRdYlBu);

  return data.map((d, i) => {
    const path = arcGenerator({
      startAngle: i * perSliceAngle,
      endAngle: (i + 1) * perSliceAngle,
      innerRadius: radiusScale(d.low),
      outerRadius: radiusScale(d.high),
    });
    return {
      path,
      fill: colorScale(d.avg),
    };
  });
};

const Component = ({ data, width, height }) => {
  const res = useCallback(() => radialChartData(data));

  // <g /> used to transform the arc to where the center should be
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {res.map(d => (
          // she manually put <path d={d.x=path} fill={d.fill}>
          <path {...d} />
        ))}
      </g>
    </svg>
  );
};
```

## The Three Exceptions to React

Axis, brush, translations and zoom don't always play well together between React and D3.

### Axes, Legends + Annotations

```javascript
// 1. Create axisLeft or axisBottom at beginning of lifecycle with corresponding scale
const yAxis = d3.axisLeft().scale(yScale);

// 2. Create an SVG group element in `render`
// parents omitted for brevity
return <g ref="group" />;

// 3. Call axis on the group element in componentDidUpdate
d3.select(this.refs.group).call(yAxis);
```

In context:

```javascript
// helper func
const barChartData = data => {
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();

  const extent = d3.extent(data, d => d.date);
  const xScale = d3
    .scaleTime()
    .domain(extent)
    .range([0, width]);

  const tempMax = d3.max(data, d => d.high);
  const tempMin = d3.min(data, d => d.low);
  const yScale = d3
    .scaleLinear()
    .domain([tempMin, tempMax])
    .range([height, 0]);

  // the important part
  const colorExtent = d3.extent(data, d => d.avg).reverse();
  // scaleSequential allows you to use an interpolator to map
  // to the range.
  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateRdYlBu);

  return {
    data: data.map(d => ({
      x: xScale(d.date),
      y: yScale(d.high),
      height: yScale(d.low) - yScale(d.high),
      fill: colorScale(d.avg),
    })),
    xAxis: xAxis.scale(xScale),
    yAxis: yAxis.scale(yScale),
  };
};

const Component = ({ data, width, height }) => {
  const { data, xAxis, yAxis } = useCallback(() => barChartData(data));
  const xAxisRef = useRef('xAxis');
  const yAxisRef = useRef('yAxis');

  useEffect(() => {
    d3.select(xAxisRef).call(xAxis);
    d3.select(yAxisRef).call(yAxis);
  }, [data]);

  return (
    <svg width={width} height={height}>
      {data.map(d => (
        // she manually put <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill}>
        <rect {...d} />
      ))}
      <g ref={xAxisRef} transform={`translate(0, ${height}`)} />
      <g ref={yAxisRef} transform={`translate(${leftPadding}, 0)`)} />
    </svg>
  );
};
```

> Note: You will want to update the functions to use margins to then add in the axis.

## Transitions

In general, React recommeneds you `setState` for animations. For D3, the approach changes. Susan uses D3 or Greenstock.

```javascript
// in componentDidUpdate (or similar)
d3.select(this.refs.bars)
  .selectAll('rect')
  .data(this.state.bars)
  .transition()
  .attr('y', d => d.y)
  .attr('height', d => d.height)
  .attr('fill', d => d.fill);

return (
  <g ref="bars">
    {this.state.bars.map((d, i) => (
      <rect key={i} x={d.x} width="2" />
    ))}
  </g>
);
```

> Important: Make sure that the attributes that React does not manage is not placed in the SVG element.

## Brush

In `componentDidMount`:

1. Create brush instance
2. Define brushable area (extent)
3. Pass in a function to execute on every brush, or brush end.

```javascript
this.brush = d3.brush().extent([0,0], [width, height]).on('end', () => {
  // end function
})

d3.select(this.refs.brush).call(this.brush)

// in render
<g ref="brush" />
```

Once the d3 brush is in, you get the interactivity.

> Use `useRef` and `useEffect` for function components.

An example handler for the brush:

```javascript
this.brush = d3
  .brushX()
  .extent([0, 0], [width, height])
  .on('end', () => {
    // end function
    console.log(d3.event.selection); // [leftValue, rightValue]
    const [minX, maxX] = d3.event.selection;
    const range = [
      this.state.XScale.invert(minX) // denormalise values
      this.state.XScale.invert(maxX)
    ]
    functionToUpdateRange(range)
  });

// handling coloring
const isColored = !range.length || range[0] < d.date && d.date < range[1]

return {
  //... other properties
  fill: isColored ? colorScale(d.avg) : '#ccc' // grey
}
```

There is also a `brushX` and `brushY` available.

## Additional Resources

`d3-annotation` and `react-annotation` was made by Susie and she has a library for that.

[vx](https://vx-demo.now.sh/) is an example and [semiotic](https://semiotic.nteract.io/) are resources from others.

## Canvas

If you need to have a few thousand SVG nodes on the screen, consider using Canvas.

While interactivity is easier for SVG, `canvas` is more like a painting with no as much ability for interactivity.

```javascript
// in render
<canvas
  ref="canvas"
  style={{ width: `${width}px`, height: `${height}px` }}
  width={2 * width}
  height={2 * height}
/>;

ctx = this.refs.canvas.getContext('2d');

// some available commands
ctx.fillRect(x, y, width, height);

// circle
ctx.beginPath();
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
ctx.fill();

// line
ctx.beginPath();
// moveTo, lineTo, bezierCurveTo
ctx.fill();
```
