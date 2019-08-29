import React from 'react';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { CenteredParagraph } from './utils';

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

    // XXX TODO: These styles definitely want attention.
    //
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

    const [width, height, margin] = [800, 60, 5];
    const monthWidth = Math.floor(1/months.length * width);

    return (
      <CenteredParagraph>
        <svg viewBox={`0 0 ${width + margin * 2} ${height + margin * 2}`}
             width="100%"
             height={height + margin * 2}>

          <g transform={`translate(${margin}, ${margin})`}>
            {months.map((m, i) =>
              <g key={m.yearMonth} transform={`translate(${i * monthWidth}, 0)`}>
                <rect width={monthWidth}
                      height={height}
                      {...rectAttrs[m.seasonality]} />

                <text textAnchor="middle"
                      dominantBaseline="middle"
                      x={monthWidth / 2}
                      y="50%"
                      dy="-3px">
                  {DateTime.fromISO(m.yearMonth).monthShort}
                </text>
              </g>
            )}
            <rect x={monthWidth * currentMonthIndex}
                  y="0"
                  width={monthWidth}
                  height={height}
                  stroke="yellow"
                  strokeWidth="2"
                  fill="transparent" />
          </g>
        </svg>
      </CenteredParagraph>
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
