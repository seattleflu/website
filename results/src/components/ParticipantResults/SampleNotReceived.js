import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { resultsContext } from '../ReturnOfResults';
import { Feature, FeatureH3, Br } from '../styledComponents';

export default function SampleNotReceived() {
  const { content } = useContext(resultsContext);

  return(
    <Feature title={content.title}
      buttonLink={content.buttonLink}
      buttonText={content.buttonText}>
      <FeatureH3>
        <Markdown source={content.paragraphOne} renderers={{paragraph: FeatureH3}}/>
        <Br/>
        {content.paragraphTwo}
      </FeatureH3>
    </Feature>
  )
};
