import { scaleLinear, scaleBand, extent, line } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { uniq } from "lodash";
import sunshine from "./sunshine";

function App() {
  const chartSize = 500;
  const margin = 30;
  const legendPadding = 200;

  const _extent = extent(sunshine.data.sunshine);
  const _scaleY = scaleLinear()
    .domain(_extent)
    .range([chartSize - margin, margin]);
  const _scaleLine = scaleLinear()
    .domain([0, 11])
    .range([margin, chartSize - margin]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const _scaleDate = scaleBand()
    .domain(months)
    .range([0, chartSize - margin - margin]);
  const dataByCity = {};
  sunshine.data.city.forEach((city, i) => {
    if (!dataByCity[city]) {
      dataByCity[city] = [];
    }
    dataByCity[city].push(sunshine.data.sunshine[i]);
  });
  const cities = uniq(sunshine.data.city.slice(0));
  const _lineMaker = line()
    .x((d, i) => {
      return _scaleLine(i);
    })
    .y((d) => {
      return _scaleY(d);
    });

  return (
    <div style={{ margin: 20 }}>
      <h1>Sunshine in US cities</h1>
      <svg
        width={chartSize + legendPadding}
        height={chartSize}
        // style={{ border: "1px solid pink" }}
      >
        <AxisLeft left={margin} scale={_scaleY} />
        <AxisBottom
          top={chartSize - margin}
          left={margin}
          scale={_scaleDate}
          tickValues={months}
        />
        <text x="-170" y="45" transform="rotate(-90)" fontSize={10}>
          Hours of sunshine per month
        </text>
        <text x="-170" y="60" transform="rotate(-90)" fontSize={10}>
          avg. from 1981-2010
        </text>
        {cities.map((city, i) => {
          return (
            <path
              stroke={"black"}
              strokeWidth={city === "Seattle" ? 4 : 1}
              fill="none"
              key={city}
              d={_lineMaker(dataByCity[city])}
            />
          );
        })}
        {cities.map((city, i) => {
          return (
            <text
              fill={"black"}
              style={{
                fontSize: 10,
                fontWeight: city === "Seattle" ? 700 : 300,
              }}
              key={`legend--${city}`}
              x={chartSize - margin + 5}
              y={_scaleY(dataByCity[city][11])}
            >
              {city}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
export default App;
