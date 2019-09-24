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

const extrusionHeight = ["*", 10000, ["get", "modeled_intensity_mean"]];
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

// Used to map our layer ID names in the FluMap to IDM's model parameters
const layerModelParams = {
  "neighborhood": {
    geometry: "residence_neighborhood_district_name",
    spatialDomain: "seattle_geojson_neighborhood_district_name"
  },
  "cra": {
    geometry: "residence_cra_name",
    spatialDomain: "seattle_geojson_cra_name"
  },
  "tract": {
    geometry: "residence_census_tract",
    spatialDomain: "seattle_geojson_census_tract"
  },
  "puma": {
    geometry: "residence_puma",
    spatialDomain: "seattle_geojson_puma"
  }
}


/**
 * Fetches the IDM modeled data for a particular geometry and pathogen.
 *
 * @param {String} layerId A description of the geometry of the target data layer.
 * @param {String} pathogen A pathogen option for IDM queries. Defaults to 'all'.
 * See
 * http://40.112.165.255/v1/ui/#/generic_model/seattle_flu_incidence_mapper.generic_models.read_all
 * for the full list of query options.
 *
 * @returns {Promise} A promise containing the queried IDM data.
 */
export const fetchModellingData = async (layerId, pathogen='all') => {
  const modelParams = layerModelParams[layerId];

  const body = {
    model_type: "inla_latent",
    observed: ["encountered_week", modelParams.geometry],
    pathogen: [pathogen],
    spatial_domain: modelParams.spatialDomain,
  };

  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  return await fetch('http://40.112.165.255/v1/query', config);;
};

/**
 * Merges the IDM results and observed variables from a specific week into the geojson properties.
 * Note that if we change map features to allow animation over time or sliding dates, we may need to
 * handle the geojson as an Immutable object instead of modifying it in place.
 *
 * @param {Object} geojson
 * @param {Array} modeledData
 * @param {String} layerId
 * @param {String} week
 */
export const mergeGeojsonAndModeledData = (geojson, modeledData, layerId, week="2019-W02") => {  // TODO
  const weeklyData = modeledData.filter(datum => datum.encountered_week === week);

  const geometry = layerModelParams[layerId].geometry;
  let geojsonProperty;

  switch (layerId) {
    case "neighborhood":
      geojsonProperty = "NEIGHBO";
      break;
    case "cra":
      geojsonProperty = "CRA_NAM";
      break;
    case "tract":
      geojsonProperty = "GEOID";
      break;
    case "puma":
      geojsonProperty = "PUMA5CE";
      break;
  }

  geojson.features.forEach(feature => {
    const featureId = feature.properties[geojsonProperty];
    const matchingNeighborhood = weeklyData.find(x => {
      return x[geometry].toString() === featureId;
    });

    if (!matchingNeighborhood) {
      console.error(`No match found in weekly data for ${geometry} = ${featureId}`);
      return;
    }

    // add each to properties
    feature.properties = { ...feature.properties, ...matchingNeighborhood };
  });
}
