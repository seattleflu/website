import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
import Switch from '../presentational/Switch.jsx'
import ReactGA from 'react-ga';
import {Event} from '../../../services/ga';

const Two = props => {
  const [twoQuestion, setTwoQuestion] = useState(0)
  const[activeButton, setActiveButton] = useState(true)
  const[question10, setQuestion10] = useState('')
  const[question12, setQuestion12] = useState('')
  const[question15, setQuestion15] = useState('')
  const[question14, setQuestion14] = useState('')
  
  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    ReactGA.pageview(' /enroll')
  }

  useEffect(() => {
    initializeReactGA ();
  }, [])

  function handleTwoChange (event) {
    event.preventDefault()
    
    if (twoQuestion == 0) {
      if (question10 == 'moreThan7d') {
        props.handleNextError(props.bouncePage10)
      }  else {
        setTwoQuestion(2)
      }
    }

    if (twoQuestion == 1) {
      if (question12 == 'yes') {
        //setTwoQuestion(2)
      }  else {
        //props.handleNextError(props.bouncePage4)
      }
    }

    
    if (twoQuestion == 2) {
      if (question14 == 'yes') {
        props.handleStudy(props.fluStudyPage14)
      }  else {
        props.handleNextError(props.bouncePage14)
      }
    }
  }

  function question10Value(event){
     event.preventDefault()
    setQuestion10(event.target.value)
    if (event.target.value == 'moreThan7d') {
      Event ('Enroll Screener', 'Symptom length', event.target.value);
      setActiveButton(false)
      setQuestion(0)
      setQuestion12('')
        setQuestion15('')
        setQuestion14('')
    } else {
      Event ('Enroll Screener', 'Symptom length', event.target.value);
      setQuestion12('')
        setQuestion15('')
        setQuestion14('')
      setTwoQuestion(2)
      setActiveButton(true)
    }
  }
  function question12Value(event){
     event.preventDefault()
    
  }
  function question15Value(event){
     event.preventDefault()
    
  }
  function question14Value(event){
     event.preventDefault()
    setQuestion14(event.target.value)
    if (event.target.value == 'yes') {
      setActiveButton(false)
      Event ('Enroll Screener', 'Internet Device', event.target.value);
    } else {
      setActiveButton(false)
      Event ('Enroll Screener', 'Internet Device', event.target.value);
      
    }
  }

  const options = [
    { value: 'none', label: '' },
    { value: 'lessThan7d', label: 'Less than 7 Days' },
    
    { value: 'moreThan7d', label: '7 Days or more' }
  ]

  const optionsYesNo = [
    { value: 'none', label: '' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ]

  return (
    <div className='col-12'>
      
      {twoQuestion >= 0 && props.fistPersonValue == true ? (
      <Select
          text={props.question10}
          description={props.conditions10}
          label='symptoms'
          type='select'
          id='symptoms'
          options={options}
          value={question10}
          handleChange={question10Value}
          
         />):(null)}
       {twoQuestion >= 0 && props.fistPersonValue == false ? (
         <Select
          text={props.question15}
          description={props.conditions15}
          label='symptoms'
          type='select'
          id='symptoms'
          options={options}
          value={question10}
          handleChange={question10Value}
        />):(null)}
         
         {twoQuestion == 1 ? (
        <Switch
          text={props.question12}
          description={props.conditions12}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={question12}
          options={optionsYesNo}
          handleChange={question12Value}
          
        />):(null)}
        
        {twoQuestion >= 2 ? (
        <Switch
          text={props.question14}
          description={props.conditions14}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={question14}
          options={optionsYesNo}
          handleChange={question14Value}
          
        />):(null)}
        <button
        className='btn btn-primary float-right next'
        type='submit'
        onClick={handleTwoChange}
        disabled={activeButton}
        
      >
        NEXT
      </button>
    </div>
  )
}
export default Two
