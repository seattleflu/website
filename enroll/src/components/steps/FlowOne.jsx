import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
import Switch from '../presentational/Switch.jsx'

const FlowOne = props => {
  const [question, setQuestion] = useState(0)
  const [haveFluValue, setHaveFluValue] = useState('')
  const [whoValue, setWhoValue] = useState('')

  const [havePhone, setHavePhoneValue] = useState('')
  const [under18, setunder18Value] = useState('')
  const [moreThanThree, setMoreThanThreeValue] = useState('')
  const [conditions, setConditionsValue] = useState('')
  const [pills, setPillsValue] = useState('')
  const [referrer, setReferrerValue] = useState('')


  useEffect(() => {
    setReferrerValue(props.referrerValue)
    if(props.referrerValue == "schools"){
      setQuestion(2)
    }else if(props.referrerValue == "households"){
      setQuestion(2)
    }
  }, [])

  function handleChange (event) {
    event.preventDefault()
    if (question == 0) {
      if (haveFluValue == 'yes') {
        setQuestion(1)
      } else if (haveFluValue == 'no') {
        setQuestion(2)
      } else {
        // props.handleNextError()
      }
    }
    if (question == 1) {
      if (whoValue == 'myself') {
        props.handleNext(2)
      } else if (whoValue == 'over18') {
        props.handleNext(3)
      } else if (whoValue == 'under18') {
        props.handleNext(4)
      } else {
        // props.handleNextError()
      }
    }

    if (question == 2) {
      if (havePhone == 'yes') {
        setQuestion(4)
      } else if(havePhone == 'no'){
        props.handleNextError(props.bouncePage5)
      }else{

      }
    }
    if (question == 3) {
      if (moreThanThree == 'yes') {
        setQuestion(3)
      } else if(moreThanThree == 'no'){
        props.handleNextError(props.bouncePage4)
      }else{

      }
    }
    if (question == 4) {
      if (under18 == 'yes' && referrer == "schools") {
        props.handleStudy(props.fluStudyPage6)
      }else if(under18 == 'yes' && referrer != "schools"){
        setQuestion(6)
      }else{
        props.handleNextError(props.bouncePage6)
      }
    }
    if (question == 5) {
      if (conditions == 'yes') {
        setQuestion(6)
      } else if(conditions == 'no'){
        props.handleStudy(props.fluStudyPage7)
      }else{

      }
    }

    if (question == 6) {
      if (pills == 'no') {
        props.handleStudy(props.bouncePage8)
      } else if(pills == 'yes'){
        props.handleStudy(props.fluStudyPage8)
      }else{

      }
    }
  }

  function handleSymptomsChange (event) {
    event.preventDefault()
    setHaveFluValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(1)
      setMoreThanThreeValue('')
      setWhoValue('')
      setHavePhoneValue('')
      setunder18Value('')
      setConditionsValue('')
      setPillsValue('')
    } else if (event.target.value == 'no') {
      setQuestion(2)
      setMoreThanThreeValue('')
      setWhoValue('')
      setHavePhoneValue('')
      setunder18Value('')
      setConditionsValue('')
      setPillsValue('')
    }
  }
  function handleWhoChange (event) {
    setWhoValue(event.target.value)
    setQuestion(1)
    if (event.target.value != 'none') {
      setQuestion(1)
    } else {
      props.handleNext(5)
    }
  }

  function handleMoreThanThreeChange (event) {
    event.preventDefault()
    setMoreThanThreeValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    } else if(event.target.value == 'no'){
      setQuestion(3)
      setunder18Value('')
      setConditionsValue('')
      setPillsValue('')
    }else{
      
    }
  }
  function handleHavePhoneChange (event) {
    event.preventDefault()
    setHavePhoneValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    } else if(event.target.value == 'no'){
      setQuestion(2)
      setMoreThanThreeValue('')
      setunder18Value('')
      setConditionsValue('')
      setPillsValue('')
    }else{
      
    }
  }
  function handleunder18Change (event) {
    event.preventDefault()
    setunder18Value(event.target.value)
    if (event.target.value == 'yes' && (referrer != 'schools' && referrer != 'households')) {
      setQuestion(6)
    }else if(event.target.value == 'no'){
      setQuestion(4)
      setConditionsValue('')
      setPillsValue('')

      }else{
      
    }
  }

  function handleConditionsChange (event) {
    event.preventDefault()
    setConditionsValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    } else if(event.target.value == 'no'){
      setQuestion(5)
      setPillsValue('')
    }else{
      
    }
  }
  function handlePillsChange (event) {
    event.preventDefault()
    setPillsValue(event.target.value)
    if (event.target.value == 'yes') {
      // setQuestion(question + 1)
    }else if(event.target.value == 'no'){
      setQuestion(6)
    }else{
      
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
    { value: 'over18', label: 'Someone in my household over 18' },
    { value: 'under18', label: 'My child or legal ward under 18' }
  ]

  return (
    <div className='col-12'>
      <h2>Screening Questionnaire</h2>
      {question >= 0 && (referrer != 'schools' && referrer != 'households') ? (
        <Switch
          text={props.question3}
          description={props.conditions3}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={haveFluValue}
          handleChange={handleSymptomsChange}
        />
      ) : null}
      {question == 1 && (referrer != 'schools' && referrer != 'households') ? (
        <Select
          text={props.question9}
          description=''
          label='whoFor'
          type='select'
          id='whoFor'
          value={whoValue}
          options={who}
          handleChange={handleWhoChange}
        />
      ) : null}
      {question >= 2 ? (
        <Switch
          text={props.question4}
          description=''
          label='havePhone'
          type='select'
          id='smartphone'
          value={havePhone}
          options={options}
          handleChange={handleHavePhoneChange}
        />
      ) : null}
      {question >= 3 ? (
        <Switch
          text={props.question5}
          description=''
          label='moreThanThree'
          type='select'
          id='moreThanThree'
          value={moreThanThree}
          options={options}
          handleChange={handleMoreThanThreeChange}
        />
      ) : null}

      {question >= 4 ? (
        <Switch
          text={props.question6}
          description=''
          label='under18'
          type='select'
          id='under18'
          value={under18}
          options={options}
          handleChange={handleunder18Change}
        />
      ) : null}

      {question == 5 ? (
        <Switch
          text={props.question7}
          description={props.conditions13}
          label='conditions'
          type='select'
          id='conditions'
          value={conditions}
          options={options}
          handleChange={handleConditionsChange}
        />
      ) : null}
      {question >= 6 ? (
        <Switch
          text={props.question8}
          description=''
          label='pills'
          type='select'
          id='pills'
          value={pills}
          options={options}
          handleChange={handlePillsChange}
        />
      ) : null}

      <button
        className='btn btn-primary float-right next'
        type='submit'
        onClick={handleChange}
      >
        Next
      </button>
    </div>
  )
}

export default FlowOne
