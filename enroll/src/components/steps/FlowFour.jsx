import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
const FlowFour = props => {
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
      <h3>Flow 4 - child under 18</h3>
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
export default FlowFour
