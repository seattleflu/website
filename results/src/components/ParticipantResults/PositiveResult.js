import React from 'react';

import { H3, STabs, STabList, STab, STabPanel  } from '../styledComponents';
import * as positiveResults from './PositiveResults';

// Set up tabsRole for react-tabs
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';
STabPanel.tabsRole = 'TabPanel';

export default function PositiveResult(props) {
    const resultsMap = {
        "flu": <positiveResults.Flu sequenced={props.sequenced} barcode={props.barcode}/>,
        "rsv": <positiveResults.RSV/>,
        "coronavirus": <positiveResults.Coronavirus/>,
        "enterovirus": <positiveResults.Enterovirus/>
    };

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
