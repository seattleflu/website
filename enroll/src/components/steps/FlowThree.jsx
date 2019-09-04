import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
const FlowThree = props => {
  useEffect(() => {})

  function handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
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
      <Select
        text='Do you or anyone in your household currently have flu symptopms?'
        label='symptoms'
        type='select'
        id='symptoms'
        value='test'
        options={options}
        handleChange={handleChange}
      />
      <Select
        text='Does someone in your house have a smartphone?'
        label='havePhone'
        type='text'
        id='zipcode'
        value='age'
        options={who}
        handleChange={handleChange}
      />

      <Select
        text='Are there at least 3 people in your household?'
        label='moreThanThree'
        type='text'
        id='zipcode'
        value='age'
        options={who}
        handleChange={handleChange}
      />
      <Select
        text='Is at least one of these individuals under 18?'
        label='under18'
        type='text'
        id='zipcode'
        value='age'
        options={who}
        handleChange={handleChange}
      />
      <Select
        text='Are there at least 2 other people in the household who DO NOT have any of the following Conditions:'
        label='conditions'
        type='text'
        id='zipcode'
        value='age'
        options={who}
        handleChange={handleChange}
      />
      <Select
        text='Are those 2 people willing and able to swallow Baloxavir pills?'
        label='pills'
        type='text'
        id='zipcode'
        value='age'
        options={who}
        handleChange={handleChange}
      />
      <button
        className='btn btn-primary float-right'
        type='button'
        onClick={props.handleNext}
      >
        Next
      </button>
    </div>
  )
}
export default FlowThree
