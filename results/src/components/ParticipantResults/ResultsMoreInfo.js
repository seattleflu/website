import React from 'react';

import { MoreInfo, Bold, Link } from '../styledComponents';

export const ResultsMoreInfo = (props) => {
    return (
      <MoreInfo>
            <Bold>If your health care provider wants to know more</Bold> about these
            test results, please contact us at (WEBSITE OR PHONE NUMBER).
            <hr/>
            For more information, please visit the US Center for Disease Control at <Link href={`http://cdc.gov/${props.pathogen}`} target="_blank">www.cdc.gov/{props.pathogen}</Link>
      </MoreInfo>
    )
}
