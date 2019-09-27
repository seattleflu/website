import React from 'react';

import { OuterContainer, ContentContainer } from './styledComponents';
import BarcodeSearchForm from './ParticipantResults/BarcodeSearchForm';
import SampleNotReceived from './ParticipantResults/SampleNotReceived';
import SampleProcessing from './ParticipantResults/SampleProcessing';
import UnknownBarcode from './ParticipantResults/UnknownBarcode';
import Results from './ParticipantResults/Results';

const contentful = require('../../../services/results');

export default class ReturnOfResults extends React.Component {
  state = {
    barcode: '',
    status: '',
    results: [],
    sequenced: false,
    content: null
  };

  setResult = (newResults) => {
    // Convert ID3C lineages to generic pathogen names used in the rest of the app
    if(newResults["results"]){
      newResults["results"] = newResults["results"].map(lineage => {
        if(lineage.includes('Influenza')){
          return 'flu'
        }
        if(lineage.includes('RSV')){
          return 'rsv'
        }
        return lineage
      });
    }

    this.getContentFromContentful('resultType', newResults['status'])
    .then(content => {
      newResults['content'] = content;
      this.setState(newResults)
    })
    .catch(console.error)
  }

  getContentFromContentful(contentType, resultType) {
    return(
      contentful.getResults(contentType, resultType)
      .then(content => {
        return content.items[0].fields
      })
      .catch(console.error)
    )
  }

    render(){
        const {content, status, results, sequenced, barcode} = this.state;
        let display;

        switch(status) {
            case 'notReceived':
                display = <SampleNotReceived content={content}/>;
                break;
            case 'processing':
                display = <SampleProcessing content={content}/>;
                break;
            case 'unknownBarcode':
                display = <div><UnknownBarcode content={content}/><BarcodeSearchForm submitResult={ this.setResult }/></div>;
                break;
            case 'complete':
                display = (
                  <Results results={results} sequenced={sequenced} barcode={barcode} content={content}
                    getContent={this.getContentFromContentful}/>
                )
                break;
            default:
                display = <BarcodeSearchForm submitResult={this.setResult}/>;
        }

        return (
            <OuterContainer>
                <ContentContainer>
                    <h1 className="align-center p-4">
                      Return of Results
                    </h1>
                    {display}
                </ContentContainer>
            </OuterContainer>
        )

    }
}
