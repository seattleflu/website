import { fromJS as immutable, Map, Set } from "immutable";
import geometry from "./geometry";

const MODEL_API = "https://incidence-mapper.seattleflu.org";

/* XXX TODO: Switch to a combined layer of Seattle neighborhoods + PUMAs
 * (potentially reduced to ZIPs within our study area).  Mike has been
 * calling this tentatively "region".
 */
export async function neighborhoods() {
  const geojson = geometry.seattleNeighborhoods;

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
      .update(rescaleField("modeled_intensity_mode"))
      .reduce(
        (groups, row) =>
          groups.setIn(
            groupByFields.map(k => row.get(k)),
            row.filter((v,k) => selectFields.has(k))),
        Map());

  console.debug("Fetched model data:", model.toJS());

  // The model returns "residence_regional_name" which is mapped from
  // neighborhood name.
  const modelForFeature = feature =>
    model.get(`Seattle--${feature.getIn(["properties", "NEIGHBO"])}`);

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


/**
 * Rescale a single field in a List of Maps to the range [0,1].
 *
 * Given a field name, returns a function which takes a Immutable.List of
 * Immutable.Maps and performs min-max normalization/rescaling as described at
 * <https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization)>.
 *
 * Values are rounded to 6 decimal places.  Nulls are preserved as-is.
 *
 * @param {string} field
 * @returns {function}
 */
function rescaleField(field) {
  return table => {
    const values = table
      .map(row => row.get(field))
      .filter(v => v != null);

    const min = Math.min(...values);
    const max = Math.max(...values);

    const round = (number, places) => Number(number.toFixed(places));

    const rescale = (value) =>
      value != null
        ? round((value - min) / (max - min), 6)
        : value;

    return table.map(row => row.set(field, rescale(row.get(field))));
  };
}
