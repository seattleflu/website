import React, { Fragment, useState, useEffect, createContext } from 'react';
import * as Markdown from 'react-markdown';

import { getContentfulResults, getBarcodeFaqs } from '../../../services/results';
import { OuterContainer, ContentContainer, LanguageButton, H2, CenteredParagraph} from './styledComponents';
import BarcodeSearchForm from './ParticipantResults/BarcodeSearchForm';
import SampleNotReceived from './ParticipantResults/SampleNotReceived';
import SampleProcessing from './ParticipantResults/SampleProcessing';
import UnknownBarcode from './ParticipantResults/UnknownBarcode';
import Results from './ParticipantResults/Results';

export const resultsContext = createContext()
export default function ReturnOfResults() {
  const [defaultContent, setDefaultContent] = useState({})
  const [barcodeFaqs, setBarcodeFaqs] = useState([])
  const [results, setResults] = useState({})
  const [content, setContent] = useState(null)
  const [display, setDisplay] = useState(<BarcodeSearchForm/>)
  const [spanish, setSpanish] = useState(false)

  useEffect(() => {
    let isCurrent = true
    getContentFromContentful('resultType', 'default')
    .then(defaultContent => {
      if (isCurrent) {
        setDefaultContent(defaultContent)
      }
    })
    .catch(console.error)
    getBarcodeFaqs(spanish ? 'barcodeFaqs-es' : 'barcodeFaqs')
    .then(barcodeFaqs => {
      if (isCurrent) {
        setBarcodeFaqs(barcodeFaqs.items)
      }
    })
    .catch(console.error)
    return function cleanup(){ isCurrent = false }
  }, [spanish])

  useEffect(() => {
    let isCurrent = true
    if ("status" in results){
      getContentFromContentful('resultType', results.status)
      .then(content => {
        if (isCurrent) {
          setContent(content)
          let display;
          switch(results.status) {
              // case 'notReceived':
              //     display = <SampleNotReceived />;
              //     break;
              // case 'processing':
              //     display = <SampleProcessing />;
              //     break;
              // case 'unknownBarcode':
              //     display = <Fragment><UnknownBarcode/><BarcodeSearchForm/></Fragment>;
              //     break;
              // case 'complete':
              //     display = <Results/>
              //     break;
              default:
                  display = <BarcodeSearchForm/>;
          }
          setDisplay(display)
        }
      })
    }
    return function cleanup(){ isCurrent = false }
  }, [spanish, results])

  const getContentFromContentful = (contentType, resultType) => {
    return(
      getContentfulResults(contentType, spanish ? resultType + '-es' : resultType)
      .then(content => {
        return content.items[0].fields
      })
      .catch(console.error)
    )
  }

  return (
    <resultsContext.Provider value={{ defaultContent, barcodeFaqs, results, setResults, content, getContentFromContentful }}>
      <OuterContainer>
          <ContentContainer>
            <div className="h-25 align-center pt-md-3">
              <Markdown source={defaultContent.title} renderers={{H2: H2, paragraph: CenteredParagraph}}/>
              {/* <LanguageButton className="float-right" onClick={()=> setSpanish(!spanish)}>
                {spanish ? "English" : "Español"}
              </LanguageButton> */}
            </div>
            {display}
          </ContentContainer>
      </OuterContainer>
    </resultsContext.Provider>
  )

}
