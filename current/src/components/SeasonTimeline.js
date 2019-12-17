import React from 'react';
import { DateTime } from 'luxon';
import _ from 'lodash';
import styled, { keyframes } from 'styled-components';

import fluIcon from '../img/flu-virus-green.svg';

export default class SeasonTimeline extends React.Component {
  state = {
    currentDate: this.props.date,
    weeks: generateWeeks(this.props.date)
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date && !this.state.weeks.includes(this.props.date)) {
      this.setState({
        currentDate: this.props.date,
        weeks: generateWeeks(this.props.date, this.props.date < this.state.currentDate)
      });
    }
  }

  render() {
    const weeks = this.state.weeks.map(w => ({"month": w.month, "weekNumber": w.weekNumber, "week": w.toFormat("kkkk-'W'WW")}));
    const currentWeek = this.state.currentDate.toFormat("kkkk-'W'WW")
    const currentWeekIndex = weeks.findIndex(w => w.week === currentWeek);

    const [width, height, margin] = [800, 160, 5];

    // The months are packed chevrons.  First calculate the space for each
    // month as a rectangle.  Then subtract from that the width of one chevron
    // outset spread across each month, to make room for the final month's
    // outset chevron.
    const chevronOutset = 0.25;
    const widthPerWeek = Math.floor(1/weeks.length * width);
    const weekWidth = widthPerWeek - Math.floor(1/weeks.length * (widthPerWeek * chevronOutset));

    const weekHeight = 70;

    const iconDimensions = Math.min(weekWidth, "50");
    const pinheadRadius = iconDimensions / 1.5;

    const pinHeight = height - weekHeight - pinheadRadius;

    const spin = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `

    const Spin = styled.g`
      display: inline-block;
      animation: ${spin} 6s linear infinite;
    `

    return (
      <svg viewBox={`0 0 ${width + margin * 2} ${height + margin * 2}`}
           width="100%"
           height={height + margin * 2}
           role="img"
           aria-labelledby="fluSeasonTimelineID fluSeasonTimelineDescID"
           style={{pointerEvents: "none"}}>
        <title id="fluSeasonTimelineID">Flu Season Timeline</title>
        <desc id="fluSeasonTimelineDescID">
          A timeline detailing flu circulation from approximately six
          months ago to the current week.
        </desc>
        <g transform={`translate(${margin}, ${height - weekHeight})`}>
          {weeks.map((w, i) =>
          <g key={w.week}
             transform={`translate(${i * weekWidth}, 0)`}>
              <polygon points={`0, 0
                              ${weekWidth},0
                              ${weekWidth * (1 + chevronOutset)}, ${weekHeight / 2}
                              ${weekWidth}, ${weekHeight}
                              0, ${weekHeight}
                              ${weekWidth * chevronOutset}, ${weekHeight / 2}`}
                    fill = "hsl(214, 17%, 75%)"
                    stroke="white" />

              <text textAnchor="middle"
                    dominantBaseline="middle"
                    x={weekWidth * 0.65}
                    y={weekHeight / 2 + 5}
                    dy="-3px"
                    style={{fontWeight: i === currentWeekIndex ? "bold" : "normal"}}>
                {w.weekNumber}
              </text>
            </g>
          )}
        </g>

        <g key="current-week-virus-pin"
           transform={`translate(${currentWeekIndex * weekWidth + weekWidth * 0.65}, ${pinheadRadius})`}>
          <path
            d={`
              M ${-(pinheadRadius - 5)} 18
              A ${pinheadRadius} ${pinheadRadius} 220 1 1 ${pinheadRadius - 5} 18
              L 0 ${pinheadRadius * 2}
              z
            `}
            fill="#1bab4c"
            strokeWidth="2"
            strokeLinecap="round" />
          <Spin>
            <image href={fluIcon}
                  y={-iconDimensions / 2}
                  x={-iconDimensions / 2}
                  width={iconDimensions}
                  height={iconDimensions}
                  style={{opacity: 0.9}} />
          </Spin>
        </g>

      </svg>
    );
  }
}


/**
 * This helper function is primarily used for generating unique keys when there
 * are repeating weeks in an object.
 *
 * @param {DateTime} currentDate - A DateTime object representing the currentDate
 * selected within the app.
 * @param {Boolean} startWithCurrentDate - A boolean flag to determine whether to
 * return the array starting with the currentDate. Default is false, which sets the
 * start date to 26 weeks ago.
 * @return {Array} An array of DateTime objects that represent the weeks over a
 * period of 26 weeks.
 */
function generateWeeks(currentDate, startWithCurrentDate = false) {
  // Default is to set start date to 6 months ago
  const startDateTime = startWithCurrentDate ? currentDate : currentDate.minus({ months: 6 });

  return _.range(27)
          .map(i => startDateTime.plus({ weeks: i }));
}
