import React from 'react';

import { LargerParagraph, Bold, EvenTwoColumnFeature, Feature, UnorderedList } from '../../utils';

const preventRSV = [
    "Wash your hands often",
    "Keep your hands off your face",
    "Avoid close contact with sick people",
    "Cover your coughs and sneezes",
    "Clean and disinfect surfaces",
    "Stay home when you are sick"
];

const highRiskAdult = [
    "Older adults, especially those 65 years and older",
    "Adults with chronic heart or lung disease",
    "Adults with weakened immune systems"
];

const highRiskChildren = [
    "Premature infants",
    "Very young infants, especially those 6 months and younger",
    "Children younger than 2 years old with chronic lung or heart disease",
    "Children with weakened immune systems",
    "Children who have neuromuscular disorders, including those who have difficulty swallowing or clearing mucus secretions"
]

export default function RSV(props) {

    const preventRSVDisplay = preventRSV.map((tip, index) =>
        <li key={index}>{tip}</li>
    );

    const highRiskAdultDisplay = highRiskAdult.map((risk, index) =>
        <li key={index}>{risk}</li>
    );

    const highRiskChildrenDisplay = highRiskChildren.map((risk, index) =>
        <li key={index}>{risk}</li>
    );

    return(
        <div>
            <LargerParagraph>
                Your research test is positive for <Bold>Respiratory Syncytial Virus Infection (RSV)</Bold>,
                a virus that causes a respiratory infection that can be spread from person to person.
                This infection is usually  mild in adults, like the common cold.
            </LargerParagraph>
            <LargerParagraph>
                Most people with RSV do not need medical care and get better in a week or two.
                In most cases, it’s best to stay home while you are sick, and avoid contact with
                other people.
            </LargerParagraph>
            <Feature title="How to prevent the spread of RSV">
                <UnorderedList>
                    {preventRSVDisplay}
                </UnorderedList>
            </Feature>
            <LargerParagraph>
                If you are at high risk for severe RSV or are very sick or are worried about your
                illness, you should contact your health care provider.
            </LargerParagraph>
            <EvenTwoColumnFeature title="People at high risk for severe RSV include:">
                <ul>
                    {highRiskAdultDisplay}
                </ul>
                <ul>
                    {highRiskChildrenDisplay}
                </ul>
            </EvenTwoColumnFeature>
        </div>
    )
}
