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

// const OL = styled.ol`
//   line-height: 5vw;
//   margin: 0 2em;
//   color: ${props => props.theme.primary600}
//   font-weight: 600;
//   @media (max-width: 500px) {
//     line-height: 22px;
//     margin: 2em auto 0;
//   }
// `
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
      </Flex>
    </utils.ContentContainer>
  </utils.OuterContainer>
);
