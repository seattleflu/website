import React from "react";
import { fromJS as immutable } from "immutable";
import { flatten } from "lodash";
import heatmap from "./heatmap.json";
import mapboxDark from "./mapbox-dark-v10.json";

export const missingDataColor = "#777777";

/**
 * Mapping of "intensity" to color encoded in heatmap.json
 * "Intensity" comes from seattleflu/incidence-mapper and will have consistent scale
 * between 0.000 and 0.025: minimal
 * between 0.025 and 0.075: low
 * between 0.075 and 0.125: moderate
 * above 0.125: high
 */

/**
 * Base map style specification, as an Immutable Map.
 *
 * Currently a local copy of Mapbox Dark v10, as downloaded from
 * <https://api.mapbox.com/styles/v1/mapbox/dark-v10> with our access token.
 */
export const baseMap = immutable(mapboxDark);


/**
 * Generates a Mapbox GL paint style for a fill-extrusion layer using modeled
 * flu intensity on the given date.
 *
 * @param {luxon.DateTime} date
 * @returns {Object}
 */
export function extrusion(date) {
  /* The modeled_intensity_mode is directly taken from model. Mode should be the
   * most stable estimate. Base and height are in meters.
   *
   * See the Mapbox Style Specification for details on data expressions.
   * https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
   */

  // Fetches properties.flu_positive.$week.modeled_intensity_mode
  const modeledIntensity = [
    "get", "modeled_intensity_mode",
      ["get", date.toFormat("kkkk-'W'WW"),
        ["get", "flu_positive"]
  ]];

  const transition = {
    "duration": 800, // ms
    "delay": 0,
  };

  return {
    "fill-extrusion-base": 0,
    "fill-extrusion-height": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
       7, ["*", 24000, ["coalesce", modeledIntensity, 0]],
       8, ["*", 21000, ["coalesce", modeledIntensity, 0]],
       9, ["*", 18000, ["coalesce", modeledIntensity, 0]],
      10, ["*", 15000, ["coalesce", modeledIntensity, 0]],
      11, ["*", 12000, ["coalesce", modeledIntensity, 0]]
    ],
    "fill-extrusion-height-transition": transition,
    "fill-extrusion-opacity": 1,
    "fill-extrusion-color": [
      "interpolate-hcl",
      ["linear"],
      ["coalesce", modeledIntensity, -1],
      ...flatten(heatmap)
    ],
    "fill-extrusion-color-transition": transition,
  };
}


/**
 * Color ramp legend.
 */
export function ColorRamp() {
  const margin = 15,
        barWidth = 400,
        barHeight = 20,
        missingDataWidth = 20,
        textHeight = 20,
        xSpacing = 30,
        ySpacing = 5;

  const innerWidth = barWidth + xSpacing + missingDataWidth;
  const innerHeight = barHeight + ySpacing + textHeight;

  const outerWidth  = innerWidth  + margin * 2;
  const outerHeight = innerHeight + margin * 2;

  const textStyles = {
    fontSize: 16,
    dominantBaseline: "hanging",
  };

  const colorRamp = [];
  heatmap.forEach(([value, color]) => {
    if (value <= 0.15) {
      colorRamp.push([6.66 * value, color]); // 0.15*6.66 = 1.0
    }
  });

  return (
    <svg viewBox={`0 0 ${outerWidth} ${outerHeight}`}
         width="100%"
         height={outerHeight}
         style={{pointerEvents: "none"}}>
      <defs>
        <linearGradient id="colorRamp">
          {colorRamp.map(([offset, color]) =>
            <stop offset={offset} stopColor={color} key={offset} />)}
        </linearGradient>
      </defs>
      <g transform={`translate(${margin}, ${margin})`}>
        <g>
          <rect width={missingDataWidth}
                height={barHeight}
                fill={missingDataColor}
                />
          <text {...textStyles}
                textAnchor="middle"
                transform={`translate(${missingDataWidth/2}, ${barHeight + ySpacing})`}>
            no data
          </text>
        </g>
        <g transform={`translate(${missingDataWidth + xSpacing}, 0)`}>
          <rect width={barWidth}
                height={barHeight}
                fill="url('#colorRamp')"
                />
          <g transform={`translate(0, ${barHeight + ySpacing})`}>
            <text {...textStyles} textAnchor="start">minimal</text>
            <text {...textStyles} textAnchor="middle" x={barWidth * 1/3}>low</text>
            <text {...textStyles} textAnchor="middle" x={barWidth * 2/3}>moderate</text>
            <text {...textStyles} textAnchor="end" x={barWidth}>high</text>
          </g>
        </g>
      </g>
    </svg>
  );
};
