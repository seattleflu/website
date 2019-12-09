import React from 'react';
import * as Markdown from 'react-markdown';

import { MoreInfo, Link } from '../styledComponents';

export default function ResultsMoreInfo(props) {
  const { content } = props;

  return (
    <MoreInfo>
      <Markdown source={content.footer}/>
      <hr/>
      <Markdown source={content.footerLink} renderers={{ link: Link }}/>
    </MoreInfo>
  )
}
