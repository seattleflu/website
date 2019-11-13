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
    //ReactGA.pageview(' /enroll')
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
      setQuestion(0)
      setQuestion12('')
        setQuestion15('')
        setQuestion14('')
      setActiveButton(true)
    } else {
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
    } else {
      setActiveButton(false)
    }
  }

  const options = [
    { value: 'none', label: '' },
    { value: 'lessThan72h', label: 'Less than 72 hours' },
    {
      value: 'moreThan72hAndLessThan7d',
      label: 'More than 72 hours, but less than 7 days'
    },
    { value: 'moreThan7d', label: '7 Days or more' }
  ]

  const optionsYesNo = [
    { value: 'none', label: '' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ]

  return (
    <div className='col-12'>
      <p class="steps">Step 3 of 3</p>
      {twoQuestion >= 0 && props.fistPersonValue == true ? (
      <Select
          text={props.question10}
          description=''
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
          description=''
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
