import { fromJS as immutable, Map, Set } from "immutable";
import geometry from "./geometry";

const MODEL_API = "https://incidence-mapper.seattleflu.org";

export async function dataSource() {
  const geojson = geometry.studyArea;

  // Gosh I'd love to just use SQL.
  const groupByFields = [
    "residence_regional_name",
    "pathogen",
    "encountered_week",
  ];

  const params = {
    model_type: "inla_latent",  // FROM clause
    pathogen: ["flu_positive"], // WHERE condition
    observed: groupByFields,    // GROUP BY clause
    spatial_domain: "sfs_domain_geojson_regional_name",
  };

  // SELECT column list
  const selectFields = Set([
    "modeled_intensity_mode",
  ]);

  const model =
    (await fetchModel(params))
      .reduce(
        (groups, row) =>
          groups.setIn(
            groupByFields.map(k => row.get(k)),
            row.filter((v,k) => selectFields.has(k))),
        Map());

  console.debug("Fetched model data:", model.toJS());

  const modelForFeature = feature =>
    model.get(feature.getIn(["properties", "regional_name"]));

  return geojson
    .updateIn(["features"], features =>
      features.map(feature =>
        feature.updateIn(["properties"], properties =>
          properties.merge(modelForFeature(feature)))));
}


/**
 * Fetches a model from IDM's API.
 *
 * @param {Object} params An object of model parameters specifying the
 *   model to fetch.  Refer to documentation at
 *   <http://incidence-mapper.seattleflu.org/v1/ui>.
 *
 * @returns {Promise} A promise which resolves to the model results.
 */
async function fetchModel(params) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  };

  const response = await fetch(`${MODEL_API}/v1/query`, config);
  return immutable(await response.json());
}
