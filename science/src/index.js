import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown';

const contentful = require('../../services/science');

class App extends React.Component {
  state = {
    title: '',
    subtitle: '',
    codeRepos: '',
    dataSets: '',
    contactQuestions: '',
    requestData: '',
    publications: '',
  }

  componentDidMount() {
    contentful
    .getScience()
    .then(response => {
      const scienceData = response.items[0]
      this.setState(scienceData.fields);
    })
    .catch(console.error)
  }

  render() {
    return (
      <div className='science-page'>
        <h1>{this.state.title}</h1>
        <Markdown source={this.state.subtitle} />

        <h2>Code Repos</h2>
        <Markdown source={this.state.codeRepos} />

        <h2>Data Sets</h2>
        <Markdown source={this.state.dataSets} />

        <h2>Who to contact with questions</h2>
        <Markdown source={this.state.contactQuestions} />

        <h2>How to request more data</h2>
        <Markdown source={this.state.requestData} />

        <h2>Publications</h2>
        <Markdown source={this.state.publications} />
      </div>
    )
  }
}

export default App
const wrapper = document.getElementById('science')
wrapper ? ReactDOM.render(<App />, wrapper) : false
