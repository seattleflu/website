import React from 'react';

import { OuterContainer, ContentContainer, H1, Ordered, Feature, CenteredParagraph } from './utils';

const sequenceFaq = [
    [
        "Sequencing is..."
    ],
    [
        "What does that mean?",
        "Explanation here."
    ],
    [
        "Why do we sequence?",
        "Explanation here."
    ]
]

export default class FluSequence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: '',
            sequenced: false
        };
    }

    componentDidMount() {
        // If this page is reached via an internal link,
        // then set the state based on information passed
        if(this.props.location.state){
            const { barcode, sequenced } = this.props.location.state;
            this.setState({
                barcode: barcode,
                sequenced:sequenced
            }, () => {
                console.log(this.state)
            })
        }
    }

    render() {
        let phylogeny;
        if(this.state.sequenced && this.state.barcode){
            phylogeny = (
                <Feature title="Placeholder for personalized simplified phylogeny">
                    <CenteredParagraph>Highlight node in phylogeny based on barcode state: {this.state.barcode}</CenteredParagraph>
                </Feature>
            );
        }
        else{
            phylogeny = (
                <Feature title="Placeholder for generic phylogeny">
                    <CenteredParagraph>
                        If someone reached this webpage without entering barcode, do we want to display a general phylogeny tree?
                    </CenteredParagraph>
                </Feature>
            )
        }
        return(
            <OuterContainer>
                <ContentContainer>
                    <H1>Learn More About Your Flu</H1>
                    <Ordered items={sequenceFaq}/>
                    {phylogeny}
                </ContentContainer>
            </OuterContainer>
        )
    }
}
