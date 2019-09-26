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

    const currentMonth = this.props.currentMonth;
    const currentMonthIndex = months.findIndex(m => m.month === currentMonth);

    const [width, height, margin] = [800, 190, 5];
    const monthWidth = Math.floor(1/months.length * width);
    const monthHeight = 70;

    const iconDimensions = Math.min(monthWidth, "50");
    const pinheadRadius = iconDimensions / 1.5;

    const pinHeight = height - monthHeight - iconDimensions;
    const pinpointRadius = 5;

    const rotateDash = keyframes`
      from {
        stroke-dashoffset: 280;
      }
      to {
        stroke-dashoffset: 75;
    `

    const spin = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `

    const slide = keyframes`
      from {
        stroke-dashoffset: 280;
      }
      to {
        stroke-dashoffset: 75;
        transform: translateX(${monthWidth * currentMonthIndex}px);
    `

    const Slide = styled.g`
      display: inline-block;
      width: 100%;
      height: ${height}
      animation: ${slide} 1.2s linear;
      animation-fill-mode: forwards;
    `

    const RotateDash = styled.g`
      display: inline-block;
      width: 100%;
      height: ${height}
      animation: ${rotateDash} 9s linear infinite;
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
           aria-labelledby="fluSeasonTimelineID fluSeasonTimelineDescID">
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
                              ${monthWidth * 1.25}, ${monthHeight / 2}
                              ${monthWidth}, ${monthHeight}
                              0, ${monthHeight}
                              ${monthWidth * 0.25}, ${monthHeight / 2}`}
                    {...rectAttrs[m.seasonality]}
                    stroke="white" />

              <text textAnchor="middle"
                    dominantBaseline="middle"
                    x={monthWidth * 0.65}
                    y={monthHeight / 2 + 5}
                    dy="-3px">
                {DateTime.fromISO(m.yearMonth).monthShort}
              </text>
            </g>
          )}
          <RotateDash>
            <polygon transform={`translate(${currentMonthIndex * monthWidth}, 0)`}
                    points={`0, 0
                            ${monthWidth}, 0
                            ${monthWidth * 1.25}, ${monthHeight / 2}
                            ${monthWidth}, ${monthHeight}
                            0, ${monthHeight}
                            ${monthWidth * 0.25}, ${monthHeight / 2}`}
                    strokeWidth="4"
                    stroke="yellow"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray="4 6" />
          </RotateDash>
        </g>

        <g key="current-month-virus-pin"
           transform={`translate(${monthWidth * 0.65}, ${pinheadRadius})`}>
          <Slide>
              <line x1="0" y1="0"
                    x2="0" y2={iconDimensions / 2 + pinHeight}
                    stroke="black" />
              <circle cx="0"
                      cy={iconDimensions / 2 + pinHeight + pinpointRadius}
                      r={pinpointRadius}
                      fill="transparent"
                      stroke="black" />
              <circle cx="0"
                      cy={-iconDimensions / 2 + pinheadRadius * 0.75}
                      r={pinheadRadius}
                      fill="grey"
                      strokeWidth="2" />
              <Spin>
                <image href={fluIcon}
                      y={-iconDimensions / 2}
                      x={-iconDimensions / 2}
                      width={iconDimensions}
                      height={iconDimensions} />
              </Spin>
            </Slide>
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
