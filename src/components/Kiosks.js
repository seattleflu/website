import React from 'react';
import styled from 'styled-components'
import * as utils from './utils';
import kiosks from '../img/kiosks.png';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto 3em;
  max-width: 1080px;
  @media (max-width: 1080px) {
    max-width: 80vw;
  }
  @media (max-width: 735px) {
    flex-direction: column;
    max-width: 100vw;
    margin: 0 0 3em;
  }
`

export const Kiosks = () => (
  <utils.OuterContainer>
    <utils.ContentContainer>
      <utils.H1>Kiosk locations</utils.H1>
      <Flex>
        <img src={kiosks} alt="kiosks" width="100%"/>
      </Flex>
    </utils.ContentContainer>
  </utils.OuterContainer>
);
