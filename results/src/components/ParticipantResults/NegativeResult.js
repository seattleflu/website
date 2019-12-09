import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { contentContext } from './Results';
import { LargerParagraph, Feature, UnorderedList, MoreInfo, Link } from '../styledComponents';

export default function NegativeResult() {
  const { resultContent } = useContext(contentContext);

  return (
    <div>
      <h3 className='align-center'>{resultContent.title}</h3>
      <LargerParagraph>{resultContent.blockOne}</LargerParagraph>
      <Feature title={resultContent.listOneTitle}>
        <Markdown source={resultContent.listOne} renderers={{list: UnorderedList}} />
      </Feature>
      <MoreInfo>
        <Markdown source={resultContent.footer} />
        <hr/>
        <Markdown source={resultContent.footerLink} renderers={{link: Link}}/>
      </MoreInfo>
    </div>
  )
}
