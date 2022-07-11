import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { positiveResultContext } from '../PositiveResult';
import { LargerParagraph, EvenTwoColumnFeature, Feature, UnorderedList } from '../../styledComponents';
import ResultsMoreInfo from '../ResultsMoreInfo';


export default function RSV() {
  const { content } = useContext(positiveResultContext);

  return(
    <div>
      <Markdown source={content.blockOne} renderers={{ paragraph: LargerParagraph }}/>

      <Feature title={content.listOneTitle}>
        <Markdown source={content.listOne} renderers={{list: UnorderedList}}/>
      </Feature>

      <Markdown source={content.blockTwo} renderers={{ paragraph: LargerParagraph }}/>

      <EvenTwoColumnFeature title={content.listTwoTitle}>
        <Markdown source={content.listTwo} renderers={{list: UnorderedList}}/>
        <Markdown source={content.listThree} renderers={{list: UnorderedList}}/>
      </EvenTwoColumnFeature>

      <ResultsMoreInfo content={content}/>
    </div>
  )
}
