import React from 'react';
import styled from 'styled-components'
import * as utils from './utils';
import kiosks from '../img/seattle-map.jpg';

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

const OL = styled.ol`
  margin: 0 2em;
  color: ${props => props.theme.primary600}
  font-weight: 600;
  line-height: 60px;
  @media (max-width: 1000px) {
    line-height: 40px;
  }
  @media (max-width: 500px) {
    line-height: 22px;
    margin: 2em auto 0;
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


export const Kiosks = () => (
  <utils.OuterContainer>
    <utils.ContentContainer>
      <utils.H1>Kiosk locations</utils.H1>
      <Flex>
        <ImgContainer>
          <Img src={kiosks} alt="kiosks"/>
        </ImgContainer>
        <OL>
          <li>University of Washington Hall Health</li>
          <li>University of Washington Health Sciences</li>
          <li>University of Washington Husky Union Building</li>
          <li>Hutch Kids</li>
          <li>DESC (3rd Ave/Yesler)</li>
          <li>Pioneer Square Clinic</li>
          <li>St. Martin's de Porres</li>
        </OL>
      </Flex>
    </utils.ContentContainer>
  </utils.OuterContainer>
);
