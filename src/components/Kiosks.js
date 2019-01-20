import React from 'react';
import PropTypes from "prop-types";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import isTouchDevice from "is-touch-device";
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import * as utils from './utils';
import markerImage from '../img/marker.png';

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0em 1em 3em 1em;
  max-width: 1080px;
  @media (max-width: 1080px) {
    max-width: 100vw;
  }
  @media (max-width: 520px) {
    flex-direction: column;
    max-width: 100vw;
    margin: 1em 0 3em;
  }
`

const MapContainer = styled.div`
  max-width: 1080px;
  width: 620px;
  @media (max-width: 520px) {
    width: 100%;
  }
  background-color: #fff;
  margin: auto;
  height: 550px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.primary500};
`

const MapMarkerContainer = styled.div`
  position: relative;
  text-align: center;
  color: white;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
`;

const MapMarkerLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 11px;
`;

export const MapMarker = (props) => {
  return (
    <MapMarkerContainer>
      <img alt="marker" width="48px" height="auto" src={markerImage}/>
      <MapMarkerLabel>{props.label}</MapMarkerLabel>
    </MapMarkerContainer>
  )
}

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoidHJ2cmIiLCJhIjoiY2pyM3p4aTlmMWMwbjRibzlia3MyMjZhYiJ9.JCLCk3g-GiVOcKiNWGjOXA",
  minZoom: 10.8,
  scrollZoom: false,
  dragPan: isTouchDevice() ? false : true
});

const TextContainer = styled.div`
  max-width: 1080px;
  width: 400px;
  background-color: #fff;
  margin: auto;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  font-size: 18px;
`

const kiosksList = [
  [
    "UW Hall Health Clinic", // [-122.3040, 47.6561682]
    "10am-3pm (Tues-Fri)"
  ],
  [
    "UW Health Sciences Building (Rotunda)", // [-122.310719, 47.6511139]
    "11am-1pm (Tues-Thur)"
  ],
  [
    "UW Husky Union Building (HUB)", // [-122.30530, 47.6550]
    "10am-3pm (Tues-Fri)"
  ]
]

const kioskData = {
  "1": {
    coords: [-122.3040, 47.6561682],
    name: "UW Hall Health Clinic",
    hours: "10am-3pm (Tues-Fri)"
  },
  "2": {
    coords: [-122.310719, 47.6511139],
    name: "UW Health Sciences Building (Rotunda)",
    hours: "11am-1pm (Tues-Thur)"
  },
  "3": {
    coords: [-122.30530, 47.6550],
    name: "UW Husky Union Building (HUB)",
    hours: "10am-3pm (Tues-Fri)"
  }
}

class Kiosks extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      zoomToIndex: null
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  onClick(d) {
    this.setState({zoomToIndex: d});
  }

  render() {

    const center = this.state.zoomToIndex
      ? kioskData[this.state.zoomToIndex].coords : [-122.306754, 47.654209]
    const zoom = this.state.zoomToIndex ? 15 : 14

    const MarkerArray = Object.keys(kioskData).map((key) => {
      return (
        <Marker
          key={key}
          coordinates={kioskData[key].coords}
          anchor="bottom"
          onClick={() => this.onClick(key)}
        >
          <MapMarker label={key}/>
        </Marker>
      );
    });

    return(
      <utils.OuterContainer>
        <utils.ContentContainer>
          <utils.H1>Kiosk locations</utils.H1>
          <Flex>
            <MapContainer>
              <Map
                style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
                containerStyle={{height: "100%", width: "100%"}}
                center={center}
                zoom={[zoom]}
                maxBounds={[[-122.502289, 47.410749], [-122.186659, 47.761671]]}
                >
                {MarkerArray}
                <ZoomControl zoomDiff={1.0}/>
              </Map>
            </MapContainer>
            <TextContainer>
              <utils.Ordered items={kiosksList}/>
              <span style={{marginLeft: "32px"}}>
                <i>Updated for the week of Jan 21, 2019. There are
                additional enrollment locations at Hutch Kids, DESC, Pioneer Square
                Clinic and St. Martin's de Porres.</i>
              </span>
            </TextContainer>
          </Flex>
        </utils.ContentContainer>
      </utils.OuterContainer>
    )
  }

}

export default Kiosks = withRouter(Kiosks)
