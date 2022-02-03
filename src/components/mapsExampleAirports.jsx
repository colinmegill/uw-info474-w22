// adapted from https://bl.ocks.org/d3noob/f052595e2f92c0da677c67d5cf6f98a1

import * as topojson from "topojson-client";
import worldTopo from "../data/world-topo";
import { geoNaturalEarth1, geoPath } from "d3-geo";

import airports from "../data/airports";

const _worldTopo = topojson.feature(worldTopo, worldTopo.objects.units);
const countryShapes = _worldTopo.features;

const MapsExample = ({ width = 960, height = 500 }) => {
  const projection = geoNaturalEarth1()
    .center([0, 5])
    .scale(150)
    .rotate([0, 0]);
  const path = geoPath().projection(projection);

  console.log(airports);

  return (
    <div>
      <h1>Airports</h1>
      <svg width={width} height={height}>
        <g>
          {countryShapes.map((shape, i) => {
            return (
              <path
                key={i}
                d={path(shape)}
                fill="lightgrey"
                stroke="white"
                strokeWidth={0.3}
              />
            );
          })}
        </g>
        <g>
          {airports.map((airport, i) => {
            return (
              <circle
                key={i}
                transform={`translate(${projection([
                  airport.Longitude,
                  airport.Latitude,
                ])})`}
                fill={`rgba(70, 130, 180, .7)`}
                r={1.5}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MapsExample;
