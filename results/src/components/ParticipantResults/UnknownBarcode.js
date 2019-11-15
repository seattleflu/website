import React, { useContext } from 'react';

import { resultsContext } from '../ReturnOfResults';
import { Banner } from '../styledComponents';

export default function UnknownBarcode() {
  const { content } = useContext(resultsContext)

  return (
      <Banner>
          <h2>{content.title}</h2>
          <h3>{content.paragraphOne}</h3>
      </Banner>
  )
}
