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
  align-items: center;
  justify-content: space-around;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
`

const TextContainer = styled.p`
  margin-left: 6px;
  margin-right: 6px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
`

const ButtonContainer = styled.div`
  margin-left: 6px;
  margin-right: 6px;
  white-space: nowrap;
`

const Button = styled.a`
  background-color: #fff;
  color: #7065AB;
  border-radius: 20px;
  padding-left: 15px;
  padding-right: 15px;
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
          <ButtonContainer>
            <Button href="https://fluathome.org/sfs?utm_source=seattleflu.org&utm_medium=referral&utm_campaign=Banner_LearnMore">Learn More</Button>
          </ButtonContainer>
        </InnerContainer>
      </OuterContainer>
    )
  }

}

export default FluAtHomeBanner;
