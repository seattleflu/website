import React from 'react';
import styled from 'styled-components';

import { CenteredParagraph, H1, OuterContainer, ContentContainer } from './utils';
import FluMap from './FluMap/';
import SeasonTimeline from './SeasonTimeline';

const P = styled(CenteredParagraph)`
  max-width: 32em;
`;

export default class CurrentConditions extends React.Component {
  render() {
    return (
      <OuterContainer>
        <ContentContainer>
          <H1>Current Flu Conditions</H1>

          <P>
            It’s <mark>Feburary 2019</mark>, which means we’re about <mark>two thirds</mark> of the way through the 2018–2019 flu season.
            This week we’re experiencing <mark>the highest rates of flu we’ve seen so far</mark>.
          </P>

          <SeasonTimeline/>

          <P>
            The map below shows confirmed flu cases this week from across Seattle.
            Hold the left mouse button to drag and pan the map.
            Hold the right mouse button to rotate and pitch the map.
            Use the mouse wheel to zoom in and out.
          </P>

          <FluMap/>
        </ContentContainer>
      </OuterContainer>
    );
  }
}
