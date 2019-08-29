import React from 'react';
import styled from 'styled-components';

import { Feature, H3 } from '../utils';
import NegativeResult from './NegativeResult';
import PositiveResult from './PositiveResult';

const P = styled(H3)`
    color: inherit;
`
const MoreInfo = styled.p`
    margin: 1em;
    padding-bottom: 1.5em;
    font-size: 16px;
    text-align: center;
`
export default function Results(props) {
    const results = props.results;
    let display;
    if(results.length === 0) {
        display = <NegativeResult />
    }
    else {
        display = <PositiveResult results={results} />
    }
    return (
        <div>
            <Feature>
                <P>
                    This is a research test and should not be used as a substitute for a
                    visit to your health care provider.
                </P>
            </Feature>
            {display}
            <MoreInfo>
                <b>If your health care provider wants to know more</b> about these
                test results, please contact us at (WEBSITE OR PHONE NUMBER).
                <br/>
                For more information, please visit the US Center for Disease Control
                at <a href="https://www.cdc.gov/flu">www.cdc.gov/flu</a>
            </MoreInfo>
        </div>
    )

}
