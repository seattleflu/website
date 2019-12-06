import React, { useContext, Fragment } from 'react';
import * as Markdown from 'react-markdown';

import { resultsContext } from '../ReturnOfResults';
import { Feature, FeatureH3, CenteredParagraph } from '../styledComponents';

export default function SampleProcessing() {
  const { content } = useContext(resultsContext);

  return(
    <div>
      <Feature
        buttonLink={content.buttonLink}
        buttonText={content.buttonText}>
        <Fragment>
          <Markdown source={content.title} renderers={{paragraph: FeatureH3}}/>
          <FeatureH3>{content.paragraphOne}</FeatureH3>
        </Fragment>
      </Feature>
      <div className="text-center mb-md-5">
        <Markdown source={content.paragraphTwo} renderers={{ paragraph: CenteredParagraph }}/>
      </div>
    </div>
  )
}
