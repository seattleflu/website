import React from 'react';
import { DateTime, Interval } from 'luxon';
import _ from 'lodash';
import styled, { keyframes } from 'styled-components';

import fluIcon from '../img/flu-virus-green.svg';
import heatmap from './FluMap/heatmap.json';
import { missingDataColor } from './FluMap/styles';

export default class SeasonTimeline extends React.Component {
  state = {
    currentDate: DateTime.local(),
    currentWeeks: generateWeeks(DateTime.local()),
    displayDate: this.props.date,
    displayWeeks: generateWeeks(this.props.date)
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      if (this.state.displayWeeks.includes(this.props.date)) {
        this.setState({ displayDate: this.props.date });
      }
      else {
        const startWithCurrentDate = this.props.date < this.state.currentDate && this.props.date.weekNumber !== this.state.currentDate.weekNumber;
        this.setState({
          displayDate: this.props.date,
          displayWeeks: generateWeeks(this.props.date, startWithCurrentDate)
        });
      }
    }
  }

  parseDataSource = () => {
    const features = this.props.dataSource.toJS().features;
    const fluIntensities = features.map(f => f.properties.flu_positive)
    let fluIntensityByWeek = {};

    // Aggregate all intensities by week
    fluIntensities.forEach(region => {
      Object.keys(region).forEach(week => {
        fluIntensityByWeek[week] = (fluIntensityByWeek[week] || []).concat([region[week].modeled_intensity_mode]);
      });
    });

    // Calculate the average intensity for each week
    Object.keys(fluIntensityByWeek).forEach(week => {
      fluIntensityByWeek[week] = parseFloat(_.mean(fluIntensityByWeek[week]).toFixed(3));
      if (fluIntensityByWeek[week] > 0.2) fluIntensityByWeek[week] = 0.2;
    });

    return fluIntensityByWeek
  }

  render() {
    const weeks = this.state.displayWeeks;
    const currentWeek = this.state.currentDate.toFormat("kkkk-'W'WW");
    const displayWeek = this.state.displayDate.toFormat("kkkk-'W'WW");

    let fluIntensityByWeek;
    let colorMap;
    let currentFluIntensity;
    if (this.props.dataSource) {
      fluIntensityByWeek = this.parseDataSource();
      colorMap = Object.assign(...heatmap.map(([intensity, color]) => ({[intensity]: color})))
      currentFluIntensity = getFluIntensityLanguage(fluIntensityByWeek, displayWeek)
    }

    const displayWeekIndex = weeks.findIndex(w => w.toFormat("kkkk-'W'WW") === displayWeek);

    const [width, height, margin] = [800, 200, 5];

    // The months are packed chevrons.  First calculate the space for each
    // month as a rectangle.  Then subtract from that the width of one chevron
    // outset spread across each month, to make room for the final month's
    // outset chevron.
    const chevronOutset = 0.25;
    const widthPerWeek = Math.floor(1/weeks.length * width);
    const weekWidth = widthPerWeek - Math.floor(1/weeks.length * (widthPerWeek * chevronOutset));

    const weekHeight = 70;

    const iconDimensions = Math.min((weekWidth+20), "50");
    const pinheadRadius = iconDimensions / 1.5;

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
      <>
        <p style={{ textAlign: "center" }}>
          In the
          {currentWeek === displayWeek
            ? ` current week (${displayWeek}), `
            : ` week of ${displayWeek}, `}
          overall flu circulation is estimated to be <b>{currentFluIntensity}</b>.
        </p>
        <svg viewBox={`0 0 ${width + margin * 2} ${height + margin * 2}`}
             width="100%"
             height={height + margin * 2}
             role="img"
             aria-labelledby="fluSeasonTimelineID fluSeasonTimelineDescID"
             style={{ overflow: "visible" }}>
          <title id="fluSeasonTimelineID">Flu Season Timeline</title>
          <desc id="fluSeasonTimelineDescID">
            A timeline detailing flu circulation from approximately six
            months ago to the current week.
          </desc>
          <g transform={`translate(${margin}, ${height - weekHeight - 40})`}>
            {weeks.map((w, i) => {
              let displayMonth = false;
              let offset = 0;
              // Only display a month label for the first week within the month
              // The month label should be displayed in the week during which
              // the first of the month occurs.
              if (weeks[i+1]) {
                if (i !== 0 && w.month !== weeks[i+1].month) {
                  displayMonth = true;
                  // Compute offset, ie how far into this week was the 1st of
                  // the month?
                  const nextMonth = DateTime.local(weeks[i+1].year, weeks[i+1].month, 1)
                  offset = Interval.fromDateTimes(w, nextMonth).length('weeks', true)
                }
              }
              return (
                <g key={w.toFormat("kkkk-'W'WW")}
                 transform={`translate(${i * weekWidth}, 0)`}
                 style={{ pointerEvents: "bounding-box", cursor: "pointer" }}
                 onClick={() => this.props.updateCurrentDate(w)}>
                  <polygon points={`0, 0
                                  ${weekWidth},0
                                  ${weekWidth * (1 + chevronOutset)}, ${weekHeight / 2}
                                  ${weekWidth}, ${weekHeight}
                                  0, ${weekHeight}
                                  ${weekWidth * chevronOutset}, ${weekHeight / 2}`}
                        fill={(fluIntensityByWeek && colorMap) ? colorMap[fluIntensityByWeek[w.toFormat("kkkk-'W'WW")]] : missingDataColor}
                        stroke="white" />

                  <text textAnchor="middle"
                        dominantBaseline="middle"
                        x={weekWidth * 0.7}
                        y={weekHeight / 2 + 5}
                        dy="-3px"
                        style={{fill: "white", fontWeight: i === displayWeekIndex ? "bold" : "normal"}}>
                    {w.weekNumber}
                  </text>

                  {displayMonth &&
                    <g transform={`translate(0, ${height - weekHeight * 1.85})`}>
                      <line x1={weekWidth * offset} y1="1" x2={weekWidth * offset} y2={weekHeight / 3 - 1} style={{stroke: "black", strokeWidth: 2}}/>
                      <text textAnchor="middle"
                            dominantBaseline="middle"
                            x={weekWidth * offset}
                            y={weekHeight / 3 + 10}
                            dy="-3px">
                        {weeks[i+1].monthShort}
                      </text>
                    </g>
                  }
                </g>
              )
            })}
          </g>

          <g key="current-week-virus-pin"
             transform={`translate(${displayWeekIndex * weekWidth + weekWidth * 0.85}, ${pinheadRadius})`}>
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
      </>
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
  const startDateTime = startWithCurrentDate ? currentDate : currentDate.minus({ weeks: 26 });

  return _.range(27)
          .map(i => startDateTime.plus({ weeks: i }));
}

/**
 * This helper function is use to determine the appropriate language describing the
 * flu circulation of a given week. The language is borrowed from the ColorRamp legend.
 *
 * @param {Object} fluIntensityByWeek - An object that holds the average flu intensity within
 * the general Seattle area for each week.
 * @param {String} displayWeek - A string representing the current week displayed in the format
 * of 2019-W01
 * @return {String} A string describing the flu circulation levels (minimal, low, moderate, high)
 */
function getFluIntensityLanguage(fluIntensityByWeek, displayWeek) {
  let currentFluIntensity = fluIntensityByWeek[displayWeek];

  if (currentFluIntensity === undefined) return 'unknown';

  if (currentFluIntensity < 0.025) {
    currentFluIntensity = 'minimal';
  }
  else if (currentFluIntensity < 0.075) {
    currentFluIntensity = 'low';
  }
  else if (currentFluIntensity < 0.125) {
    currentFluIntensity = 'moderate';
  }
  else {
    currentFluIntensity = 'high';
  }

  return currentFluIntensity
}
