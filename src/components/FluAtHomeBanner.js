import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components'

const OuterContainer = styled.div`
  background-color: #7065AB;
  margin: auto;
  height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`

const InnerContainer = styled.div`
  max-width: 1080px;
  @media (max-width: 735px) {
    max-width: 90vw;
  }
  margin: auto;
  height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
`

const Spacer = styled.div`
  width: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Button = styled.a`
  background-color: #fff;
  color: #7065AB;
  border-radius: 20px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 9px;
  padding-bottom: 9px;
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
          <p>
            Are you home sick? Is it tough to get out to a kiosk? Connect with our Flu@Home Research Study to take the test at home.
          </p>
          <Spacer/>
          <ButtonContainer>
            <Button href="https://fluathome.org/">Learn More</Button>
          </ButtonContainer>
        </InnerContainer>
      </OuterContainer>
    )
  }

}

export default FluAtHomeBanner;
