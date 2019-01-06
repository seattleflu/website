import React from 'react';
import * as utils from './utils';


export const Splash = () => (
  <utils.OuterContainer>
    <utils.ContentContainer>
      <utils.H1>We're Tracking the flu in Seattle</utils.H1>
      <utils.CenteredParagraph>
        <utils.Bold>Help Us Outsmart the Flu.</utils.Bold>
        {`
          Maybe you’ve seen Seattle Flu Study kiosks around Seattle. 
          Or maybe you’re just curious for more information. 
          You are in the right place. 
          We’re reaching out to our Seattle community to help us track the spread of the flu. 
          If you or someone you know are experiencing flu-like symptoms, we could really use your help!
        `}
      </utils.CenteredParagraph>
      <utils.CenteredParagraph>
        <utils.Bold>Smarter. Faster. Wellness.</utils.Bold>
        {`
          We’re on a mission to understand how the flu enters and spreads through a community
          because the more we know the faster and smarter we can be.
        `}
      </utils.CenteredParagraph>
      <utils.FeatureContainer>
        <utils.FeatureBlock
          title="You can help us"
          href="something"
          buttonTitle="find a kiosk"
        >
          {`
            We've set up a number of kiosks around Seattle to gather samples from people who feel like they may have the flu.
            It takes only 15 minutes to participate and involves a questionnaire and a nose swab.
            Your participation could help us stop the spread of the flu, lead to personalized treatments, 
            smarter prevention and a safer and healthier world.
            And you'll get a $10 starbucks voucher.
          `}
        </utils.FeatureBlock>
        <utils.FeatureBlock
          title="Flu 101"
          href="something"
        >
          {`
            Today, more than 80,000 people in the United States die from the flu each year, and more than
            double that number get sick and suffer. We know that the flu is spread from person to person,
            and we know that it causes outbreaks every year. What we don’t know is exactly how it spreads, and
            why certain flu strains are stronger and more dangerous than others. We’re on a mission to
            change that.
          `}
        </utils.FeatureBlock>
      </utils.FeatureContainer>
    </utils.ContentContainer>
  </utils.OuterContainer>
);