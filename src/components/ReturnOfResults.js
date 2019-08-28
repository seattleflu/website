import React from 'react';

import { H1, OuterContainer, ContentContainer } from './utils';
import BarcodeSearchForm from './ParticipantResults/BarcodeSearchForm';
import SampleNotReceived from './ParticipantResults/SampleNotReceived';
import SampleProcessing from './ParticipantResults/SampleProcessing';

export default class ReturnOfResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: '',
            status: '',
            results: []
        };
    }

    setResult = (newResults) => {
        this.setState(newResults, () => {
            console.log(this.state)
        });
    }

    render(){
        return (
            <OuterContainer>
                <ContentContainer>
                    <H1>Return of Results</H1>
                    { this.state.barcode === '' &&
                        <BarcodeSearchForm submitResult={this.setResult}/>
                    }
                    { this.state.status === 'notReceived' &&
                        <SampleNotReceived/>
                    }
                    { this.state.status === 'processing' &&
                        <SampleProcessing />
                    }
                </ContentContainer>
            </OuterContainer>
        )

    }
}
