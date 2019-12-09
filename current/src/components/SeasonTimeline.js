import React from 'react';
import { DateTime } from 'luxon';
import _ from 'lodash';
import styled, { keyframes } from 'styled-components';

import fluIcon from '../img/flu-virus-green.svg';

const Seasonality = {
  OFF_SEASON: 1,
  SHOULDER_SEASON: 2,
  PEAK_SEASON: 3
};

export default class SeasonTimeline extends React.Component {
  render() {
    let months = [
      {month: 7, seasonality: Seasonality.OFF_SEASON},
      {month: 8, seasonality: Seasonality.OFF_SEASON},
      {month: 9, seasonality: Seasonality.SHOULDER_SEASON},
      {month: 10, seasonality: Seasonality.PEAK_SEASON},
      {month: 11, seasonality: Seasonality.PEAK_SEASON},
      {month: 12, seasonality: Seasonality.PEAK_SEASON},
      {month: 1, seasonality: Seasonality.PEAK_SEASON},
      {month: 2, seasonality: Seasonality.PEAK_SEASON},
      {month: 3, seasonality: Seasonality.PEAK_SEASON},
      {month: 4, seasonality: Seasonality.PEAK_SEASON},
      {month: 5, seasonality: Seasonality.SHOULDER_SEASON},
      {month: 6, seasonality: Seasonality.OFF_SEASON},
      {month: 7, seasonality: Seasonality.OFF_SEASON}
    ];

    const yearMonths = generateYearMonths();
    months.forEach((m, i) => m["yearMonth"] = yearMonths[i]);

    const rectAttrs = {
      [Seasonality.OFF_SEASON]: {
        fill: "hsl(214, 17%, 75%)"
      },
      [Seasonality.SHOULDER_SEASON]: {
        fill: "hsl(202, 55%, 61%)"
      },
      [Seasonality.PEAK_SEASON]: {
        fill: "hsl(189, 94%, 47%)"
      }
    };

    const currentMonth = this.props.date.month;
    const currentMonthIndex = months.findIndex(m => m.month === currentMonth);

    const [width, height, margin] = [800, 160, 5];

    // The months are packed chevrons.  First calculate the space for each
    // month as a rectangle.  Then subtract from that the width of one chevron
    // outset spread across each month, to make room for the final month's
    // outset chevron.
    const chevronOutset = 0.25;
    const widthPerMonth = Math.floor(1/months.length * width);
    const monthWidth = widthPerMonth - Math.floor(1/months.length * (widthPerMonth * chevronOutset));

    const monthHeight = 70;

    const iconDimensions = Math.min(monthWidth, "50");
    const pinheadRadius = iconDimensions / 1.5;

    const pinHeight = height - monthHeight - pinheadRadius;

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
          A timeline detailing the progression of a flu season from July of
          the season start year to July of the season end year.
          June, July, and August are considered off-season months.
          September and May are shoulder months that may or may not have flu.
          October through April is considered peak flu season.
        </desc>
        <g transform={`translate(${margin}, ${height - monthHeight})`}>
          {months.map((m, i) =>
          <g key={m.yearMonth}
             transform={`translate(${i * monthWidth}, 0)`}>
              <polygon points={`0, 0
                              ${monthWidth},0
                              ${monthWidth * (1 + chevronOutset)}, ${monthHeight / 2}
                              ${monthWidth}, ${monthHeight}
                              0, ${monthHeight}
                              ${monthWidth * chevronOutset}, ${monthHeight / 2}`}
                    {...rectAttrs[m.seasonality]}
                    stroke="white" />

              <text textAnchor="middle"
                    dominantBaseline="middle"
                    x={monthWidth * 0.65}
                    y={monthHeight / 2 + 5}
                    dy="-3px"
                    style={{fontWeight: i === currentMonthIndex ? "bold" : "normal"}}>
                {DateTime.fromISO(m.yearMonth).monthShort}
              </text>
            </g>
          )}
        </g>

        <g key="current-month-virus-pin"
           transform={`translate(${currentMonthIndex * monthWidth + monthWidth * 0.65}, ${pinheadRadius})`}>
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
 * are repeating months in an object.
 *
 * @return {Array} An array of strings in "YYYY-MM" format starting with the
 *  July of the season start year to July of the season end year.
 */
function generateYearMonths() {
  const today = DateTime.local();
  const startMonth = 7; // Timeline starts with the July before the current season

  const start = DateTime.fromObject({
    year: today.year - (today.month < startMonth ? 1 : 0),
    month: startMonth
  });

  return _.range(13)
          .map(i => start.plus({ months: i }))
          .map(m => m.toFormat("yyyy-MM"));
}
