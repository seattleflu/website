import React from 'react';
import { DateTime, Duration } from 'luxon';

import FluMap from './FluMap/';
import { ColorRamp } from './FluMap/styles';
import SeasonTimeline from './SeasonTimeline';
import fluStats from '../data/flu-by-week.json';

const SEASON_CUTOFF_MONTH = 9;


export default class CurrentConditions extends React.Component {
  state = {
    currentDate: DateTime.local(),
  };

  componentDidMount() {
    const location = new URL(document.location);
    const week = location.searchParams.get("week");

    if (week)
      this.setState(s => ({...s, currentDate: DateTime.fromISO(week)}));
  }

  render() {
    const thisWeek = DateTime.local().toFormat("kkkk-'W'WW");

    const currentDate = this.state.currentDate;
    const currentWeek = currentDate.toFormat("kkkk-'W'WW");
    const currentMonth = currentDate.month;
    const currentFullMonth = currentDate.monthLong;
    const currentYear = currentDate.year;
    const seasonStartYear = currentMonth < SEASON_CUTOFF_MONTH ? currentYear - 1 : currentYear;

    const fluSeasonProgressText = {
      9: 'nearing the start of',
      10: 'at the start of',
      11: 'one month into',
      12: 'about one-third of the way through',
      1: 'about halfway through',
      2: 'about two-thirds of the way through',
      3: 'over two-thirds of the way through',
      4: 'nearing the end of',
      5: 'finishing up',
      6: 'done with',
      7: 'done with',
      8: 'done with',
    };

    //const fluCurrentStatusText = generateCurrentStatusText(fluStats);

    return (
      <>
        <p>
          {thisWeek === currentWeek
            ? `It’s ${currentFullMonth} ${currentYear}, which means we’re `
            : `In ${currentFullMonth} ${currentYear} we ${currentWeek < thisWeek ? "were" : "will be"} `}

          <strong>{fluSeasonProgressText[currentMonth]}</strong> the {seasonStartYear}–{seasonStartYear + 1} flu season.

          {/*This week we’re <strong>{fluCurrentStatusText}</strong>.*/}
        </p>

        <SeasonTimeline date={currentDate} />

        <p>
          The map below shows the relative intensity of flu infections
          {thisWeek === currentWeek
            ? ` this week (${currentWeek}) `
            : ` the week of ${currentWeek} `}
          from across the Seattle region.
        </p>

        <p>
          To explore more, hold the left mouse button and move the mouse to drag and pan the map.
          Hold the right mouse button to rotate and pitch the map.
          Use the mouse wheel to zoom in and out to reveal smaller and larger regions.
        </p>

        <FluMap date={currentDate} />
        <ColorRamp />
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
  const fluCounts = new Map(fluStats.map(x => [x.encountered_week, x.count]));

  const currentWeek = DateTime.local().toFormat("kkkk-'W'WW");
  const currentFluCount = fluCounts.get(currentWeek);

  const superlatives = {
    0: " ",
    1: "second-",
    2: "third-",
    3: "fourth-",
    4: "fifth-",
  }

  const rankedCounts = Array.from(fluCounts.values()).sort((a,b) => b - a);
  const weekRank = rankedCounts.indexOf(currentFluCount);

  if (weekRank === -1) {
    return 'not processing flu samples';
  } else if (weekRank < 5) {
    return `experiencing the ${superlatives[weekRank]}highest
        rates of flu we've seen so far this season`;
  } else if (weekRank / rankedCounts.length < 0.75) {
      return 'experiencing an average amount of flu for this season';
  } else {
      return 'not seeing a lot of flu cases';
  }
}
