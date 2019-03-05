import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components'

const OuterContainer = styled.div`
  background-color: #7065AB;
  margin: auto;
  color: #fff;
`

const InnerContainer = styled.div`
  max-width: 1080px;
  @media (max-width: 735px) {
    max-width: 90vw;
  }
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
`

const TextContainer = styled.p`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
`

const Button = styled.a`
  background-color: #fff;
  color: #7065AB;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  text-transform: uppercase;
  transition: background .1s, color .1s;
  font-weight: 900;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #EB3694;
    color: ${props => props.theme.white};
  }
`

class FluAtHomeBanner extends React.Component  {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {

    return (
      <OuterContainer>
        <InnerContainer>
          <TextContainer>
            Are you home sick? Is it tough to get out to a kiosk? Connect with our Flu@Home Research Study to take the test at home.
          </TextContainer>
          <ButtonContainer style={{"marginRight": "10px"}}>
            <Button href="https://fluathome.org/">Learn More</Button>
          </ButtonContainer>
        </InnerContainer>
      </OuterContainer>
    )
  }

}

export default FluAtHomeBanner;
