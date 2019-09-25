import React from 'react';
import * as Markdown from 'react-markdown';

import { Feature, FeatureH3, Link } from '../styledComponents';
import NegativeResult from './NegativeResult';
import PositiveResult from './PositiveResult';

export default class Results extends React.Component {
  state = {
    barcode: null,
    sequenced: null,
    results: null,
    header: null,
    display: null
  }

  static getDerivedStateFromProps(props, state) {
    if(props.results !== state.results) {
      return {
        barcode: props.barcode,
        sequenced: props.sequenced,
        results: props.results,
        header: props.content
      }
    }
    return null;
  }

  componentDidMount() {
    if(this.state.results.length === 0){
      this.props.getContent('results','negative')
      .then(content => {
        this.setState({
          display: (
            <NegativeResult content={content}/>
          )
        })
      })
      .catch(console.error)
    } else {
      Promise.all(this.state.results.map(
        pathogen => this.props.getContent('results', pathogen)
      )).then(result => {
        this.setState({
          display: (
            <PositiveResult results={result} sequence={this.state.sequenced} barcode={this.state.barcode}/>
          )
        })
      }).catch(console.error)
    }
  }

  render() {
    const { header, display } = this.state;

    return(
      <div>
        <Feature title={header.title}>
          <FeatureH3>
            <Markdown source={header.paragraphOne} renderers={{paragraph: FeatureH3, link: Link}}/>
          </FeatureH3>
        </Feature>
        {display? display: <p>Loading placeholder</p>}
      </div>
    )
  }
}
