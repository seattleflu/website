import { fromJS as immutable, Range } from "immutable";

// Initial animation keyframes.  Transitions between keyframes are computed by
// MapboxGL itself in an async rendering thread for low-latency animation.
//
const introKeyframes = immutable([
  // Above Seattle looking straight down
  {
    latitude: 47.609722,
    longitude: -122.333056,
    zoom: 9.5,
    bearing: 0,
    pitch: 0
  },

  // Zoom in closer, moving straight down
  {
    zoom: 10,
    transitionDuration: 2 * 1000
  },

  // Keep zooming in while sweeping out into Elliott Bay and leveling off
  {
    zoom: 11.179573,
    bearing: 54.205104,
    pitch: 60,
    transitionDuration: 5 * 1000
  }
]);

// After our intro animation, spin completely around Seattle every 60 seconds
// (360° / 60s = 6°/s).  Spin will stop when manual interaction interrupts the
// transition.
//
const spinKeyframes = Range(1, Infinity).map(tick => {
  const startingBearing = introKeyframes.getIn([-1, "bearing"]);
  return {
    bearing: (startingBearing + (360 / 60 * tick)) % 360,
    transitionDuration: 1 * 1000
  };
});

// A generator function which returns successive keyframes first from a finite
// set and then from an infinite set of 1s keyframes spinning around Seattle.
//
export function* generateKeyframes() {
  yield* introKeyframes;
  yield* spinKeyframes;
}
