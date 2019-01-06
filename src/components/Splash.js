import React from 'react';
import * as utils from './utils';


export const Splash = () => (
  <utils.OuterContainer>
    <utils.ContentContainer>
      <utils.CenteredParagraph>
        <utils.Bold>We're tracking the flu in Seattle.</utils.Bold>
        {`
          Maybe you’ve seen Seattle Flu Study kiosks around Seattle.
          Or maybe you’re just curious for more information.
          You are in the right place.
          We’re reaching out to our Seattle community to help us track the spread of the flu.
          If you or someone you know are experiencing flu-like symptoms, we could really use your help!
        `}
      </utils.CenteredParagraph>
      <utils.CenteredParagraph>
        <utils.Bold>Sore throat, stuffy nose and achey all over? We need <i>You</i>.</utils.Bold>
        {`
          All age groups (from infants to elderly) can help us with this study.
        `}
      </utils.CenteredParagraph>
      <utils.CenteredParagraph>
        <utils.Bold>We’re in this Together.</utils.Bold>
        {`
          Your participation could help us stop the spread of the flu, lead to personalized treatments, smarter prevention and a safer and healthier world.
        `}
      </utils.CenteredParagraph>
      <utils.FeatureContainer>
        <utils.FeatureBlock
          title="Flu 101"
        >
          {`
            Today, up to 80,000 people in the United States die from the flu each year, and more than double that number get sick and suffer.
            We know that the flu is spread from person to person, and we know that it causes outbreaks every year.
            What we don’t know is exactly how it spreads, and why certain flu strains are stronger and more dangerous than others.
            We’re on a mission to change that.

            Only 10-20 percent of people who have flu-like symptoms actually have the flu virus.
            This is important because anti-viral medications, like Tamiflu are only effective against the flu virus.
            (pull these two sentences right)
          `}
        </utils.FeatureBlock>
      </utils.FeatureContainer>
      <utils.FeatureContainer>
        <utils.FeatureBlock
          title="You can help us"
          href="/kiosks"
          buttonTitle="Find a Kiosk"
        >
          {`
            We've set up a number of kiosks around Seattle to gather samples from people who feel like they may have the flu.
            If you are feeling ill and see a kiosk, you can take 15 minutes to participate (we’ll work extra hard to distract you from feeling crummy).
            a. We’ll make sure that you have 2 or more flu-like symptoms (fever, cough, sore throat, runny or stuffy nose, muscle or body aches).
            b. You’ll answer some questions about your health and where you live (geography matters because we are mapping where the flu is).
            c. We’ll take a swab from the front of your nose to collect the exact virus you have.
            d. You’re done! Enjoy your $10 Starbucks gift card for participating!
            (make this a proper list)
          `}
        </utils.FeatureBlock>
      </utils.FeatureContainer>
      <utils.FeatureContainer>
        <utils.FeatureBlock
          title="Smarter. Faster. Wellness."
          href="/faq"
          buttonTitle="Questions?"
        >
          {`
            We’re on a mission to understand how the flu enters and spreads through a community because the more we know the faster and smarter we can be.
            Have any other questions? Check out our FAQ.
          `}
        </utils.FeatureBlock>
      </utils.FeatureContainer>
    </utils.ContentContainer>
  </utils.OuterContainer>
);
