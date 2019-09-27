import React from 'react';
import * as Markdown from 'react-markdown';

import { LargerParagraph, Feature, UnorderedList, MoreInfo, Link } from '../styledComponents';

export default function NegativeResult(props) {
  const { content } = props;

  return (
    <div>
      <h3 className='align-center'>{content.title}</h3>
      <LargerParagraph>{content.blockOne}</LargerParagraph>
      <Feature title={content.listOneTitle}>
        <Markdown source={content.listOne} renderers={{list: UnorderedList}} />
      </Feature>
      <MoreInfo>
        <Markdown source={content.footer} />
        <hr/>
        <Markdown source={content.footerLink} renderers={{link: Link}}/>
      </MoreInfo>
    </div>
  )
}
