import React from 'react';

import { Bold, LargerParagraph, EvenTwoColumnFeature, Link } from '../../styledComponents';
import { ResultsMoreInfo } from '../ResultsMoreInfo';

const highRiskConditions = [
    "Asthma or chronic lung disease",
    "Heart disease or stroke",
    "Diabetes",
    "HIV/AIDS",
    "Cancer",
    "Taking medicines that suppress the immune system",
    "Liver or kidney disease",
    "Neurologic or developmental conditions",
    "Blood disorders such as sickle cell",
    "Severe obesity (not just overweight)",
    "People under 19 on long-term aspirin"
];

const highRiskGroups = [
    "Pregnant women, up to 2 weeks after delivery",
    "Adults 65 years of age or older",
    "Children younger than 2 years",
    "American Indians and Alaska Natives",
    "People who live in nursing homes or long-term care facilities"
]



export default function Flu(props) {

    const highRiskConditionsDisplay = highRiskConditions.map((risk, index) =>
        <li key={index}>{risk}</li>
    );

    const highRiskGroupsDisplay = highRiskGroups.map((risk, index) =>
        <li key={index}>{risk}</li>
    );

    const fluSequenceLink = (
        <Link href="/link">
            here
        </Link>
    );

    return(
        <div>
            <LargerParagraph>
                Your research test is positive for <Bold>influenza (flu)</Bold>,
                a virus that causes a respiratory infection that can be spread from person to person.
                (Learn more about <i>your</i> flu {fluSequenceLink})
            </LargerParagraph>
            <LargerParagraph>
                Most people with the flu do not need medical care or antiviral drugs.
                In most cases, it’s best to stay home and avoid contact with other
                people. If you have other health problems or are very sick or are
                worried about your illness, you should contact your health care provider.
            </LargerParagraph>
            <LargerParagraph>
                Some people are at high risk for serious flu-related complications,
                such as needing to go to the hospital or having trouble breathing because
                of pneumonia.
            </LargerParagraph>
            <EvenTwoColumnFeature title="People at high risk of severe flu include:">
                <div>
                    <h3>People with the following conditions:</h3>
                    <ul>
                        {highRiskConditionsDisplay}
                    </ul>
                </div>
                <div>
                    <h3>People in the following groups:</h3>
                    <ul>
                        {highRiskGroupsDisplay}
                    </ul>
                </div>
            </EvenTwoColumnFeature>
            <LargerParagraph>
                <b>If you are in one of these high-risk groups, please contact your provider today </b>
                 to discuss your symptoms and discuss if you need to be examined.  You should also
                discuss whether you would benefit from antiviral medicines.  Antiviral medicines
                help the most when started within 2 days after symptoms begin. For people with other
                medical problems, antivirals may need to be started even if it has been longer than
                2 days after symptoms began.
            </LargerParagraph>
            <br/>
            <ResultsMoreInfo pathogen="flu" />
        </div>
    )
}
