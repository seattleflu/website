import { fromJS as immutable } from "immutable";

const heatStyle = {
  // Increase the heatmap weight based on frequency and property magnitude
  "heatmap-weight": 0.008,
  // Increase the heatmap color weight by zoom level
  // heatmap-intensity is a multiplier on top of heatmap-weight
  "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0, 1,
      10, 3
  ],
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0, "rgba(33,102,172,0)",
      0.2, "rgb(103,169,207)",
      0.4, "rgb(209,229,240)",
      0.6, "rgb(253,219,199)",
      0.8, "rgb(239,138,98)",
      1, "rgb(178,24,43)"
  ],
  // Adjust the heatmap radius by zoom level
  "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0, 2,
      10, 20
  ]
}

/**
 * The FluMap component loads the data for each layer at render time and adds it
 * to the map as it arrives.
 *
 * @returns {Immutable.Array}
 */
export const dataLayers = () => {
  let url = "https://seattle-flu-study.s3-us-west-2.amazonaws.com/samples.geojson"

  return immutable([
    {
      id: "neighborhood-heat",
      type: "heatmap",
      source: {
        type: "geojson",
        data: url,
      },
      paint: heatStyle,
      maxzoom: 15,
      filter: ['all']
    }
  ])};
