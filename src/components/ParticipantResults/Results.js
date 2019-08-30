import React from 'react';
import styled from 'styled-components';

import { Feature, H3, Bold } from '../utils';
import NegativeResult from './NegativeResult';
import PositiveResult from './PositiveResult';

const P = styled(H3)`
    color: inherit;
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
        </div>
    )

}
