import React from 'react';

import { Feature, FeatureH3, Link } from '../styledComponents';
import NegativeResult from './NegativeResult';
import PositiveResult from './PositiveResult';

export default function Results(props) {
    const results = props.results;
    let display;
    if(results.length === 0) {
        display = <NegativeResult />
    }
    else {
        display = <PositiveResult results={results} sequenced={props.sequenced} barcode={props.barcode}/>
    }

    return (
        <div>
            <Feature title="This is a research test and should not be used as a substitute for a
                    visit to your health care provider.">
                <FeatureH3>
                    Learn more about how the research test works <Link href="/results-faq" target="_blank">here</Link>.
                </FeatureH3>
            </Feature>
            {display}
        </div>
    )

}
