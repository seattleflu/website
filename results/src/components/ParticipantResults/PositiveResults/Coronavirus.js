import React from 'react';

import { LargerParagraph, CenteredParagraph, Feature, UnorderedList, Bold } from '../../utils';
import { ResultsMoreInfo } from '../ResultsMoreInfo';

const contactHealthCare = [
    "You are older (>65) and experiencing severe symptoms",
    "You are immunocompromised",
    "You have chronic lung disease or other serious, chronic health problems",
    "You are very sick or are worried about your illness"
];

const preventCoronavirus = [
    "Wash your hands often",
    "Keep your hands off your face",
    "Avoid close contact with sick people",
    "Cover your coughs and sneezes",
    "Clean and disinfect surfaces",
    "Stay home when you are sick"
];

export default function Coronavirus(props) {

    const contactHealthCareDisplay = contactHealthCare.map((reason, index) =>
        <li key={index}>{reason}</li>
    );

    const preventCoronavirusDisplay = preventCoronavirus.map((tip, index) =>
        <li key={index}>{tip}</li>
    );

    return(
        <div>
            <LargerParagraph>
                Your research test is positive for <Bold>Coronavirus</Bold><sup>*</sup>, a type of
                virus that causes respiratory infections that can be spread from person to person.
                This infection is usually mild, like the common cold, or moderate, with flu-like
                symptoms. Symptoms can include fever, runny nose, congestion, cough, and sore throat.
            </LargerParagraph>
            <LargerParagraph>
                Most people with Coronavirus infections do not need medical care, and recover in a
                week or two. In most cases, it’s best to stay home and avoid contact with other people.
            </LargerParagraph>
            <Feature title="Contact your health care provider if:">
                <UnorderedList>
                    {contactHealthCareDisplay}
                </UnorderedList>
            </Feature>
            <LargerParagraph>
                Certain people are at higher risk for severe Coronavirus infections, including
                older adults, people with chronic lung disease, and immunocompromised individuals.
                In these groups of people, Coronaviruses can cause pneumonia and exacerbations of
                asthma or chronic bronchitis.
            </LargerParagraph>
            <Feature title="How to help prevent the spread of coronavirus:">
                <div >
                <UnorderedList>
                    {preventCoronavirusDisplay}
                </UnorderedList>
                </div>
            </Feature>
            <CenteredParagraph>
                *This research test detects human coronavirus only, and not MERS or SARS coronaviruses.
            </CenteredParagraph>
            <ResultsMoreInfo pathogen="coronavirus" />
        </div>
    )
}
