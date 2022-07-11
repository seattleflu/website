import { fromJS as immutable } from "immutable";
import studyArea from "./sfs_domain_neighborhood+puma.geojson";

export default {
  // XXX TODO: Use better shapes which are clipped to land and don't cover
  // water.  This will improve the look of the map.
  studyArea: immutable(studyArea)
};
