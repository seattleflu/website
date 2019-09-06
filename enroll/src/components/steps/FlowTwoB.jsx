import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'

const FlowTwoB = props => {
  const [question, setQuestion] = useState(0)
  const [symptoms, setSymptomsValue] = useState('')
  const [connection, setConnectionValue] = useState('')
  const [conditions, setConditionsValue] = useState('')
  useEffect(() => {})

  function handleChange (event) {
    event.preventDefault()

    if (question == 0) {
      if (symptoms == 'no') {
        props.handleNextError()
      } else {
        setQuestion(question + 1)
      }
    }

    if (question == 1) {
      if (connection == 'no') {
        props.handleNextError()
      } else {
        setQuestion(question + 1)
      }
    }

    if (question == 2) {
      if (conditions == 'no') {
        props.handleNextError()
      } else {
        props.handleNext(4)
      }
    }
  }

  function handleSymptoms (event) {
    setSymptomsValue(event.target.value)
  }

  function handleConnection (event) {
    setConnectionValue(event.target.value)
  }

  function handleConditions (event) {
    setConditionsValue(event.target.value)
  }

  const options = [
    { value: 'none', label: '' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ]

  return (
    <div>
      {question >= 0 ? (
        <Select
          text='Do you or anyone in your household currently have flu symptoms? Flue symptoms include:'
          label='symptoms'
          type='select'
          id='symptoms'
          value={symptoms}
          options={options}
          handleChange={handleSymptoms}
        />
      ) : null}
      {question >= 1 ? (
        <Select
          text='Do you have reqular access to an internet-enabled device, such as laptop or computer?'
          label='internetEnabled'
          type='select'
          id='connection'
          value={connection}
          options={options}
          handleChange={handleConnection}
        />
      ) : null}

      {question >= 2 ? (
        <Select
          text='Do you have any of the following conditions: '
          label='conditions'
          type='select'
          id='conditions'
          value={conditions}
          options={options}
          handleChange={handleConditions}
        />
      ) : null}
      <button
        className='btn btn-primary float-right'
        type='submit'
        onClick={handleChange}
      >
        Next
      </button>
    </div>
  )
}

export default FlowTwoB
