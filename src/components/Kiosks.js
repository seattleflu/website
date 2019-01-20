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
    width: 400px;
  }
  background-color: #fff;
  margin: auto;
  height: 600px;
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
  ],
  [
    "Hutch Kids", // [-122.332087, 47.626242]
    ""
  ],
  [
    "DESC (3rd Ave/Yesler)", // [-122.331118, 47.602180]
    "11am-2pm (Wed), 1pm-4pm (Thur)"
  ],
  [
    "Pioneer Square Clinic", // [-122.330037, 47.600585]
    "9am-12pm (Tue), 8:30am-11:30am (Wed-Fri)"
  ],
  [
    "St. Martin's de Porres", // [-122.338581, 47.588670]
    "7pm-9pm (Tues & Thur)"
  ]
]

class Kiosks extends React.Component  {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return(
      <utils.OuterContainer>
        <utils.ContentContainer>
          <utils.H1>Kiosk locations</utils.H1>
          <Flex>
            <MapContainer>
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{height: "100%", width: "100%"}}
                center={[-122.331, 47.625]}
                zoom={[11.8]}
                maxBounds={[[-122.502289, 47.410749], [-122.186659, 47.761671]]}
                >
                <Marker
                  coordinates={[-122.3040, 47.6561682]}
                  anchor="bottom">
                  <MapMarker label="1"/>
                </Marker>
                <Marker
                  coordinates={[-122.310719, 47.6511139]}
                  anchor="bottom">
                  <MapMarker label="2"/>
                </Marker>
                <Marker
                  coordinates={[-122.30530, 47.6550]}
                  anchor="bottom">
                  <MapMarker label="3"/>
                </Marker>
                <Marker
                  coordinates={[-122.332087, 47.626242]}
                  anchor="bottom">
                  <MapMarker label="4"/>
                </Marker>
                <Marker
                  coordinates={[-122.331118, 47.602180]}
                  anchor="bottom">
                  <MapMarker label="5"/>
                </Marker>
                <Marker
                  coordinates={[-122.330037, 47.600585]}
                  anchor="bottom">
                  <MapMarker label="6"/>
                </Marker>
                <Marker
                  coordinates={[-122.338581, 47.588670]}
                  anchor="bottom">
                  <MapMarker label="7"/>
                </Marker>
                <ZoomControl zoomDiff={1.0}/>
              </Map>
            </MapContainer>
            <utils.Ordered items={kiosksList}/>
          </Flex>
        </utils.ContentContainer>
      </utils.OuterContainer>
    )
  }

}

export default Kiosks = withRouter(Kiosks)
