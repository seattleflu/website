import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const OuterContainer = styled.div`
  max-width: 1080px;
  margin: 0px auto;
  flex: 1 0 auto;
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 1em 0;
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
`
export const CenteredParagraph = styled.p`
  font-size: 18px;
  text-align: center;
  line-height: 1.4;
  margin: 1.5em auto;
  max-width: 80%;
  @media (max-width: 767px) {
    max-width: 100%;
    font-size: 16px;
  }
`
export const LargerParagraph = styled.p`
  font-size: 20px;
  line-height: 1.5;
  margin: 1em auto;
  max-width: 90%;
  text-align: justify;
  @media (max-width: 767px) {
    max-width: 95%;
    font-size: 18px;
  }
`
export const Br = styled.br`
  line-height: 3;
  @media (max-width: 767px) {
    line-height: 0.5;
  }
`
export const H2 = styled.h2``

export const H3 = styled.h3``


/* Feature Block */
export const FeatureContainer = styled.div`
  color: #FFFFFF;
  background-color: #0a5ca8;
  border-radius: 3px;
  padding: 1em 2em;
  margin: 3em auto;
  font-weight: 400;
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 2em 2em;
    margin: 1em auto;
  }
`
const FeatureButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const FeatureButton = styled.a`
  border: 1px solid #EDEFEF;
  background-color: inherit;
  color: #EDEFEF;
  border-radius: 3px;
  padding: 10px;
  text-transform: uppercase;
  transition: background .3s, color .3s;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #7cb9f2;
    color: #0a5ca8;
  }
`
const FeatureTitle = styled(H2)`
  color: #FFFFFF;
  text-align: center;
`
const FeatureFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2em 0;
  line-height: 1.7rem;
  @media (max-width: 767px) {
    flex-direction: column;
    line-height: 1.4rem;
    margin: .5em 0;
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
  @media (max-width: 767px) {
    margin-top: 2em;
  }
`;

const FeatureSection = styled.section`
  flex: 5;
  margin-left: 2em;
  @media (max-width: 767px) {
    margin-left: 0;
  }
`

export const FeatureH3 = styled(H3)`
  text-align: center;
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
`

export const UnorderedList = styled.ul`
    margin: 2em auto;
    width: fit-content;
    font-size: 20px;
    @media (max-width: 767px) {
      font-size: 18px;
      margin: .5em auto;
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
        border: 2px solid #1BAB4C
    }
`
export const SubmitButton = styled.button`
    width: 20%;
    border: 1px solid #FFFFFF;
    background-color: inherit;
    color: #FFFFFF;
    border-radius: 3px;
    padding: 5px;
    margin: 0px 15px;
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        background-color: #7cb9f2;
        color: #0a5ca8;
    }
    @media (max-width: 767px) {
      width: auto;
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
  @media (max-width: 767px) {
    display: block;
    text-align: center;
    padding: .25em;
    overflow-y: scroll;
    white-space: nowrap;
  }
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

  &.is-selected {
    border-color: #92C4DA;
    border-bottom: 1px solid #FFFFFF;
  }
  @media (max-width: 767px) {
    display: inline-block;
  }
`
export const STabPanel = styled(TabPanel)`
  display: none;
  min-height: 40vh;
  border-top: 1px solid #92C4DA;
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
  @media (max-width: 767px) {
    padding-bottom: 0;
    margin: 2em 0 0 0;
  }
`
export const Banner = styled.div`
  padding: 1em;
  margin: 1em;
  text-align: center;
`

export const LanguageButton = styled.button`
  background-color: #1BAB4C;
  color: #fff;
  border: 2px solid #1BAB4C;
  border-radius: 3px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
