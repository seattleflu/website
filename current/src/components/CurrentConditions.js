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
          The map below shows flu circulation for
          {thisWeek === currentWeek
            ? ` this week (${currentWeek}) `
            : ` the week of ${currentWeek} `}
          across the Seattle region.
          Flu circulation level is determined by comparing flu positive and flu negative specimens collected by the study and represents a near real-time view of flu circulation.
        </p>

        <ColorRamp />
        <FluMap date={currentDate} />

        <p />

        <p>
          To explore more, hold the left mouse button and move the mouse to drag and pan the map.
          Hold the right mouse button to rotate and pitch the map.
        </p>

        <p>
          These are examples of flu circulation from January to March 2019, when there were periods of low, moderate and high circulation.
          Click on any picture to be taken to a full screen view.
        </p>

        <div className="row" id="examples">
          <div className="col-md-4" id="exampleLow">
            <a href="/current?week=2019-W01">
              <img alt="example_map_low" width="100%" style={{marginTop: "15px", marginBottom: "15px"}} src="/images/example_map_low.png"/>
            </a>
            <div style={{"position": "absolute", "top": "12px", "right": "20px"}}>
              <span style={{"color": "#eee", "fontSize": 18}}>Low</span>
            </div>
          </div>
          <div className="col-md-4" id="exampleLow">
            <a href="/current?week=2019-W05">
              <img alt="example_map_medium" width="100%" style={{marginTop: "15px", marginBottom: "15px"}} src="/images/example_map_medium.png"/>
            </a>
            <div style={{"position": "absolute", "top": "12px", "right": "20px"}}>
              <span style={{"color": "#eee", "fontSize": 18}}>Moderate</span>
            </div>
          </div>
          <div class="col-md-4" id="exampleLow">
            <a href="/current?week=2019-W10">
              <img alt="example_map_high" width="100%" style={{marginTop: "15px", marginBottom: "15px"}} src="/images/example_map_high.png"/>
            </a>
            <div style={{"position": "absolute", "top": "12px", "right": "20px"}}>
              <span style={{"color": "#eee", "fontSize": 18}}>High</span>
            </div>
          </div>
        </div>

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
