import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'

const FlowTwoB = props => {
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
        text='Do you or anyone in your household currently have flu symptoms? Flue symptoms include:'
        label='symptoms'
        type='select'
        id='symptoms'
        value='test'
        options={options}
        handleChange={handleChange}
      />
      <Select
        text='Do you have reqular access to an internet-enabled device, such as laptop or computer?'
        label='internetEnabled'
        type='text'
        id='zipcode'
        value='age'
        options={who}
        handleChange={handleChange}
      />

      <Select
        text='Do you have any of the following conditions: '
        label='conditions'
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

export default FlowTwoB
