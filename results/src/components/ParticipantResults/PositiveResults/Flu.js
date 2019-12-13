import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { positiveResultContext } from '../PositiveResult';
import { LargerParagraph, FeatureH3, EvenTwoColumnFeature, Br } from '../../styledComponents';
import ResultsMoreInfo from '../ResultsMoreInfo';

export default function Flu() {
  const { content } = useContext(positiveResultContext);

  return(
    <div>
      <Markdown source={content.blockOne} renderers={{ paragraph: LargerParagraph }}/>

      <EvenTwoColumnFeature title={content.listOneTitle}>
        <div>
          <FeatureH3>{content.listTwoTitle}</FeatureH3>
          <Br/>
          <Markdown source={content.listTwo}/>
        </div>
        <div>
          <FeatureH3>{content.listThreeTitle}</FeatureH3>
          <Br/>
          <Markdown source={content.listThree}/>
        </div>
      </EvenTwoColumnFeature>

      <Markdown source={content.blockTwo} renderers={{ paragraph: LargerParagraph }}/>

      <Br/>

      <ResultsMoreInfo content={content}/>
    </div>
  )
}
