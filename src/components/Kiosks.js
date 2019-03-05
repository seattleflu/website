import React from 'react';
import PropTypes from "prop-types";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import isTouchDevice from "is-touch-device";
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import * as utils from './utils';
import markerImage from '../img/marker.png';
import googleMapsLogo from '../img/google-maps.png';
import kiosk1 from '../img/kiosk-1.jpg';
import kiosk2 from '../img/kiosk-2.jpg';
import kiosk3 from '../img/kiosk-3.jpg';

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0em 1em 3em 1em;
  max-width: 1080px;
  @media (max-width: 1080px) {
    max-width: 100vw;
  }
  @media (max-width: 720px) {
    flex-direction: column;
    max-width: 100vw;
    margin: 1em 0 3em;
  }
`

const ImageFlex = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0em 1em 3em 1em;
  max-width: 1080px;
  @media (max-width: 1080px) {
    flex-direction: column;
    max-width: 100vw;
    margin: 1em 0 3em;
  }
`

const Image = styled.img`
  max-width: 333px;
  max-height: 222px;
  width: auto;
  height: auto;
  margin: auto;
  padding: 9px;
`

const MapContainer = styled.div`
  max-width: 1080px;
  width: 600px;
  @media (max-width: 720px) {
    width: 100%;
  }
  @media (max-width: 1080px) {
    width: 400px;
  }
  background-color: #fff;
  margin: auto;
  height: 670px;
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

// const CenteredIntro = styled.h3`
//   max-width: 1080px;
//   text-align: center;
//   color: ${props => props.theme.warning500};
// `

const mapDefaults = {
  center: [-122.306754, 47.560],
  maxBounds: [[-122.7, 47.3], [-122.0, 47.8]],
  zoomOverall: 10.4,
  zoomPin: 16,
  minZoom: 10
}
const kioskData = {
  "1": {
    coords: [-122.3040, 47.6561682],
    name: "UW Hall Health Clinic",
    hours: "10am-3pm (Mon-Fri)",
    gmaps: "https://goo.gl/maps/7dviXTJQtX72"
  },
  "2": {
    coords: [-122.310719, 47.6511139],
    name: "UW Health Sciences Building (Rotunda)",
    hours: "11am-1pm (Mon-Thur)",
    gmaps: "https://goo.gl/maps/qT8dHRxJSgS2"
  },
  "3": {
    coords: [-122.30530, 47.6550],
    name: "UW Husky Union Building (HUB)",
    hours: "10am-3pm (Mon-Fri)",
    gmaps: "https://goo.gl/maps/kF4Ub265yM32"
  },
  "4": {
    coords: [-122.3247, 47.6035],
    name: "Harborview Medical Center (Main Entrance)",
    hours: "10am-2pm (Mon-Fri)",
    gmaps: "https://goo.gl/maps/FnoB15R6maz"
  },
  "5": {
    coords: [-122.305, 47.444],
    name: "SeaTac Airport (International Arrivals)",
    hours: "10am-3pm (Mon, Thur, Fri)",
    gmaps: "https://goo.gl/maps/f3nmyVQWjok",
    zoom: 11
  }
}

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoidHJ2cmIiLCJhIjoiY2pyM3p4aTlmMWMwbjRibzlia3MyMjZhYiJ9.JCLCk3g-GiVOcKiNWGjOXA",
  minZoom: mapDefaults.minZoom,
  scrollZoom: false,
  dragPan: isTouchDevice() ? false : true
});

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

  onMarkerClick(d) {
    this.setState({zoomToIndex: d});
  }

  onMapMove(d) {
    this.setState({zoomToIndex: null});
  }

  render() {

    let center, zoom;
    if (this.state.zoomToIndex) {
      /* map focused on one pin */
      center = kioskData[this.state.zoomToIndex].coords;
      zoom = kioskData[this.state.zoomToIndex].zoom || mapDefaults.zoomPin;
    } else {
      /* "overall" view */
      zoom = mapDefaults.zoomOverall;
      center = mapDefaults.center;
    }

    const MarkerArray = Object.keys(kioskData).reverse().map((key) => {
      return (
        <Marker
          key={key}
          coordinates={kioskData[key].coords}
          anchor="bottom"
          onClick={() => this.onMarkerClick(key)}
        >
          <MapMarker label={key}/>
        </Marker>
      );
    });

    const TextArray = Object.keys(kioskData).map((key) => {
      return (
        <utils.ListItem
          key={key}
        >
          <span
            onClick={() => this.onMarkerClick(key)}
            style={{"cursor": "pointer"}}
          >
            {kioskData[key].name}
          </span>
          <utils.ListItemContent
            style={{"margin": "0.25em auto"}}
          >
            {kioskData[key].hours}
            <br/>
            <utils.ExternalLink target="_blank" href={kioskData[key].gmaps}>
              <img
                alt="marker"
                width="80px"
                height="auto"
                src={googleMapsLogo}
                style={{"marginLeft": "2px"}}
              />
            </utils.ExternalLink>
          </utils.ListItemContent>
        </utils.ListItem>
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
                maxBounds={mapDefaults.maxBounds}
                onDragEnd={() => this.onMapMove()}
                >
                {MarkerArray}
                <ZoomControl zoomDiff={1.0}/>
              </Map>
            </MapContainer>
            <TextContainer>
              <utils.ListContainer>
                {TextArray}
              </utils.ListContainer>
              <span style={{marginLeft: "32px", marginRight: "10px"}}>
                <i>Updated for the week of March 4th, 2019. There are
                additional enrollment locations at Hutch Kids, West Campus
                Childcare Center, SeaMar Clinic, DESC, Pioneer Square
                Clinic, St. Martin's de Porres and Costco Headquarters.</i>
              </span>
            </TextContainer>
          </Flex>
          <ImageFlex>
            <Image alt="Kiosk 1" src={kiosk1}/>
            <Image alt="Kiosk 2" src={kiosk2}/>
            <Image alt="Kiosk 3" src={kiosk3}/>
          </ImageFlex>
        </utils.ContentContainer>
      </utils.OuterContainer>
    )
  }

}

export default Kiosks = withRouter(Kiosks)
