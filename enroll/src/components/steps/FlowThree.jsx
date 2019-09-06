import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
const FlowThree = props => {
  const [question, setQuestion] = useState(0)

  useEffect(() => {})

  function handleChange (event) {
    event.preventDefault()
    setQuestion(question + 1)
  }

  const options = [
    { value: 'none', label: '' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ]
  const who = [
    { value: 'none', label: '' },
    { value: 'myself', label: 'Myself' },
    { value: 'other', label: 'Someone else in my household over 18' }
  ]

  return (
    <div>
      <h3>OVER 18 FLOW</h3>
      {question >= 0 ? (
        <Select
          text='Do you or anyone in your household currently have flu symptopms?'
          description=''
          label='symptoms'
          type='select'
          id='symptoms'
          value='test'
          options={options}
          handleChange={handleChange}
        />
      ) : null}
      {question >= 1 ? (
        <Select
          text='Does someone in your house have a smartphone?'
          description=''
          label='havePhone'
          type='text'
          id='zipcode'
          value='age'
          options={who}
          handleChange={handleChange}
        />
      ) : null}

      {question >= 2 ? (
        <Select
          text='Are there at least 3 people in your household?'
          description=''
          label='moreThanThree'
          type='text'
          id='zipcode'
          value='age'
          options={who}
          handleChange={handleChange}
        />
      ) : null}
      {question >= 3 ? (
        <Select
          text='Is at least one of these individuals under 18?'
          description=''
          label='under18'
          type='text'
          id='zipcode'
          value='age'
          options={who}
          handleChange={handleChange}
        />
      ) : null}
      {question >= 4 ? (
        <Select
          text='Are there at least 2 other people in the household who DO NOT have any of the following Conditions:'
          description=''
          label='conditions'
          type='text'
          id='zipcode'
          value='age'
          options={who}
          handleChange={handleChange}
        />
      ) : null}
      {question >= 5 ? (
        <Select
          text='Are those 2 people willing and able to swallow Baloxavir pills?'
          description=''
          label='pills'
          type='text'
          id='zipcode'
          value='age'
          options={who}
          handleChange={handleChange}
        />
      ) : null}
      <button
        className='btn btn-primary float-right'
        type='submit'
        onClick={props.handleNext}
      >
        Next
      </button>
    </div>
  )
}
export default FlowThree
