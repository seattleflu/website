import React from 'react';
import { DateTime } from 'luxon';

import FluMap from './FluMap/';
import { ColorRamp } from './FluMap/styles';
import SeasonTimeline from './SeasonTimeline';
import fluStats from '../data/flu-by-week.json';

const SEASON_CUTOFF_MONTH = 9;
const FLU_SEASON_START_DATE = DateTime.local(2019, 11, 18);

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
    const currentDay = currentDate.day;
    const seasonStartYear = currentMonth < SEASON_CUTOFF_MONTH ? currentYear - 1 : currentYear;
    const sinceSeasonStart = currentDate.diff(FLU_SEASON_START_DATE, ['months', 'weeks']).toObject();
    const monthsSinceSeasonStart = sinceSeasonStart.months;
    const weeksSinceSeasonStart = Math.round(sinceSeasonStart.weeks);

    //const fluCurrentStatusText = generateCurrentStatusText(fluStats);

    return (
      <>
        <p>
          <i>During flu season, everyone should take precautions to prevent the spread of flu. To learn more, visit the Seattle Flu Study <a href="/resources">resources page</a>.</i>
        </p>

        <p>
          {thisWeek === currentWeek
            ? `It’s ${currentFullMonth} ${currentDay}, ${currentYear}, which means we’re `
            : `On ${currentFullMonth} ${currentDay}, ${currentYear}, we ${currentWeek < thisWeek ? "were" : "will be"} `}

          {monthsSinceSeasonStart > 0 && <strong>{monthsSinceSeasonStart} {monthsSinceSeasonStart > 1 ? "months" : "month"} </strong>}
          {(monthsSinceSeasonStart > 0 && weeksSinceSeasonStart > 0) && <strong>and </strong>}
          {weeksSinceSeasonStart > 0 && <strong>{weeksSinceSeasonStart} {weeksSinceSeasonStart > 1 ? "weeks": "week"} </strong>}
          into the {seasonStartYear}–{seasonStartYear + 1} flu season.

          {/*This week we’re <strong>{fluCurrentStatusText}</strong>.*/}
        </p>

        <SeasonTimeline date={currentDate} />

        <p>
          The map below shows an estimate for flu circulation for
          {thisWeek === currentWeek
            ? ` this week (${currentWeek}) `
            : ` the week of ${currentWeek} `}
          across the Seattle region.
          Flu circulation level is determined by comparing flu positive and flu negative specimens collected by the Seattle Flu Study from local hospitals, clinics and community sites.
          Color intensity levels presented on the map are relative to Seattle Flu Study data collection, with "high" circulation matched to peak flu during the 2018-19 season.
        </p>

        <ColorRamp />
        <FluMap date={currentDate} />

        <p />

        <p>
          To explore more, hold the left mouse button and move the mouse to drag and pan the map.
          Hold the right mouse button to rotate and pitch the map.
        </p>

        <p>
          The map uses Seattle Flu Study's data. National, state and local organizations have different data and scales for reporting flu levels.
          Other detailed flu reporting can be found at the <a href="https://www.cdc.gov/flu/weekly/">CDC</a> and <a href="https://www.kingcounty.gov/depts/health/communicable-diseases/disease-control/influenza.aspx">Public Health – Seattle & King County</a>.
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
          <div className="col-md-4" id="exampleLow">
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
