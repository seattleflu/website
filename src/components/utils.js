import React from 'react';
import styled, { css } from 'styled-components'
import { Link } from "react-router-dom";

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
export const LeftParagraph = styled.p`
  font-size: 18px;
  line-height: 1.4;
  margin: 0px;
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

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: ${props => props.theme.neutral700};
  background-color: #fff;
  padding: 0px;
  margin: 2em auto;
  max-width: 1080px;
  @media (max-width: 735px) {
    flex-direction: column;
    padding: 2em 0em;
  }
`
export const HeroBlock = (props) => {
  const BlockContainer = styled.div`
    margin: 0 2em;
  `
  const Title = styled(H1)`
    color: ${props => props.theme.neutral700};
    margin: 10px 0px 10px 0px;
    @media (max-width: 500px) {
      font-size: 40px;
    }
  `
  const Logo = styled.img`
    margin: auto;
    min-width: 320px;
    max-width: 320px;
    display: block;
    float: right;
    padding: 0px 0px 5px 10px;
  `
  return (
    <BlockContainer>
      <Logo src={props.image} alt="image"/>
      <Title left>{props.title}</Title>
      <LeftParagraph>{props.children}</LeftParagraph>
    </BlockContainer>
  )
}


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
const FeatureButton = styled(Link)`
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
export const InternalLink = styled(Link)`
  ${baseLink}
`;
export const ExternalLink = styled.a`
  ${baseLink}
`;

const softLink = css`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: ${props => props.theme.accent300};
  }
`
export const InternalSoftLink = styled(Link)`
  ${softLink}
`;
export const ExternalSoftLink = styled.a`
  ${softLink}
`;


/* https://www.w3.org/Style/Examples/007/color-bullets.en.html */
export const ListContainer = styled.ol`
  list-style: none;
  counter-reset: li;
  margin: 0 1em;
`
export const ListItem = styled.li`
  margin: 1.5em auto;
  top: 0;
  counter-increment: li;
  color: ${props => props.theme.primary500};
  font-weight: 700;
  font-size: 18px;
  &:before {
    content: "."counter(li);
    display: inline-block;
    width: 1em;
    margin-left: -1.5em;
    margin-right: 0.5em;
    text-align: right;
    direction: rtl
  }

`
export const ListItemContent = styled.p`
  /* padding-left: 2em; */
  color: ${props => props.theme.neutral600};
  font-weight: 300;
  font-size: 18px;
  line-height: 1.4;
  margin: 0.75em auto;
`

export const Ordered = (props) => {
  return (
    <ListContainer {...props}>
      {props.items.map((item) => (
        <ListItem {...props} key={item.header}>
          <span>{item[0]}</span>
          <ListItemContent>{item[1]}</ListItemContent>
        </ListItem>
      ))}
    </ListContainer>
  )
}

export const Quote = (props) => {
  const QuoteContainer = styled.div`
    background-color: ${props => props.theme.neutral200};
    color: ${props => props.theme.neutral900};
    padding: 3em;
    font-style: italic;
    @media (max-width: 735px) {
      padding: 1em;
    }
  `
  const Who = styled.div`
    font-weight: 400;
    text-align: right;
    font-style: normal;
  `
  return (
    <QuoteContainer>
      {props.children}
      <Who>
        {props.who}
      </Who>
    </QuoteContainer>
  )
}

export const UnorderedList = styled.ul`
    margin: auto;
    width: fit-content;
    font-size: 20px;
    @media (max-width: 768px) {
        width: 75%;
    }
`
