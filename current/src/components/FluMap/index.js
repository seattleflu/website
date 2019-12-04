import { fromJS as immutable } from "immutable";
import React from "react";
import MapboxGL, { FullscreenControl, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { neighborhoods } from "./data";
import { generateKeyframes } from "./keyframes";
import { baseMap, extrusion } from "./styles";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidHJ2cmIiLCJhIjoiY2pyM3p4aTlmMWMwbjRibzlia3MyMjZhYiJ9.JCLCk3g-GiVOcKiNWGjOXA";

export default class FluMap extends React.Component {
  render() {
    return (
      <MapboxGL
        width="100%"
        height="600px"
        asyncRender={true}
        mapStyle={this.getState("mapStyle")}
        viewState={this.getState("view").toJS()}
        onViewportChange={this.onViewportChange.bind(this)}
        onTransitionEnd={this.onTransitionEnd.bind(this)}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>

        {
          this.getState("dataLayer") &&
            <Source type="geojson" data={this.getState("dataLayer")}>
              <Layer beforeId="waterway-label"
                  type="fill-extrusion"
                  paint={extrusion(this.props.date)} />
            </Source>
        }

        <div style={{position: "absolute", top: "1em", right: "1em"}}>
          <FullscreenControl/>
        </div>
      </MapboxGL>
    );
  }

  // Local state management as an immutable data store.
  //
  // All state updates should be made through newState().
  //
  // The top-level state object must be a normal JS Object (not an Immutable
  // Map) because React requires it.
  //
  keyframes = generateKeyframes();

  state = {
    store: immutable({
      mapStyle: baseMap,
      dataLayer: null,
      view: this.keyframes.next().value
    })
  };

  getState(key) {
    return this.state.store.get(key);
  }

  newState(update) {
    this.setState(state => ({store: update(state.store)}));
  }

  updateView(view) {
    this.newState(s => s.mergeDeep(immutable({view})));
  }

  // Load all data layers, and then start transitioning through our animation
  // keyframes.
  //
  _did_mount = null;
  _mounted = new Promise((resolve, reject) => {
    this._did_mount = resolve;
  });

  async componentDidMount() {
    this._did_mount();

    try {
      const dataLayer = await neighborhoods();
      console.debug("Fetched data layer:", dataLayer.toJS());

      this.newState(s => s.set("dataLayer", dataLayer));
    }
    catch(err) {
      console.error(`Unable to load data layer:`, err);
      return;
    }

    this.nextKeyframe();
  }

  // Advance to the next keyframe, if any.
  //
  nextKeyframe() {
    // XXX TODO: does JS support passing values through to generators (a la
    // python) as an option for fixing the missed ticks fast-forward issue?
    const next = this.keyframes.next();

    if (!next.done && next.value)
      this.updateView(next.value);
  }

  // Update our view state on any map-driven viewport change, but only after
  // we're mounted.  This condition avoids a React error where state is updated
  // from within a <MapboxGL> render function.
  async onViewportChange(viewport) {
    await this._mounted;
    this.updateView(viewport);
  }

  // After a transition ends, start a new transition to the next keyframe.
  //
  async onTransitionEnd() {
    await this._mounted;
    this.nextKeyframe();
  }
}
