import React, { useContext } from 'react';
import * as Markdown from 'react-markdown';

import { resultsContext } from '../ReturnOfResults';
import { Banner, H2, H3 } from '../styledComponents';

export default function UnknownBarcode() {
  const { content } = useContext(resultsContext)

  return (
    <Banner>
      <Markdown source={content.title} renderers={{paragraph: H2}}/>
      <Markdown source={content.paragraphOne} renderers={{paragraph: H3}}/>
    </Banner>
  )
}
