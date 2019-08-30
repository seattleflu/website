import React from 'react';
import styled from 'styled-components';

import { Feature, H3, InternalLink } from '../utils';
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
            <Feature title="This is a research test and should not be used as a substitute for a
                    visit to your health care provider.">
                <P>
                    Learn more about how the research test works <InternalLink to="/results-faq" target="_blank">here</InternalLink>.
                </P>
            </Feature>
            {display}
        </div>
    )

}
