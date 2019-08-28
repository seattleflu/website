import React from 'react';
import styled from 'styled-components';

import { Feature } from '../utils';
import { notReceived,
         processing,
         completeNegative,
         completePositiveFlu,
         completePositiveMultiple,
         completeSequenced,
         wrongBarcode } from './mock-data.js';


const Form = styled.form`
    display: flex;
    padding: 20px;
    justify-content: center;
`
const Input = styled.input`
    width: 80%;
    padding: 10px;
    font-size: 1.2em;
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.accent500}
    }
`
const SubmitButton = styled.button`
    width: 20%;
    border: 1px solid ${props => props.theme.neutral100};
    background-color: inherit;
    color: ${props => props.theme.neutral100};
    border-radius: 3px;
    padding: 5px;
    margin: 0px 15px;
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.primary300};
        color: ${props => props.theme.white};
    }
`

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
            <Feature title = "Please input your barcode">
                <Form onSubmit={this.handleSubmit}>
                    <Input required type="text" value={this.state.value} onChange={this.handleChange} />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Form>
            </Feature>
        )
    }
}
