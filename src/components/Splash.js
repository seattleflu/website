import React from 'react';
import * as utils from './utils';
import logo from '../img/logo.png';

export const Splash = () => (
  <utils.OuterContainer>
    <utils.ContentContainer>

      <utils.HeroContainer>
        <utils.HeroBlock
          title="Help us outsmart the flu"
          image={logo}
        >
        <>
          <div>
            <span>
              <utils.Bold>We're tracking the flu in Seattle. </utils.Bold>
            </span>
            <span>
              Maybe you’ve seen Seattle Flu Study kiosks around Seattle. Or maybe you’re just
              curious for more information. You are in the right place. We’re reaching out to our
              Seattle community to help us track the spread of the flu. If you or someone you know
              are experiencing flu-like symptoms, we could really use your help!
            </span>
          </div>
          <br/>
          <div>
            <span>
              <utils.Bold>Sore throat, stuffy nose and achey all over? We need <i>You</i>. </utils.Bold>
            </span>
            <span>
              All age groups (from infants to elderly) can help us with this study. Your
              participation could help us stop the spread of the flu, lead to personalized
              treatments, smarter prevention and a safer and healthier world.
            </span>
          </div>
        </>
        </utils.HeroBlock>
      </utils.HeroContainer>


      <utils.Feature
          title="Flu 101"
        >
          <div>
            Today, up to 80,000 people in the United States die from the flu each year, and more than 30 million people get sick and suffer.
            We know that the flu is spread from person to person, and we know that it causes outbreaks every year.
            What we don’t know is exactly how it spreads, and why certain flu strains are stronger and more dangerous than others.
            We’re on a mission to change that.
          </div>
          <div>
            Only 10-20% of people who have flu-like symptoms actually have the flu virus.
            This is important because anti-viral medications, like Tamiflu, are only effective against the flu virus.
          </div>
        </utils.Feature>

        <utils.Feature
          title="You can help us"
          buttonLink="/kiosks"
          buttonText="Find a Kiosk"
        >
          <div>
            <span>
              We've set up a number of kiosks around Seattle to gather samples from people
              who feel like they may have the flu. If you are feeling ill and see a kiosk,
              you can take 15 minutes to participate.
            </span>
            <ol type="a">
              <li>We’ll make sure that you have 2 or more flu-like symptoms (fever, cough, sore throat, runny or stuffy nose, muscle or body aches).</li>
              <li>You’ll answer some questions about your health and where you live (geography matters because we are mapping where the flu is).</li>
              <li>We’ll take a swab from your nose to collect the exact germs that you have.</li>
              <li>You’re done! Enjoy your $10 gift card for participating!</li>
            </ol>
          </div>
        </utils.Feature>

        <utils.Feature
          title="Smarter. Faster. Wellness."
          buttonLink="/faq"
          buttonText="Questions?"
        >
          {`
            We’re on a mission to understand how the flu enters and spreads through a community because the more we know the faster and smarter we can be.
            Have any other questions? Check out our FAQ.
          `}
        </utils.Feature>


    </utils.ContentContainer>
  </utils.OuterContainer>
);
