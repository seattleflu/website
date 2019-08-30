import React from 'react';

import { OuterContainer, ContentContainer, H1, Ordered} from './utils';

const resultsFaq = [
    [
        "What do we test for?",
        "List of pathogens that we test for here."
    ],
    [
        "Why do we test for these?",
        "Explanation of why we test here."
    ],
    [
        "What does x mean?",
        "X means ..."
    ]
]

export default function ResultsFAQ(props) {
    return(
        <OuterContainer>
            <ContentContainer>
                <H1>Results FAQ</H1>
                <Ordered items={resultsFaq}/>
            </ContentContainer>
        </OuterContainer>
    )
}
