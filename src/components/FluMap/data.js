import { fromJS as immutable } from "immutable";

// XXX TODO: For prototyping, these GeoJSONs are sourced from our
// seattleflu/seattle-geojson repository.  I'm ~80% sure they should ultimately
// come from static files generated out of ID3C, with real data embedded in
// each features's properties.
//   -trs, 8 July 2019
//
const baseUrl = "https://raw.githubusercontent.com/seattleflu/seattle-geojson/master/seattle_geojsons";
const neighborhoodUrl = `${baseUrl}/2016_seattle_neighborhoods.geojson`;
const craUrl          = `${baseUrl}/2016_seattle_cra.geojson`;
const tractUrl        = `${baseUrl}/2016_seattle_censusTracts.geojson`;

// XXX TODO: For prototyping, shape height is currently a transformation of the
// land area of the shape.  It needs to be replaced by a real data selection
// from the GeoJSON properties, or sourced from externally-joined data!
//   -trs, 8 July 2019
//
const extrusionHeight = ["*", 1000000000, ["/", 1, ["get", "ALAND"]]];
const extrusionStyle = {
  // See the Mapbox Style Specification for details on data expressions.
  // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
  "fill-extrusion-base": 0,
  "fill-extrusion-height": extrusionHeight,
  "fill-extrusion-opacity": 0.6,
  "fill-extrusion-color": [
    "step",
    extrusionHeight,
          "#FEB24C",
    200,  "#FD8D3C",
    400,  "#FC4E2A",
    800,  "#E31A1C",
    1600, "#BD0026"
  ]
};

// XXX TODO: The min/max zoom levels likely want some tweaking.
//   -trs, 8 July 2019
//
// The FluMap component loads the data for each layer at render time and adds
// it to the map as it arrives.
export const dataLayers = immutable([
  {
    id: "neighborhood",
    type: "fill-extrusion",
    source: {
      type: "geojson",
      data: neighborhoodUrl
    },
    paint: extrusionStyle,
    maxzoom: 9.5
  },
  {
    id: "cra",
    type: "fill-extrusion",
    source: {
      type: "geojson",
      data: craUrl
    },
    paint: extrusionStyle,
    minzoom: 9.5,
    maxzoom: 12
  },
  {
    id: "tract",
    type: "fill-extrusion",
    source: {
      type: "geojson",
      data: tractUrl
    },
    paint: extrusionStyle,
    minzoom: 12
  }
]);
