import React, { useState, useEffect, createContext, useContext } from 'react';
import * as Markdown from 'react-markdown';

import { resultsContext } from '../ReturnOfResults';
import { Feature, FeatureH3 } from '../styledComponents';
import NegativeResult from './NegativeResult';
import PositiveResult from './PositiveResult';

export const contentContext = createContext();

export default function Results() {
  const { results, content, getContentFromContentful } = useContext(resultsContext)
  const { organisms_present } = results
  const [display, setDisplay] = useState(null)
  const [resultContent, setResultContent] = useState({})

  useEffect(() => {
    let isCurrent = true
    if (!organisms_present) {
      getContentFromContentful('results', 'negative')
      .then(negativeContent => {
        negativeContent["footer"] = content.paragraphTwo
        if (isCurrent) {
          setResultContent(negativeContent)
          setDisplay(<NegativeResult />)
        }
      })
    } else {
      Promise.all(organisms_present.map(
        pathogen => getContentFromContentful('results', pathogen)
      )).then(positiveResults => {
        positiveResults = positiveResults.map(r => ({...r, footer: content.paragraphTwo}))
        if (isCurrent) {
          setResultContent(positiveResults)
          setDisplay(<PositiveResult/>)
        }
      }).catch(console.error)
    }
    return function cleanup() { isCurrent = false }
  }, [content])

  return(
    <div>
      <Feature title={content.title}>
        <Markdown source={content.paragraphOne} renderers={{paragraph: FeatureH3}}/>
      </Feature>
      <contentContext.Provider value={{ resultContent }}>
        {display? display: <p>Loading placeholder</p>}
      </contentContext.Provider>
    </div>
  )

}
