import { fromJS as immutable } from "immutable";
import seattleNeighborhoods from "./seattle-neighborhoods.geojson";

export default {
  seattleNeighborhoods: immutable(seattleNeighborhoods)
};
