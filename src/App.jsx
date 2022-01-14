import { scaleLinear, scaleBand, extent, line, symbol, csv } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { uniq } from "lodash";
import sunshine from "./sunshine";

function App() {
  const chartSize = 500;
  const margin = 30;
  const legendPadding = 200;
  const _extent = extent(sunshine.data.sunshine);
  const _scaleY = scaleLinear()
    .domain([0, _extent[1]])
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

  csv(
    "https://gist.githubusercontent.com/colinmegill/6c405856837dea7f978f337ef864d50e/raw/c0b158814885814c6b1a2cb36202b6577c9ad95d/census.csv",
    (data) => {
      console.log(data);
    }
  );

  return (
    <div style={{ margin: 20 }}>
      <h1>Sunshine in US cities</h1>
      <div style={{ display: "flex" }}>
        <svg
          width={chartSize + legendPadding}
          height={chartSize}
          // style={{ border: "1px solid pink" }}
        >
          <AxisLeft strokeWidth={0} left={margin} scale={_scaleY} />
          <AxisBottom
            strokeWidth={0}
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
                stroke={city === "Seattle" ? "red" : "black"}
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
        <svg
          width={chartSize}
          height={chartSize}
          style={{ border: "2px solid black" }}
        >
          {[5, 20, 30, 50].map((num, i) => {
            return (
              <circle
                cx={50 + i * 120}
                cy={60}
                r={num}
                fill={`rgb(${20 + num * 4},0,200)`}
              />
            );
          })}
          {[5, 20, 30, 50].map((num, i) => {
            const rectWidth = 40;
            return (
              <rect
                transform={`rotate(
                  ${num}, 
                  ${rectWidth / 2 + 30 + i * 120}, 
                  ${200}
                )`}
                x={30 + i * 120}
                y={200}
                width={rectWidth}
                height={10}
                fill={`rgb(${num * 4},${num * 4},${num * 4})`}
              />
            );
          })}
          {[5, 20, 30, 50].map((num, i) => {
            return (
              <line
                x1={100}
                y1={320 + i * 15}
                x2={120 + num * 5}
                y2={320 + i * 15}
                fill="black"
                stroke={"black"}
              />
            );
          })}
          {[5, 20, 30, 50].map((num, i) => {
            return (
              <text x={90} y={325 + i * 15} textAnchor="end">
                {num}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
export default App;
