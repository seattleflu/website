import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Input from '../presentational/Input.jsx'
const Main = props => {
  const [question, setQuestion] = useState(0)
  const [zipValue, setZipValue] = useState('')
  const [ageValue, setAgeValue] = useState('')

  useEffect(() => {})

  function handleChange (event) {
    event.preventDefault()
    if (question == 0) {
      if (zipValue == '98107') {
        setQuestion(question + 1)
      } else {
        props.handleNextError(props.bouncePage1)
      }
    }

    if (question == 1) {
      if (ageValue >= 18) {
        props.handleNext(1)
      } else {
        props.handleNextError(props.bouncePage2)
      }
    }
  }
  function handleZipChange (event) {
    setZipValue(event.target.value)
  }
  function handleAgeChange (event) {
    setAgeValue(event.target.value)
  }

  return (
    <div>
      {question >= 0 ? (
        <Input
          text={props.question1}
          description=''
          label='zip_code'
          type='text'
          id='zipcode'
          value={zipValue}
          handleChange={handleZipChange}
        />
      ) : null}
      {question >= 1 ? (
        <Input
          text={props.question2}
          description=''
          label='age'
          type='text'
          id='zipcode'
          value={ageValue}
          handleChange={handleAgeChange}
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
export default Main
