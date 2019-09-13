import React from 'react';

import { H3, LargerParagraph, Feature, UnorderedList } from '../styledComponents';
import { ResultsMoreInfo } from './ResultsMoreInfo';

const avoidFlu = [
    "Get your flu shot every year",
    "Wash your hands often",
    "Keep your hands off your face",
    "Avoid close contact with sick people",
    "Clean and disinfect surfaces"
]

export default function NegativeResult(props) {
    const howToAvoidFlu = avoidFlu.map((tip) =>
        <li>{tip}</li>
    );

    return (
        <div>
            <H3>Your research test is <b>NEGATIVE</b>.</H3>
            <LargerParagraph>
                There are lots of viruses that can cause symptoms,
                and we don’t have a test that will detect all of them.
                No test is perfect, and there is a small chance that you
                do have the flu or another respiratory virus, even with
                a negative test. Regardless of your test result,
                it’s best to stay home when you feel sick, and avoid contact
                with other people. If you have other health problems or are
                very sick or are worried about your illness, you should contact
                your health care provider.
            </LargerParagraph>
            <Feature title="How to help avoid getting the flu:">
                <UnorderedList>
                    {howToAvoidFlu}
                </UnorderedList>
            </Feature>
            <ResultsMoreInfo pathogen="flu"/>
        </div>
    )
}
