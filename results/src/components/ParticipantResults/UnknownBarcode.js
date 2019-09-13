import React from 'react';

import { Banner, H2, H3 } from '../styledComponents';

export default function UnknownBarcode(props) {
    return (
        <Banner>
            <H2>Oops! We don't have that barcode!</H2>
            <H3>
                Please double check that you have entered the correct barcode.
            </H3>
        </Banner>
    )
}
