import { fromJS as immutable, Range } from "immutable";

// Initial animation keyframes.  Transitions between keyframes are computed by
// MapboxGL itself in an async rendering thread for low-latency animation.
//
const introKeyframes = immutable([
  // Above Seattle looking straight down
  {
    latitude: 47.61,
    longitude: -122.33,
    zoom: 7,
    bearing: 0,
    pitch: 0
  },

  // Zoom in closer, moving straight down
  {
    zoom: 8,
    transitionDuration: 4 * 1000
  },

  // Keep zooming in while sweeping out into Elliott Bay and leveling off
  {
    latitude: 47.53,
    longitude: -122.25,
    zoom: 9,
    bearing: 59,
    pitch: 55,
    transitionDuration: 4 * 1000
  }
]);

// A generator function which returns successive keyframes first from a finite
// set and then from an infinite set of 1s keyframes spinning around Seattle.
//
export function* generateKeyframes() {
  yield* introKeyframes;
}
