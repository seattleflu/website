import React from 'react';
import * as utils from './utils';


export const Flu101 = () => (
  <utils.OuterContainer>
    <utils.ContentContainer>
      <utils.H1>Influenza 101</utils.H1>
      <utils.CenteredParagraph>
        {`Today, more than 80,000 people in the United States die from the flu each year, and more than double that number get sick and suffer.
        We know that the flu is spread from person to person, and we know that it causes outbreaks every year.
        What we don’t know is how it spreads, and why certain flu strains are stronger and more dangerous than others.
        We’re on a mission to change that.`}
      </utils.CenteredParagraph>

      <utils.H3>Did You Know?</utils.H3>
      <utils.CenteredParagraph>
        {`Only 10-20 percent of people who have flu-like symptoms actually have the flu virus.
        This is important because anti-viral medications, like Tamiflu are only effective against the flu virus.
        Our study will help us identify and learn more about flu viruses, which are treatable and can be effectively managed when caught earlier.`}
      </utils.CenteredParagraph>

    </utils.ContentContainer>
  </utils.OuterContainer>
);