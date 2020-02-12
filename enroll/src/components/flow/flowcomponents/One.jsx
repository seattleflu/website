import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
import Switch from '../presentational/Switch.jsx'
import ReactGA from 'react-ga';
import {Event} from '../../../services/ga';

const One = props => {
  const [oneQuestion, setOneQuestion] = useState(0)
  const[question4, setQuestion4] = useState('')
  const[question5, setQuestion5] = useState('')
  const[question6, setQuestion6] = useState('')
  const[question7, setQuestion7] = useState('')
  const[question8, setQuestion8] = useState('')
  const[activeButton, setActiveButton] = useState(true)

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    ReactGA.pageview(' /enroll')
  }

  useEffect(() => {
    initializeReactGA ();
  }, [activeButton])


  function handleOneChange (event) {
    event.preventDefault()
    
    if (oneQuestion == 0) {
      if (question4 == 'yes') {
        setOneQuestion(1)
      }  else {
        if(props.asymptomatic){
          props.handleStudy(props.fluStudyPage2)
        }else{
          props.handleNextError(props.bouncePage4)
        }
      }
    }

    if (oneQuestion == 1) {
      if (question5 == 'yes') {
        setOneQuestion(2)
      }  else {
          if(props.asymptomatic){
            props.handleStudy(props.fluStudyPage2)
          }else{
            props.handleNextError(props.bouncePage5)
          }
        
      }
    }

    if (oneQuestion == 2) {
      if (question6 == 'yes' && props.referrerValue == 'schools') {
        props.handleStudy(props.fluStudyPage7)
       
      }  else if (question6 == 'yes' && props.referrerValue != 'schools'){
        if(props.hhIntervention){
          setOneQuestion(3)
        }else{
          props.handleStudy(props.fluStudyPage7)
        }
        
      }else{
         if(props.asymptomatic){
            props.handleStudy(props.fluStudyPage2)
          }else{
            props.handleNextError(props.bouncePage6)
          }
      }
    }

    if (oneQuestion == 3) {
      if (question8 == 'yes') {
        props.handleStudy(props.fluStudyPage8)
        //props.handleNextError(props.fluStudyPage8)
      }else {
            props.handleStudy(props.bouncePage8)
          
      }
    }

    


  }


function question4Value (event) {
    event.preventDefault()
    setQuestion4(event.target.value)
    if (event.target.value == 'yes') {
      setActiveButton(true)
      Event ('Enroll Screener', 'Smartphone', event.target.value);
      setOneQuestion(1)
    }else if(event.target.value == 'no'){
      setActiveButton(false)
      setOneQuestion(0)
      setQuestion5('')
      setQuestion6('')
      setQuestion7('')
      setQuestion8('')
    } else{
      Event ('Enroll Screener', 'Smartphone', event.target.value);
      setOneQuestion(oneQuestion + 1)
    }
  }

  function question5Value (event) {
    event.preventDefault()
    setQuestion5(event.target.value)
    if (event.target.value == 'yes') {
      setActiveButton(true)
       Event ('Enroll Screener', 'HH_3 people', event.target.value);
      setOneQuestion(2)
    }else if(event.target.value == 'no'){
      Event ('Enroll Screener', 'HH_3 people', event.target.value);
      setActiveButton(false)
      setOneQuestion(1)
      setQuestion6('')
      setQuestion7('')
      setQuestion8('')
    } else{
      Event ('Enroll Screener', 'HH_3 people', event.target.value);
      setOneQuestion(oneQuestion + 1)
    }
  }

  function question6Value (event) {
    event.preventDefault()
    setQuestion6(event.target.value)
    if (event.target.value == 'yes'&& props.referrerValue != 'schools') {
      setActiveButton(true)
      Event ('Enroll Screener', 'HH_People 18 & under', event.target.value);
      if(props.hhIntervention){
        setOneQuestion(3)
      }else{
      setActiveButton(false)
      setOneQuestion(2)
      setQuestion7('')
      setQuestion8('')
      }
      
      
    }else if(event.target.value == 'yes' && props.referrerValue == 'schools'){
      Event ('Enroll Screener', 'HH_People 18 & under', event.target.value);
      setActiveButton(false)
    }else if(event.target.value == 'no'){
      Event ('Enroll Screener', 'HH_People 18 & under', event.target.value);
      setActiveButton(false)
      setOneQuestion(2)
      setQuestion7('')
      setQuestion8('')
    } else{
      Event ('Enroll Screener', 'HH_People 18 & under', event.target.value);
      setOneQuestion(oneQuestion + 1)
    }
  }

  
  function question8Value (event) {
    event.preventDefault()
    setQuestion8(event.target.value)
    if (event.target.value == 'yes') {
      setActiveButton(false)
      Event ('Enroll Screener', 'HH_Baloxavir pills', event.target.value);
      setOneQuestion(3)
    }else if(event.target.value == 'no'){
      setActiveButton(false)
      setOneQuestion(3)
    } else{
      Event ('Enroll Screener', 'HH_Baloxavir pills', event.target.value);
      //setOneQuestion(oneQuestion + 1)
    }
  }



const optionsYesNo = [
    { value: 'none', label: '' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ]

  return (
    <div className='col-12'>
    
    
    {oneQuestion >= 0 ? (
      <Switch
          text={props.question4}
          description={props.conditions4}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={question4}
          options={optionsYesNo}
          handleChange={question4Value}
          
        />):(null)}
        {oneQuestion >= 1 ? (
        <Switch
          text={props.question5}
          description={props.conditions5}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={question5}
          options={optionsYesNo}
          handleChange={question5Value}
          
        />):(null)}
        {oneQuestion >= 2 ? (
        <Switch
          text={props.question6}
          description={props.conditions6}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={question6}
          options={optionsYesNo}
          handleChange={question6Value}
          
        />):(null)}
        
        {oneQuestion >= 3 ? (
        <Switch
          text={props.question8}
          description={props.conditions8}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={question8}
          options={optionsYesNo}
          handleChange={question8Value}
          
        />):(null)}
        <button
        className='btn btn-primary float-right next'
        type='submit'
        onClick={handleOneChange}
        disabled={activeButton}
      >
        NEXT
      </button>
    </div>
  )
}
export default One
