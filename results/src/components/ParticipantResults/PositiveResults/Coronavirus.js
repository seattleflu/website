import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { positiveResultContext } from '../PositiveResult';
import { LargerParagraph, CenteredParagraph, Feature, UnorderedList, Br } from '../../styledComponents';
import ResultsMoreInfo from '../ResultsMoreInfo';

export default function Coronavirus() {
  const { content } = useContext(positiveResultContext);

  return(
    <div>
      <Markdown source={content.blockOne} escapeHtml={false} renderers={{ paragraph: LargerParagraph }}/>

      <Feature title={content.listOneTitle}>
        <Markdown source={content.listOne} renderers={{ list: UnorderedList }} />
      </Feature>

      <Markdown source={content.blockTwo} renderers={{ paragraph: LargerParagraph }}/>

      <Feature title={content.listTwoTitle}>
        <Markdown source={content.listTwo} renderers={{ list: UnorderedList }}/>
      </Feature>

      <Markdown source={content.blockThree} renderers={{ paragraph: CenteredParagraph }}/>
      <Br/>
      <ResultsMoreInfo content={content} />
    </div>
  )
}
