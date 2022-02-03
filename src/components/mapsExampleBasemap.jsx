// adapted from https://bl.ocks.org/d3noob/f052595e2f92c0da677c67d5cf6f98a1

import * as topojson from "topojson-client";
import worldTopo from "../data/world-topo";
import { geoMercator, geoPath } from "d3-geo";

const _worldTopo = topojson.feature(worldTopo, worldTopo.objects.units);
const countryShapes = _worldTopo.features;

const MapsExample = ({ width = 960, height = 500 }) => {
  const projection = geoMercator().center([0, 5]).scale(150).rotate([0, 0]);
  const path = geoPath().projection(projection);

  return (
    <div>
      <h1>Basemap</h1>
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
      </svg>
    </div>
  );
};

export default MapsExample;
