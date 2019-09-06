import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'

const FlowOne = props => {
  const [question, setQuestion] = useState(0)
  const [haveFluValue, setHaveFluValue] = useState('')
  const [whoValue, setWhoValue] = useState('')

  const [havePhone, setHavePhoneValue] = useState('')
  const [moreThanThree, setMoreThanThreeValue] = useState('')
  const [under18, setUnder18Value] = useState('')
  const [conditions, setConditionsValue] = useState('')
  const [pills, setPillsValue] = useState('')

  useEffect(() => {})

  function handleChange (event) {
    event.preventDefault()
    if (question == 0) {
      if (haveFluValue == 'yes') {
        setQuestion(question + 1)
      } else {
        props.handleNextError()
      }
    }
    if (question == 1) {
      if (whoValue != 'none') {
        props.handleNext(2)
      } else {
        props.handleNextError()
      }
    }
    if (question == 6) {
      if (pills == 'yes') {
        props.handleNext(0)
      } else {
        props.handleNextError()
      }
    }
  }

  function handleSymptopmsChange (event) {
    setHaveFluValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    } else if (event.target.value == 'no') {
      setQuestion(2)
    }
  }
  function handleWhoChange (event) {
    setWhoValue(event.target.value)
    setQuestion(1)
    if (event.target.value != 'none') {
      setQuestion(1)
    }
  }

  function handleHavePhoneChange (event) {
    setHavePhoneValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    }
  }
  function handleMoreThanThreeChange (event) {
    setMoreThanThreeValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    }
  }
  function handleUnder18Change (event) {
    setUnder18Value(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    }
  }
  function handleConditionsChange (event) {
    setConditionsValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    }
  }
  function handlePillsChange (event) {
    setPillsValue(event.target.value)
    if (event.target.value == 'yes') {
      // setQuestion(question + 1)
    }
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
      {question >= 0 ? (
        <Select
          text='Do you or anyone in your household currently have flu symptoms? Flue symptoms include:'
          label='symptoms'
          type='select'
          id='symptoms'
          value={haveFluValue}
          options={options}
          handleChange={handleSymptopmsChange}
        />
      ) : null}

      {question == 1 ? (
        <Select
          text='Who are you filling this survey out for?'
          label='whoFor'
          type='select'
          id='whoFor'
          value={whoValue}
          options={who}
          handleChange={handleWhoChange}
        />
      ) : null}

      {question >= 2 ? (
        <Select
          text='Does someone in your house have a smartphone?'
          label='havePhone'
          type='select'
          id='smartphone'
          value={havePhone}
          options={options}
          handleChange={handleHavePhoneChange}
        />
      ) : null}

      {question >= 3 ? (
        <Select
          text='Are there at least 3 people in your household?'
          label='moreThanThree'
          type='select'
          id='moreThanThree'
          value={moreThanThree}
          options={options}
          handleChange={handleMoreThanThreeChange}
        />
      ) : null}
      {question >= 4 ? (
        <Select
          text='Is at least one of these individuals under 18?'
          label='under18'
          type='select'
          id='under18'
          value={under18}
          options={options}
          handleChange={handleUnder18Change}
        />
      ) : null}
      {question >= 5 ? (
        <Select
          text='Are there at least 2 other people in the household who DO NOT have any of the following Conditions:'
          label='conditions'
          type='select'
          id='conditions'
          value={conditions}
          options={options}
          handleChange={handleConditionsChange}
        />
      ) : null}
      {question >= 6 ? (
        <Select
          text='Are those 2 people willing and able to swallow Baloxavir pills?'
          label='pills'
          type='select'
          id='pills'
          value={pills}
          options={options}
          handleChange={handlePillsChange}
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

export default FlowOne
