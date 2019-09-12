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
export const LargerParagraph = styled.p`
  font-size: 20px;
  line-height: 1.5;
  margin: 1em auto;
  max-width: 80%;
  @media (max-width: 735px) {
    max-width: 95%;
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
export const H2 = styled(BaseHeader)`
  font-size: 32px;
`
export const H3 = styled(BaseHeader)`
  font-size: 24px;
`
export const Bold = styled.span`
  font-weight: 700;
`

/* Feature Block */
export const FeatureContainer = styled.div`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary500};
  padding: 1em 2em;
  margin: 4em auto;
  font-weight: 400;
  @media (max-width: 735px) {
    flex-direction: column;
    padding: 2em 2em;
  }
`
const FeatureButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const FeatureButton = styled.a`
  border: 1px solid ${props => props.theme.neutral100};
  background-color: inherit;
  color: ${props => props.theme.neutral100};
  border-radius: 3px;
  padding: 10px;
  text-transform: uppercase;
  transition: background .3s, color .3s;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.primary300};
    color: ${props => props.theme.white};
  }
`
const FeatureTitle = styled(H2)`
  color: ${props => props.theme.white};
  text-align: center;
`
const FeatureFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 2em;
  margin-bottom: 2em;
  line-height: 1.7rem;
  @media (max-width: 735px) {
    flex-direction: column;
    line-height: 1.4rem;
  }
`
const FeatureMainText = styled.div`
  flex: 8;
`;
const FeatureSpacer = styled.div`
  flex: 1;
`
const FeatureSidebar = styled.div`
  flex: 3;
  text-align: left;
  font-size: 0.9rem;
  line-height: 22px;
  @media (max-width: 735px) {
    margin-top: 2em;
  }
`;

const FeatureSection = styled.section`
    flex: 5;
    margin-left: 2em;
`

export const Feature = (props) => {
  const children = React.Children.toArray(props.children);
  return (
    <FeatureContainer>
      <FeatureTitle>{props.title}</FeatureTitle>
      <FeatureFlexContainer>
        <FeatureMainText>
          {children[0]}
        </FeatureMainText>
        {children[1] ? (
          <>
            <FeatureSpacer/>
            <FeatureSidebar>
              {children[1]}
            </FeatureSidebar>
          </>
        ) : null}
      </FeatureFlexContainer>
      {(props.buttonText && props.buttonLink) ? (
        <FeatureButtonContainer>
          <FeatureButton to={props.buttonLink}>
            {props.buttonText}
          </FeatureButton>
        </FeatureButtonContainer>
      ) : null}
    </FeatureContainer>
  );
}

export const EvenTwoColumnFeature = (props) => {
  const children = React.Children.toArray(props.children);
  return (
    <FeatureContainer>
        <FeatureTitle>{props.title}</FeatureTitle>
        <FeatureFlexContainer>
            <FeatureSection>
                {children[0]}
            </FeatureSection>
            <FeatureSection>
                {children[1]}
            </FeatureSection>
        </FeatureFlexContainer>
    </FeatureContainer>
  )
}


const baseLink = css`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.accent500};
  &:hover {
    color: ${props => props.theme.accent300};
  }
`
export const InternalLink = styled.a`
  ${baseLink}
`;
export const ExternalLink = styled.a`
  ${baseLink}
`;

export const UnorderedList = styled.ul`
    margin: auto;
    width: fit-content;
    font-size: 20px;
    @media (max-width: 768px) {
        width: 75%;
    }
`
