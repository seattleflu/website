import React from 'react';

import { Feature, Form, Input, SubmitButton } from '../styledComponents';
import { notReceived,
         processing,
         completeNegative,
         completePositiveFlu,
         completePositiveMultiple,
         completeSequenced,
         wrongBarcode } from './mock-data.js';

export default class BarcodeSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitBarcode(this.state.value);
    }

    render() {
        return (
            <Feature title = "Please input your barcode"
                buttonLink="/results/barcode-faq"
                buttonText="Where do I find my barcode?">
                <Form onSubmit={this.handleSubmit}>
                    <Input required type="text" value={this.state.value} onChange={this.handleChange} />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Form>
            </Feature>
        )
    }
}
