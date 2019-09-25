import React from 'react';
import * as Markdown from 'react-markdown';

import { Feature, FeatureH3, UnorderedList } from '../styledComponents';

export default function SampleProcessing(props) {
  const { content } = props;

  return(
    <div>
      <Feature title={<Markdown source={content.title} renderers={{paragraph: FeatureH3}}/>}
        buttonLink={content.buttonLink}
        buttonText={content.buttonText}>
        <FeatureH3>
          {content.paragraphOne}
        </FeatureH3>
      </Feature>
      <Feature>
        <Markdown source={content.paragraphTwo} renderers={{ list: UnorderedList }}/>
      </Feature>
    </div>
  )
}
