import React from 'react';

import { LargerParagraph, Feature, UnorderedList, Bold } from '../../utils';
import { ResultsMoreInfo } from '../ResultsMoreInfo';

const contactHealthCare = [
    "You are older (>65) and experiencing severe symptoms",
    "You are immunocompromised",
    "You have chronic lung disease or other serious, chronic health problems",
    "You are very sick or are worried about your illness"
];

const preventEnterovirus = [
    "Enterovirus can be found in the saliva, mucus and feces (stool) of an infected person",
    "Wash your hands often with soap and water, especially after sneezing, coughing, going to the bathroom, or changing the diaper of an infected child",
    "Avoid close contact with other people while you are sick",
    "Clean and disinfect surfaces"
]

export default function Enterovirus(props) {

    const contactHealthCareDisplay = contactHealthCare.map((reason, index) =>
        <li key={index}>{reason}</li>
    );

    const preventEnterovirusDisplay = preventEnterovirus.map((tip, index) =>
        <li key={index}>{tip}</li>
    )

    return(
        <div>
            <LargerParagraph left>
                Your research test is positive for <Bold>Enterovirus</Bold>, a virus that
                mostly causes mild symptoms, including fever, runny nose, sneezing,
                cough, and body and muscle aches. Some people may have a skin rash
                or mouth blisters.
            </LargerParagraph>
            <LargerParagraph left>
                Most people with enterovirus infections do not need medical care,
                and recover in a week or two. In most cases, it’s best to stay home
                and avoid contact with other people.
            </LargerParagraph>
            <Feature title="Contact your health care provider if:">
                <UnorderedList>
                    {contactHealthCareDisplay}
                </UnorderedList>
            </Feature>
            <Feature title="How to prevent the spread of enterovirus:">
                <UnorderedList>
                    {preventEnterovirusDisplay}
                </UnorderedList>
            </Feature>
            <ResultsMoreInfo pathogen="non-polio-enterovirus" />
        </div>
    )
}
