import React from 'react';
import styled, { css } from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const theme = {
  white: "#FFFFFF",
  black: "#000000",
  neutral100: "#EDEFEF",
  neutral200: "#C9CED0",
  neutral300: "#A6AEB0",
  neutral400: "#828D91",
  neutral500: "#707D81",
  neutral600: "#626D71",
  neutral700: "#464E51",
  neutral800: "#2A2F30",
  neutral900: "#0E1010",
  primary100: "#C2DEEA",
  primary200: "#ADD3E3",
  primary300: "#92C4DA",
  primary400: "#6EB0CE",
  primary500: "#3D95BD",
  primary600: "#2E708E",
  primary700: "#23546B",
  primary800: "#1A3F50",
  primary900: "#142F3C",
  accent100: "#FDE3B4",
  accent200: "#FCDA9B",
  accent300: "#FBCE7A",
  accent400: "#F9BE4D",
  accent500: "#F7A812",
  accent600: "#B97E0E",
  accent700: "#8B5F0A",
  accent800: "#684708",
  accent900: "#4E3506",
  warning500: "#D81C1C",
}

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
  color: ${theme.neutral800};
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
export const Br = styled.br`
  line-height: 3;
`

const BaseHeader = styled.div`
  font-family: "Nunito";
  font-weight: 700;
  text-align: ${props => props.left ? "left" : "center"};
  color: ${theme.neutral700};
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
  color: ${theme.white};
  background-color: ${theme.primary500};
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
  border: 1px solid ${theme.neutral100};
  background-color: inherit;
  color: ${theme.neutral100};
  border-radius: 3px;
  padding: 10px;
  text-transform: uppercase;
  transition: background .3s, color .3s;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${theme.primary300};
    color: ${theme.white};
  }
`
const FeatureTitle = styled(H2)`
  color: ${theme.white};
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

export const FeatureH3 = styled(H3)`
  color: inherit;
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
          <FeatureButton href={props.buttonLink}>
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


export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${theme.accent500};
  &:hover {
    color: ${theme.accent300};
  }
`

export const UnorderedList = styled.ul`
    margin: auto;
    width: fit-content;
    font-size: 20px;
    @media (max-width: 768px) {
        width: 75%;
    }
`
export const Form = styled.form`
    display: flex;
    padding: 20px;
    justify-content: center;
`
export const Input = styled.input`
    width: 80%;
    padding: 10px;
    font-size: 1.2em;
    &:focus {
        outline: none;
        border: 2px solid ${theme.accent500}
    }
`
export const SubmitButton = styled.button`
    width: 20%;
    border: 1px solid ${theme.neutral100};
    background-color: inherit;
    color: ${theme.neutral100};
    border-radius: 3px;
    padding: 5px;
    margin: 0px 15px;
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        background-color: ${theme.primary300};
        color: ${theme.white};
    }
`

export const STabs = styled(Tabs)`
    width: 100%;
`
export const STabList = styled(TabList)`
  list-style-type: none;
  padding: .25em;
  display: flex;
  justify-content: center;
  margin: 0;
`
export const STab = styled(Tab)`
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 4px 4px 0px 0px;
  padding: 1em;
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;

  &.is-selected {
    border-color: ${theme.primary300};
    border-bottom: 1px solid white;
  }
  @media (max-width: 735px) {
      padding: 0.5em;
  }
`
export const STabPanel = styled(TabPanel)`
  display: none;
  min-height: 40vh;
  border-top: 1px solid ${theme.primary300};
  padding: 2em .5em;
  margin-top: -5px;

  &.is-selected {
    display: block;
  }
`
export const MoreInfo = styled.div`
  margin: 1em;
  padding-bottom: 1.5em;
  font-size: 16px;
  text-align: center;
`
export const Banner = styled.div`
  background-color: #F7A812;
  padding: 1em;
`
