import React from 'react';
import { DateTime } from 'luxon';
import { CenteredParagraph } from './utils';

const Seasonality = {
  OFF_SEASON: 1,
  SHOULDER_SEASON: 2,
  PEAK_SEASON: 3
};

export default class SeasonTimeline extends React.Component {
  render() {
    // XXX TODO: This may want to be dynamically sourced from a data file
    // somewhere that we can update easily as the season progresses.
    //
    const months = [
      {month: "2018-07", seasonality: Seasonality.OFF_SEASON},
      {month: "2018-08", seasonality: Seasonality.OFF_SEASON},
      {month: "2018-09", seasonality: Seasonality.SHOULDER_SEASON},
      {month: "2018-10", seasonality: Seasonality.PEAK_SEASON},
      {month: "2018-11", seasonality: Seasonality.PEAK_SEASON},
      {month: "2018-12", seasonality: Seasonality.PEAK_SEASON},
      {month: "2019-01", seasonality: Seasonality.PEAK_SEASON},
      {month: "2019-02", seasonality: Seasonality.PEAK_SEASON},
      {month: "2019-03", seasonality: Seasonality.PEAK_SEASON},
      {month: "2019-04", seasonality: Seasonality.PEAK_SEASON},
      {month: "2019-05", seasonality: Seasonality.SHOULDER_SEASON},
      {month: "2019-06", seasonality: Seasonality.OFF_SEASON},
      {month: "2019-07", seasonality: Seasonality.OFF_SEASON}
    ];

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

    // XXX FIXME: Fixing 2019-02 for now for demonstration purposes.  This
    // should use the actual current month when we're done prototyping.
    //
    const currentMonth = "2019-02"; // DateTime.local().toISO().substr(0, 7);
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
              <g key={m.month} transform={`translate(${i * monthWidth}, 0)`}>
                <rect width={monthWidth}
                      height={height}
                      {...rectAttrs[m.seasonality]} />

                <text textAnchor="middle"
                      dominantBaseline="middle"
                      x={monthWidth / 2}
                      y="50%"
                      dy="-3px">
                  {DateTime.fromISO(m.month).monthShort}
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
