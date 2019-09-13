import React from 'react';

import { Feature, FeatureH3, Br } from '../styledComponents';

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
