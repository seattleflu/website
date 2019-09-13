import React from 'react';
import styled, { css } from 'styled-components'

export const OuterContainer = styled.div`
  max-width: 1080px;
  margin: 0px auto;
  flex: 1 0 auto;
  @media (max-width: 735px) {
    max-width: 90vw;
  }
  @media (max-width: 500px) {
    width: 100%;
    max-width: 100%;
    margin: 2em 0;
  }
`
export const ContentContainer = styled.div`
  padding: 0px;
  margin: 0px;
  color: ${props => props.theme.neutral800};
`
export const CenteredParagraph = styled.p`
  font-size: 18px;
  text-align: center;
  line-height: 1.4;
  margin: 1.5em auto;
  max-width: 80%;
  @media (max-width: 735px) {
    max-width: 100%;
  }
`

const BaseHeader = styled.div`
  font-family: "Nunito";
  font-weight: 700;
  text-align: ${props => props.left ? "left" : "center"};
  color: ${props => props.theme.neutral700};
  padding-top: 10px;
  padding-bottom: 5px;
`

export const H1 = styled(BaseHeader)`
  font-size: 56px;
  @media (max-width: 500px) {
    font-size: 40px;
  }
`
