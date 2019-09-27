import React from 'react';

import { Banner } from '../styledComponents';

export default function UnknownBarcode(props) {
  const content = props.content;

  return (
      <Banner>
          <h2>{content.title}</h2>
          <h3>{content.paragraphOne}</h3>
      </Banner>
  )
}
