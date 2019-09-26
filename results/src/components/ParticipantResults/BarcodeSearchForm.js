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
        // TODO: Make GET request to ID3C with barcode
        switch(this.state.value) {
            case "none":
                this.props.submitResult(notReceived);
                break;
            case "processing":
                this.props.submitResult(processing);
                break;
            case "negative":
                this.props.submitResult(completeNegative);
                break;
            case "flu":
                this.props.submitResult(completePositiveFlu);
                break;
            case "multiple":
                this.props.submitResult(completePositiveMultiple);
                break;
            case "sequenced":
                this.props.submitResult(completeSequenced);
                break;
            default:
                this.props.submitResult(wrongBarcode);
        }

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
