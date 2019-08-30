import React from 'react';

import { OuterContainer, ContentContainer, H1, Ordered } from './utils';

const findBarcodeQuestions = [
    [
        "What is my barcode?",
        "Each sample is assigned a unique 8 digit barcode consisting of letters and numbers"
    ],
    [
        "Where do I find my barcode?",
        "Are participants given a card with their barcode? Do they have to locate their barcode based on study arm?"
    ]
]

export default function FindBarcode(props) {
    return (
        <OuterContainer>
            <ContentContainer>
                <H1>Find My Barcode</H1>
                <Ordered items={findBarcodeQuestions}/>
            </ContentContainer>
        </OuterContainer>
    )
}
