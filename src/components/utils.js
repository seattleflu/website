import React from 'react';
import styled, { css } from 'styled-components'
import { Link } from "react-router-dom";

export const OuterContainer = styled.div`
  max-width: 1080px;
  margin: 3em auto;
  @media (max-width: 735px) {
    max-width: 90vw;
  }
`
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.theme.neutral800};
`
export const CenteredParagraph = styled.p`
  font-weight: 300;
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  margin: 1.5em auto;
  max-width: 80%;
  @media (max-width: 735px) {
    max-width: 100%;
  }
`
export const FeatureContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: ${props => props.theme.neutral100};
  background-color: ${props => props.theme.primary600};
  padding: 4em 3em;
  margin: 2em auto;
  @media (max-width: 735px) {
    flex-direction: column;
    padding: 2em 0em;
  }
`
export const FeatureBlock = (props) => {
  const BlockContainer = styled.div`
    margin: 0 2em;
    flex: 1 0 20%;
  `
  const Button = styled.button`
    border: 1px solid ${props => props.theme.neutral200};
    background-color: inherit;
    color: ${props => props.theme.neutral200};
    border-radius: 3px;
    padding: 10px;
    text-transform: uppercase;
    transition: background .3s, color .3s;
    font-weight: 800;
    font-size: 14px;
    display: block;
    margin: 2em auto;
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.accent500};
      color: ${props => props.theme.neutral100};
    }
  `
  const Title = styled(H2)`
    color: ${props => props.theme.neutral200};
  `
  return (
    <BlockContainer>
      <Title>{props.title}</Title>
      <CenteredParagraph>{props.children}</CenteredParagraph>
      <Button href={props.href}>
        {props.buttonTitle ? props.buttonTitle : "find out more"}
      </Button>
    </BlockContainer>
  )
}
const BaseHeader = styled.div`
  font-weight: 600;
  text-align: ${props => props.left ? "left" : "center"};
  color: ${props => props.theme.neutral900};
  padding-top: 10px;
  padding-bottom: 5px;
`
export const H1 = styled(BaseHeader)`
  font-weight: 800;
  font-size: 36px;
`
export const H2 = styled(BaseHeader)`
  font-size: 30px;
`
export const H3 = styled(BaseHeader)`
  font-size: 24px;
`
export const Bold = styled.span`
  font-weight: 600;
`

const baseLink = css`
  cursor: pointer;
  text-decoration: none;
  flex-grow: 1;
  color: ${props => props.theme.primary500};
  &:hover {
    color: ${props => props.theme.accent500};
  }
`
export const InternalLink = styled(Link)`
  ${baseLink}
`;
export const ExternalLink = styled.a`
  ${baseLink}
`;
