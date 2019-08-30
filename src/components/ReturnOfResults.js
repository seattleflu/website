import React from 'react';

import { H1, OuterContainer, ContentContainer } from './utils';
import BarcodeSearchForm from './ParticipantResults/BarcodeSearchForm';
import SampleNotReceived from './ParticipantResults/SampleNotReceived';
import SampleProcessing from './ParticipantResults/SampleProcessing';
import UnknownBarcode from './ParticipantResults/UnknownBarcode';
import Results from './ParticipantResults/Results';

export default class ReturnOfResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: '',
            status: '',
            results: [],
            sequenced: false
        };
    }

    setResult = (newResults) => {
        this.setState(newResults, () => {
            console.log(this.state)
        });
    }

    render(){
        const sampleStatus = this.state.status;
        let display;

        switch(sampleStatus) {
            case 'notReceived':
                display = <SampleNotReceived/>;
                break;
            case 'processing':
                display = <SampleProcessing />;
                break;
            case 'unknownBarcode':
                display = <div><UnknownBarcode /><BarcodeSearchForm submitResult={ this.setResult }/></div>;
                break;
            case 'complete':
                display = <Results results={ this.state.results } sequenced={ this.state.sequenced } barcode={ this.state.barcode } />;
                break;
            default:
                display = <BarcodeSearchForm submitResult={this.setResult}/>;
        }

        return (
            <OuterContainer>
                <ContentContainer>
                    <H1>Return of Results</H1>
                    {display}
                </ContentContainer>
            </OuterContainer>
        )

    }
}
