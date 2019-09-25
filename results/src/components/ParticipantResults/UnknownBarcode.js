import React from 'react';

import { Banner, H2, H3 } from '../styledComponents';

export default function UnknownBarcode(props) {
  const content = props.content;

  return (
      <Banner>
          <H2>{content.title}</H2>
          <H3>{content.paragraphOne}</H3>
      </Banner>
  )
}
