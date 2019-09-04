import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'

const FlowTwoA = props => {
  useEffect(() => {})

  function handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  const options = [
    { value: 'none', label: '' },
    { value: 'lessThan72', label: 'Less than 72 hours' },
    {
      value: 'moreThanandlessthan',
      label: 'Less that 72 hours, but less than 7 days'
    },
    { value: 'moreThan7', label: '7 Days or more' }
  ]

  return (
    <div>
      <Select
        text='How Long have you had symptoms?'
        label='symptoms'
        type='select'
        id='symptoms'
        value='test'
        options={options}
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
export default FlowTwoA
