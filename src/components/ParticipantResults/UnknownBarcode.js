import React from 'react';
import styled from 'styled-components';

import { H2, H3 } from '../utils';

const Banner = styled.div`
    background-color: ${props => props.theme.accent500};
    padding: 1em;
`

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
