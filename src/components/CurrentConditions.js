import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { CenteredParagraph, H1, OuterContainer, ContentContainer } from './utils';
import FluMap from './FluMap/';
import SeasonTimeline from './SeasonTimeline';

const P = styled(CenteredParagraph)`
  max-width: 32em;
`;

const SEASON_CUTOFF_MONTH = 9;


export default class CurrentConditions extends React.Component {
  render() {
    const currentDate = DateTime.local();
    const currentMonth = currentDate.month;
    const currentFullMonth = currentDate.monthLong;
    const currentYear = currentDate.year;
    const seasonStartYear = currentMonth < SEASON_CUTOFF_MONTH ? currentYear - 1 : currentYear;

    const fluSeasonProgressText = {
      1: 'about halfway through',
      2: 'about two-thirds of the way through',
      3: 'over two-thirds of the way through',
      4: 'nearing the end of',
      5: 'finishing up',
      6: 'done with',
      7: 'done with',
      8: 'done with',
      9: 'nearing the start of',
      10: 'at the start of',
      11: 'one month into',
      12: 'about one-third of the way through',
    };

    return (
      <OuterContainer>
        <ContentContainer>
          <H1>Current Flu Conditions</H1>

          <P>
            It’s {currentFullMonth} {currentYear}, which means
            we’re <strong>{fluSeasonProgressText[currentMonth]}</strong> the {seasonStartYear}-
            {seasonStartYear + 1} flu season.
            This week we’re experiencing <mark>the highest rates of flu we’ve
            seen so far</mark>.
          </P>

          <SeasonTimeline currentMonth={currentMonth} />

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
