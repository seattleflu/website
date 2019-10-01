import { fromJS as immutable } from "immutable";
import React from "react";
import MapboxGL, { FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { dataLayers } from "./data";
import { generateKeyframes } from "./keyframes";
import { baseMapStyle, mergeMapStyle } from "./styles";

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
      mapStyle: baseMapStyle,
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

    await Promise.all(
      dataLayers.map(layer =>
        this.loadDataLayer(layer)
          .catch(() => { console.error("Unable to load data for layer:", layer) })));

    this.nextKeyframe();
  }

  // Load a data layer and add it to the map when it comes in.
  //
  async loadDataLayer(layer) {
    // Our data layers put a URL in the .source.data field.  We'll fetch that
    // and then inline the resulting GeoJSON as a new source.
    //
    const sourceUrl = layer.getIn(["source", "data"]);
    const sourceId  = `${layer.get("id")}-source`;

    const response = await fetch(sourceUrl);
    const geojson = await response.json();

    // Convert layer w/ source url to a source + layer style spec
    //
    const newStyle = immutable({
      sources: {
        [sourceId]: layer.get("source").set("data", geojson)
      },
      layers: [
        layer.set("source", sourceId)
      ]
    });

    // Add new source + layer style to the map
    //
    this.newState(state =>
      state.update("mapStyle", mapStyle =>
        mergeMapStyle(mapStyle, newStyle)));
  }

  // Advance to the next keyframe, if any.
  //
  nextKeyframe() {
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
