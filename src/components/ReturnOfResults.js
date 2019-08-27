import React from 'react';

import { H1, OuterContainer, ContentContainer, Feature } from './utils';

export default class ReturnOfResults extends React.Component {
    render(){
        return (
            <OuterContainer>
                <ContentContainer>
                    <H1>Return of Results</H1>

                    <Feature title="Please input your barcode">

                    </Feature>
                </ContentContainer>
            </OuterContainer>
        )
    }
}
