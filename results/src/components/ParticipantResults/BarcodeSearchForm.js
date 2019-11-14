import React from 'react';

import { Feature, Form, Input, SubmitButton } from '../styledComponents';

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
        const {content} = this.props;
        return (
            <Feature title = {content.paragraphOne}
                buttonLink= {content.buttonLink}
                buttonText= {content.buttonText}>
                <Form onSubmit={this.handleSubmit}>
                    <Input required type="text" value={this.state.value} onChange={this.handleChange} />
                    <SubmitButton type="submit">{content.paragraphTwo}</SubmitButton>
                </Form>
            </Feature>
        )
    }
}
