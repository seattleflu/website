import React from 'react';

import { OuterContainer, ContentContainer } from './styledComponents';
import BarcodeSearchForm from './ParticipantResults/BarcodeSearchForm';
import SampleNotReceived from './ParticipantResults/SampleNotReceived';
import SampleProcessing from './ParticipantResults/SampleProcessing';
import UnknownBarcode from './ParticipantResults/UnknownBarcode';
import Results from './ParticipantResults/Results';

const resultService = require('../../../services/results');

export default class ReturnOfResults extends React.Component {
  state = {
    barcode: '',
    status: '',
    organisms_present: [],
    sequenced: false,
    content: null
  };

  submitBarcode = (barcode) => {
    resultService.getBarcodeResults(barcode)
    .then(response => {
      if (response) {
        this.setResult(response)
      }
    });
  }

  setResult = (newResults) => {
    // Convert ID3C lineages to generic pathogen names used in the rest of the app
    if(newResults["organisms_present"]){
      newResults["organisms_present"] = newResults["organisms_present"].map(lineage => {
        const lineageMap = {
          "Adenovirus": "adenovirus",
          "Human_coronavirus": "coronavirus",
          "Enterovirus": "enterovirus",
          "Influenza": "flu",
          "Human_metapenumovirus": "hmpv",
          "Human_parainfluenza": "parainfluenza",
          "Rhinovirus": "rhinovirus",
          "RSV": "rsv"
        }
        return lineageMap[lineage]
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
      resultService.getContentfulResults(contentType, resultType)
      .then(content => {
        return content.items[0].fields
      })
      .catch(console.error)
    )
  }

    render(){
        const {content, status, organisms_present, sequenced, barcode} = this.state;
        let display;

        switch(status) {
            case 'notReceived':
                display = <SampleNotReceived content={content}/>;
                break;
            case 'processing':
                display = <SampleProcessing content={content}/>;
                break;
            case 'unknownBarcode':
                display = <div><UnknownBarcode content={content}/><BarcodeSearchForm submitBarcode={ this.submitBarcode }/></div>;
                break;
            case 'complete':
                display = (
                  <Results results={organisms_present} sequenced={sequenced} barcode={barcode} content={content}
                    getContent={this.getContentFromContentful}/>
                )
                break;
            default:
                display = <BarcodeSearchForm submitBarcode={this.submitBarcode}/>;
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
