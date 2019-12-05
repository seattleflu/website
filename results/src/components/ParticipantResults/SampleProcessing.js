import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { resultsContext } from '../ReturnOfResults';
import { Feature, FeatureH3, UnorderedList, Br } from '../styledComponents';

export default function SampleProcessing() {
  const { content } = useContext(resultsContext);

  return(
    <div>
      <Feature title={<Markdown source={content.title} renderers={{paragraph: FeatureH3}}/>}
        buttonLink={content.buttonLink}
        buttonText={content.buttonText}>
        <FeatureH3>
          {content.paragraphOne}
        </FeatureH3>
      </Feature>
      <div>
        <Markdown source={content.paragraphTwo} renderers={{ list: UnorderedList }}/>
      </div>
    </div>
  )
}
