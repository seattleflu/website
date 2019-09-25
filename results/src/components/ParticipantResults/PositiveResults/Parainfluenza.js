import React from 'react';
import * as Markdown from 'react-markdown';

import { LargerParagraph, Feature, UnorderedList } from '../../styledComponents';
import ResultsMoreInfo from '../ResultsMoreInfo';


export default function Parainfluenza(props) {
  const { content } = props;

  return(
    <div>
      <Markdown source={content.blockOne} renderers={{ paragraph: LargerParagraph }}/>

      <Feature title={content.listOneTitle}>
        <Markdown source={content.listOne} renderers={{list: UnorderedList}}/>
      </Feature>

      <Feature title={content.listTwoTitle}>
          <Markdown source={content.listTwo} renderers={{list: UnorderedList}}/>
      </Feature>

      <ResultsMoreInfo content={content}/>
    </div>
  )
}
