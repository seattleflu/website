import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import { H3 } from '../utils';
import * as positiveResults from './PositiveResults';

const resultsMap = {
    "flu": <positiveResults.Flu/>,
    "rsv": <positiveResults.RSV/>,
    "coronavirus": <positiveResults.Coronavirus/>,
    "enterovirus": <positiveResults.Enterovirus/>
}

const STabs = styled(Tabs)`
    width: 100%;
`
const STabList = styled(TabList)`
  list-style-type: none;
  padding: .25em;
  display: flex;
  justify-content: center;
  margin: 0;
`
STabList.tabsRole = 'TabList';

const STab = styled(Tab)`
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 4px 4px 0px 0px;
  padding: 1em;
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;

  &.is-selected {
    border-color: ${props => props.theme.primary300};
    border-bottom: 1px solid white;
  }
  @media (max-width: 735px) {
      padding: 0.5em;
  }
`
STab.tabsRole = 'Tab';

const STabPanel = styled(TabPanel)`
  display: none;
  min-height: 40vh;
  border-top: 1px solid ${props => props.theme.primary300};
  padding: 2em .5em;
  margin-top: -5px;

  &.is-selected {
    display: block;
  }
`;
STabPanel.tabsRole = 'TabPanel';

export default function PositiveResult(props) {
    const results = props.results.filter(result => resultsMap[result]);

    const resultTabs = results.map((result) =>
        <STab key={result}>{result}</STab>
    );

    const resultPanels = results.map((result) =>
        <STabPanel key={result}>
            {resultsMap[result]}
        </STabPanel>
    );

    return (
        <div>
            <H3>
                Your research test is positive for: <br/>
            </H3>
            <STabs
                selectedTabClassName='is-selected'
                selectedTabPanelClassName='is-selected'>
                <STabList>
                    {resultTabs}
                </STabList>
                {resultPanels}
            </STabs>
        </div>
    )
}
