import { fromJS as immutable } from "immutable";
import React from "react";
import MapboxGL, { FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from 'styled-components';

import { dataLayers } from "./data";
import { generateKeyframes } from "./keyframes";
import { baseMapStyle, mergeMapStyle, addFilterToMapStyle,
  removeFilterFromMapStyle } from "./styles";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidHJ2cmIiLCJhIjoiY2pyM3p4aTlmMWMwbjRibzlia3MyMjZhYiJ9.JCLCk3g-GiVOcKiNWGjOXA",
  MAPBOX_WIDTH = 85,
  MAPBOX_HEIGHT = '600px';

const Nav = styled.nav`
  padding: 5px 0 0 15px;
  margin: 0 0 -50px 0;
  font-weight: 600;
  font-size: 20px;
  border: 1px solid black;
  width: ${100 - MAPBOX_WIDTH}%;
  min-width: 125px;
  height: ${MAPBOX_HEIGHT};
  color: #fff;
  z-index: 1;
  background-color: #222;
`
const Flexbox = styled.div`
  display: flex;
  flex-direction: flex-column;
  padding-bottom: 30px;
`
const Input = styled.input`
  &[type=checkbox] {
    cursor: pointer;
  }
`
const Fieldset = styled.fieldset`
  legend {
    border-bottom: 3px solid white;
    padding-bottom: 5px;
  }
  padding: 0 0 30px 0;
`

export default class ScienceMap extends React.Component {
  render() {
    return (
      <Flexbox id="science-map">
        <Nav id="filter-group">
          <label htmlFor="filter-group">
            Filters
          </label>

          <Fieldset id="ageCategory-filters">
            <legend>Age</legend>
            {this.FilterButton("adult", "ageCategory")}
            <br />
            {this.FilterButton("child", "ageCategory")}
          </Fieldset>

          <Fieldset id="siteCategory-filters">
            <legend>Site type</legend>
            {this.FilterButton("clinical", "siteCategory")}
            <br />
            {this.FilterButton("community", "siteCategory")}
          </Fieldset>
        </Nav>

        <MapboxGL
          width={`${MAPBOX_WIDTH}%`}
          height={MAPBOX_HEIGHT}
          asyncRender={true}
          mapStyle={this.getState("mapStyle")}
          viewState={this.getState("view").toJS()}
          onViewportChange={this.updateView.bind(this)}
          onTransitionEnd={this.onTransitionEnd.bind(this)}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>

          <div style={{position: "absolute", top: "1em", right: "1em"}}>
            <FullscreenControl/>
          </div>
        </MapboxGL>
      </Flexbox>
    );
  }

  FilterButton(value, category) {
    return (
      <label>
        <Input type="checkbox"
          defaultChecked="true"
          onClick={() => this.toggleFilter(category, value)} />
        {value}
      </label>
  )}

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

  /**
   * Adds or removes filters from our data layer.
   *
   * Called by the filter UI elements (checkboxes).
   *
   * @param {string} category - The filter category name.
   * @param {string} value - The filter category value.
   */
  async toggleFilter(category, value) {
    const targetFilter = ["!=", category, value];
    const targetLayerIndex = this.getState("mapStyle")
      .get("layers")
      .findIndex(x => x.get('source') === "neighborhood-heat-source");

    const filters = this.getState("mapStyle")
      .getIn(["layers", targetLayerIndex, "filter"])
      .toJS()
      .slice(1); // the first element in the list is always 'all' (see data.js)

    // Perform a string comparison of the arrays. This should always be safe due
    // to the ordered nature of Mapbox's filter expressions.
    const currentlyFiltered = filters
      .some(element => JSON.stringify(element) === JSON.stringify(targetFilter));

    if (currentlyFiltered) {
      this.newState(state =>
        state.update("mapStyle", mapStyle =>
          removeFilterFromMapStyle(mapStyle, targetLayerIndex, targetFilter)))

    } else {
      this.newState(state =>
        state.update("mapStyle", mapStyle =>
          addFilterToMapStyle(mapStyle, targetLayerIndex, targetFilter)));
    }
  }

  // Load all data layers, and then start transitioning through our animation
  // keyframes.
  //
  async componentDidMount() {
    await Promise.all(
      dataLayers().map(layer =>
        this.loadDataLayer(layer)
          .catch((error) => { console.error("Unable to load data for layer:", layer, error) })));

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

  // After a transition ends, start a new transition to the next keyframe.
  //
  onTransitionEnd() {
    this.nextKeyframe();
  }
}
