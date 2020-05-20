---
menu: React
name: Simplest React Setup
---

# Simplest React Setup

## Resources

1. [Kent C Dodd's Blog - Super Simple Start to React](https://kentcdodds.com/blog/super-simple-start-to-react)

## tl;dr

```javascript
<html>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.8.3/babel.js"></script>
    <script type="text/babel">
      ReactDOM.render(<div>Hello World</div>, document.getElementById('root'))
    </script>
  </body>
</html>
```

## Transforming to use D3

This is nothing pretty, but there are no errors:

```javascript
<html>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.8.3/babel.js"></script>
     <script src="https://unpkg.com/d3@5.16.0/dist/d3.min.js"></script>
    <script type="text/babel">
      // helper func
      const barChartData = (data, width, height) => {
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
          }))
        };
      };

      const BarChart = ({ chartData, width, height }) => {
        const { data,  } = React.useCallback(() => barChartData(chartData, 400, height))();
        const leftPadding = 2;

        return (
          <svg width={width} height={height}>
            {data.map((d, i) => (
              // she manually put <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill}>
              <rect key={i} x={d.x} y={d.y} width={100} height={d.height} fill={d.fill} />
            ))}
          </svg>
        );
      };

      const data = [{
          date: new Date("2017-01-02T00:00"),
          high: 52,
          avg: 48,
          low: 44
        }, {
          date: new Date("2017-01-01T00:00"),
          high: 54,
          avg: 50,
          low: 46
        },
        {
          date: new Date("2017-01-03T00:00"),
          high: 49,
          avg: 47,
          low: 42
        }, {
          date: new Date("2017-01-04T00:00"),
          high: 56,
          avg: 50,
          low: 46
        }]
      ReactDOM.render(
        <BarChart chartData={data} width={650} height={400} />
      , document.getElementById('root'))
    </script>
  </body>
</html>
```
