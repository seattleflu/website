import { fromJS as immutable, Range } from "immutable";

// Initial animation keyframes.  Transitions between keyframes are computed by
// MapboxGL itself in an async rendering thread for low-latency animation.
//
const introKeyframes = immutable([
  // Above Seattle looking straight down
  {
    latitude: 47.609722,
    longitude: -122.333056,
    zoom: 10,
    bearing: 0,
    pitch: 0
  },
]);

// A generator function which returns successive keyframes first from a finite
// set and then from an infinite set of 1s keyframes spinning around Seattle.
//
export function* generateKeyframes() {
  yield* introKeyframes;
  // yield* spinKeyframes;
}
