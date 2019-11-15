import React, { Fragment, useState, useEffect, createContext } from 'react';

import { getContentfulResults } from '../../../services/results';
import { OuterContainer, ContentContainer } from './styledComponents';
import BarcodeSearchForm from './ParticipantResults/BarcodeSearchForm';
import SampleNotReceived from './ParticipantResults/SampleNotReceived';
import SampleProcessing from './ParticipantResults/SampleProcessing';
import UnknownBarcode from './ParticipantResults/UnknownBarcode';
import Results from './ParticipantResults/Results';

export const resultsContext = createContext()

export default function ReturnOfResults() {
  const [defaultContent, setDefaultContent] = useState({})
  const [results, setResults] = useState({})
  const [content, setContent] = useState(null)
  const [display, setDisplay] = useState(<BarcodeSearchForm/>)

  useEffect(() => {
    let isCurrent = true
    getContentFromContentful('resultType', 'default')
    .then(defaultContent => {
      if (isCurrent) {
        setDefaultContent(defaultContent)
      }
    })
    .catch(console.error)
    return function cleanup(){ isCurrent = false }
  }, [])

  useEffect(() => {
    let isCurrent = true
    if ("status" in results){
      getContentFromContentful('resultType', results.status)
      .then(content => {
        if (isCurrent) {
          setContent(content)
          let display;
          switch(results.status) {
              case 'notReceived':
                  display = <SampleNotReceived />;
                  break;
              case 'processing':
                  display = <SampleProcessing />;
                  break;
              case 'unknownBarcode':
                  display = <Fragment><UnknownBarcode/> <BarcodeSearchForm/></Fragment>;
                  break;
              case 'complete':
                  display = <Results/>
                  break;
              default:
                  display = <BarcodeSearchForm/>;
          }
          setDisplay(display)
        }
      })
    }
    return function cleanup(){ isCurrent = false }
  }, [results])

  const getContentFromContentful = (contentType, resultType) => {
    return(
      getContentfulResults(contentType, resultType)
      .then(content => {
        return content.items[0].fields
      })
      .catch(console.error)
    )
  }

  return (
    <resultsContext.Provider value={{ defaultContent, results, setResults, content, getContentFromContentful }}>
      <OuterContainer>
          <ContentContainer>
              <h1 className="align-center p-4">{defaultContent.title}</h1>
              {display}
          </ContentContainer>
      </OuterContainer>
    </resultsContext.Provider>
  )

}
