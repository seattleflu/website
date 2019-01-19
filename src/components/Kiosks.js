import React from 'react';
import PropTypes from "prop-types";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import * as utils from './utils';
import kiosks from '../img/seattle-map.jpg';
import mapMarker from '../img/marker.png';

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2em auto 3em;
  max-width: 1080px;
  @media (max-width: 1080px) {
    max-width: 80vw;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    max-width: 100vw;
    margin: 1em 0 3em;
  }
`

const Ol = styled.ol`
  margin: 0 2em;
  color: ${props => props.theme.primary600}
  font-weight: 600;
  @media (max-width: 500px) {
    margin: 2em auto 0;
  }
`
const Li = styled.li`
  padding-top: 40px;
  padding-bottom: 5px;
  @media (max-width: 1000px) {
    padding-top: 20px;
  }
  @media (max-width: 500px) {
    padding-top: 5px;
  }
`
const ImgContainer = styled.div`
  max-width: 40vw;
  @media (max-width: 500px) {
    width: 100vw;
    max-width: 100vw;
  }
`
const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
`
const Times = styled.div`
  color: ${props => props.theme.primary500}
  font-weight: 400;
  padding: 0;
`

const MapContainer = styled.div`
  max-width: 1080px;
  @media (max-width: 735px) {
    max-width: 90vw;
  }
  background-color: #fff;
  margin: auto;
  height: 400px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.primary500};
`

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoidHJ2cmIiLCJhIjoiY2pyM3p4aTlmMWMwbjRibzlia3MyMjZhYiJ9.JCLCk3g-GiVOcKiNWGjOXA"
});

class Kiosks extends React.Component  {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    viewport: {
      width: "100%",
      zoom: 12
    }
  };

  render() {
    return(
      <utils.OuterContainer>
        <utils.ContentContainer>
          <utils.H1>Kiosk locations</utils.H1>
          <MapContainer>
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{height: "400px", width: "100vw"}}
              center={[-122.3346527, 47.6061706]}
              >
              <Marker
                coordinates={[-122.3346527, 47.6061706]}
                anchor="bottom">
                <img alt="marker" width="40px" height="auto" src={mapMarker}/>
              </Marker>
            </Map>
          </MapContainer>
          <Flex>
            <ImgContainer>
              <Img src={kiosks} alt="kiosks"/>
            </ImgContainer>
            <Ol>
              <Li>University of Washington Hall Health</Li>
              <Times>10am-3pm (Tues-Fri)</Times>
              <Li>University of Washington Health Sciences</Li>
              <Times>11am-1pm (Tues-Thur)</Times>
              <Li>University of Washington Husky Union Building</Li>
              <Times>10am-3pm (Tues-Fri)</Times>
              <Li>Hutch Kids</Li>
              <Li>DESC (3rd Ave/Yesler)</Li>
              <Times>11am-2pm (Wed), 1pm-4pm (Thur)</Times>
              <Li>Pioneer Square Clinic</Li>
              <Times>8:30am-11:30am (Tues-Fri)</Times>
              <Li>St. Martin's de Porres</Li>
              <Times>7pm-9pm (Tues & Thur)</Times>
            </Ol>
          </Flex>
        </utils.ContentContainer>
      </utils.OuterContainer>
    )
  }

}

export default Kiosks = withRouter(Kiosks)
