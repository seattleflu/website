import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ScienceMap from './components/ScienceMap';

class App extends React.Component {
  render() {
    return (
      <>
        <h2>Flu Sampling Status</h2>
        <p>
        The map below shows features of our samples so far this season.
        Use the controls on the left to filter data by feature.
        Hold the left mouse button to drag and pan the map.
        Hold the right mouse button to rotate and pitch the map.
        Use the mouse wheel to zoom in and out.
        </p>
        <ScienceMap />
      </>
    )
  }
}

export default App
const wrapper = document.getElementById('science')
wrapper ? ReactDOM.render(<App />, wrapper) : false
