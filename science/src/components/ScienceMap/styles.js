import { fromJS as immutable, List } from "immutable";
import MAP_STYLE from "./mapbox-dark-v10.json";


/**
 * Base map style specification, as an Immutable Map.
 *
 * Currently a local copy of Mapbox Light v10, as downloaded from
 * <https://api.mapbox.com/styles/v1/mapbox/dark-v10> with our access token.
 */
export const baseMapStyle = immutable(MAP_STYLE);


/**
 * Merge new sources and new layers into an existing map style specification.
 *
 * Layers are inserted in the existing list of layers before the given layer
 * id.  If no existing layer has the given id, the new layers are effectively
 * appended.
 *
 * @param {Immutable.Map} mapStyle Existing map style specification.
 *
 * @param {Immutable.Map} newStyle New map style specification to merge into
 *   `mapStyle`.
 *
 * @param {string=} beforeLayerId Optional existing layer ID to insert new
 *   layers ahead of; defaults to "waterway-label", which looks nice with the
 *   base map styles.
 *
 * @returns {Immutable.Map} Map style specification.
 */
export const mergeMapStyle = (mapStyle, newStyle, beforeLayerId = "waterway-label") =>
  mapStyle
    .mergeDeep({ sources: newStyle.get("sources") })
    .updateIn(["layers"], layers => List([
      ...layers.takeUntil(l => l.get("id") === beforeLayerId),
      ...newStyle.get("layers"),
      ...layers.skipUntil(l => l.get("id") === beforeLayerId)
    ]))
;

/**
 * Add a new data filter to the existing map style.
 *
 * @param {Immutable.Map} mapStyle Existing map style specification.
 *
 * @param {Number} index The numeric index of the target data layer among the
 *   layers in `mapStyle`.
 *
 * @param {Array} filter The Mapbox filter expression to add to `mapStyle`.
 *
 * @returns {Immutable.Map} Map style specification.
 */
export const addFilterToMapStyle = (mapStyle, index, filter) =>
  mapStyle
    .updateIn(["layers", index, "filter"], filters =>
      filters.push(filter))
;

/**
 * Remove a data filter from the existing map style.
 *
 * @param {Immutable.Map} mapStyle Existing map style specification.
 *
 * @param {Number} index The numeric index of the target data layer among the
 *   layers in `mapStyle`.
 *
 * @param {Array} filter The Mapbox filter expression to remove from `mapStyle`.
 *
 * @returns {Immutable.Map} Map style specification.
 */
export const removeFilterFromMapStyle = (mapStyle, index, filter) =>
  mapStyle
    .updateIn(["layers", index, "filter"], filters =>
      filters
        // Perform a string comparison of the arrays. This should always be safe
        // due to the ordered nature of Mapbox's filter expressions.
        .filter(x => JSON.stringify(x) !== JSON.stringify(filter)))
;
