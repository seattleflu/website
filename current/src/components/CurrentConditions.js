import React from 'react';
import { DateTime } from 'luxon';

import FluMap from './FluMap/';
import SeasonTimeline from './SeasonTimeline';
import fluStats from '../data/flu-by-week.json';

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

    const fluCurrentStatusText = generateCurrentStatusText(fluStats);

    return (
      <>
        <p>
          It’s {currentFullMonth} {currentYear}, which means
          we’re <strong>{fluSeasonProgressText[currentMonth]}</strong> the {seasonStartYear}-
          {seasonStartYear + 1} flu season.

          This week we’re <strong>{fluCurrentStatusText}</strong>.
        </p>

        <SeasonTimeline currentMonth={currentMonth} />

        <p>
          The map below shows confirmed flu cases this week from across Seattle.
          Hold the left mouse button to drag and pan the map.
          Hold the right mouse button to rotate and pitch the map.
          Use the mouse wheel to zoom in and out.
        </p>

        <FluMap/>
      </>
    );
  }
}

/**
 * Generates semi-quantitative and superlative text using the ranking from the
 * current week's number of positive flu cases as compared to the number of
 * positive flu cases from the rest of the flu season so far.
 *
 * @param {Object} fluStats - Data from ID3C describing weekly number of flu
 *    cases for this flu season.
 * @return {string} - Text describing this week's status in the flu season.
 */
const generateCurrentStatusText = (fluStats) => {
  const currentFluCount = getCurrentFluCount(fluStats);

  let fluCounts = Object.keys(fluStats)
                    .map((k) => fluStats[k]["count"])
                    .sort((a, b) => b - a);

  const superlatives = {
    0: " ",
    1: "second-",
    2: "third-",
    3: "fourth-",
    4: "fifth-",
  }

  const weekRank = fluCounts.indexOf(currentFluCount);

  if (weekRank === -1) {
    return 'not processing flu samples';
  } else if (weekRank < 5) {
    return `experiencing the ${superlatives[weekRank]}highest
        rates of flu we've seen so far this season`;
  } else if (weekRank / fluCounts.length < 0.75) {
      return 'experiencing an average amount of flu for this season';
  } else {
      return 'not seeing a lot of flu cases';
  }
}

/**
 * Returns the total number of positive flu cases for this week from the given
 * data.
 *
 * @param {Array} fluStats - An array of objects containing weekly flu data.
 * @return {number} - The number of positive flu cases for this week.
 */
const getCurrentFluCount = (fluStats) => {
  let weeklyFluCounts = {};

  fluStats.forEach(i => {
    let weekNumber = DateTime.fromISO(i.encountered_week).weekNumber;
    weeklyFluCounts[weekNumber] = i.count;
  });

  return weeklyFluCounts[DateTime.local().weekNumber];
}
