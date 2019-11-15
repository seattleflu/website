import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { positiveResultContext } from '../PositiveResult';
import { LargerParagraph, Feature, UnorderedList } from '../../styledComponents';
import ResultsMoreInfo from '../ResultsMoreInfo';


export default function Adenovirus() {
  const { content } = useContext(positiveResultContext);

  return(
    <div>
      <Markdown source={content.blockOne} renderers={{ paragraph: LargerParagraph }}/>

      <Feature title={content.listOneTitle}>
        <Markdown source={content.listOne} renderers={{list: UnorderedList}}/>
      </Feature>

      <Feature title={content.listTwoTitle}>
          <Markdown source={content.listTwo} renderers={{list: UnorderedList}}/>
      </Feature>

      <Feature title={content.listThreeTitle}>
          <Markdown source={content.listThree} renderers={{list: UnorderedList}}/>
      </Feature>

      <ResultsMoreInfo content={content}/>
    </div>
  )
}
