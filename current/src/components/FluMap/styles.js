import { fromJS as immutable } from "immutable";
import { flatten } from "lodash";
import VIRIDIS from "./viridis.json";
import MAP_STYLE from "./mapbox-dark-v10.json";


/**
 * Base map style specification, as an Immutable Map.
 *
 * Currently a local copy of Mapbox Dark v10, as downloaded from
 * <https://api.mapbox.com/styles/v1/mapbox/dark-v10> with our access token.
 */
export const baseMap = immutable(MAP_STYLE);


/**
 * Generates a Mapbox GL paint style for a fill-extrusion layer using modeled
 * flu intensity on the given date.
 *
 * @param {luxon.DateTime} date
 * @returns {Object}
 */
export function extrusion(date) {
  /* The modeled_intensity_mode is rescaled to [0,1].  Base and height are in
   * meters.
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
       7, ["*", 6000, ["coalesce", modeledIntensity, 0]],
       9, ["*", 4000, ["coalesce", modeledIntensity, 0]],
      11, ["*", 2000, ["coalesce", modeledIntensity, 0]]
    ],
    "fill-extrusion-height-transition": transition,
    "fill-extrusion-opacity": 0.8,
    "fill-extrusion-color": [
      "interpolate-hcl",
      ["linear"],
      ["coalesce", modeledIntensity, -1],
      -1.00, "#999999",
      ...flatten(VIRIDIS)
    ],
    "fill-extrusion-color-transition": transition,
  };
}
