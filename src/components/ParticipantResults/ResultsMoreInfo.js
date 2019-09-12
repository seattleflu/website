import React from 'react';
import styled from 'styled-components';

import { Bold, ExternalLink } from '../utils';

export const ResultsMoreInfo = (props) => {
    const MoreInfo = styled.div`
      margin: 1em;
      padding-bottom: 1.5em;
      font-size: 16px;
      text-align: center;
    `
    return (
      <MoreInfo>
            <Bold>If your health care provider wants to know more</Bold> about these
            test results, please contact us at (WEBSITE OR PHONE NUMBER).
            <hr/>
            For more information, please visit the US Center for Disease Control at <ExternalLink href={`http://cdc.gov/${props.pathogen}`} target="_blank">www.cdc.gov/{props.pathogen}</ExternalLink>
      </MoreInfo>
    )
}
