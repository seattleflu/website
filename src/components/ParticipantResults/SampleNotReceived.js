import React from 'react';
import styled from 'styled-components';

import { Feature, H3 } from '../utils';

const P = styled(H3)`
    color: inherit;
`
const Br = styled.br`
    line-height: 3
`

export default function SampleNotReceived(props) {
    return (
        <Feature title="Thank you for participating in our study!"
            buttonLink="/current"
            buttonText="Current Conditions">
            <P>
                Your sample has not been received yet. <br/>
                It takes 24-48 hours to receive samples. <br/>
                Please check back again.
                <Br/>
                In the meantime, checkout out the current flu conditions:
            </P>
        </Feature>
    )

};
