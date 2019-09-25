import React from 'react';

import * as positiveResults from './PositiveResults';
import { H3, STabs, STabList, STab, STabPanel } from '../styledComponents';

// Set up tabsRole for react-tabs
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';
STabPanel.tabsRole = 'TabPanel';

function matchResultComponent(result){
    const resultComponents = {
        "flu": <positiveResults.Flu content={result}/>,
        "rsv": <positiveResults.RSV content={result}/>,
        "coronavirus": <positiveResults.Coronavirus content={result}/>,
        "enterovirus": <positiveResults.Enterovirus content={result}/>
    }
    return resultComponents[result.id]
}

export default function PositiveResult(props) {

    const resultTabs = props.results.map((result) =>
        <STab key={result.id}>{result.id}</STab>
    );

    const resultPanels = props.results.map((result) =>
        <STabPanel key={result.id}>
            {matchResultComponent(result)}
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
