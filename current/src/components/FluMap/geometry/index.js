import { fromJS as immutable } from "immutable";
import seattleNeighborhoods from "./seattle-neighborhoods.geojson";

export default {
  // XXX TODO: Use better shapes which are clipped to land and don't cover
  // water.  This will improve the look of the map.
  seattleNeighborhoods: immutable(seattleNeighborhoods)
};
