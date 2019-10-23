import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from './presentational/Select.jsx'
import Switch from './presentational/Switch.jsx'
import One from './flowcomponents/One.jsx'
import Two from './flowcomponents/Two.jsx'


import ReactGA from 'react-ga';
import {Event} from './../../services/ga';


const Questions = props => {
  const [question, setQuestion] = useState(0)
  const [haveFluValue, setHaveFluValue] = useState('')
  const [whoValue, setWhoValue] = useState('')

  const [havePhone, setHavePhoneValue] = useState('')
  const [under18, setunder18Value] = useState('')
  const [moreThanThree, setMoreThanThreeValue] = useState('')
  const [conditions, setConditionsValue] = useState('')
  const [pills, setPillsValue] = useState('')
  const [referrer, setReferrerValue] = useState('')

  const [symptomsList, setSymptopmsList] = useState([])

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    //ReactGA.pageview(' /enroll')
  }


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
        Event ('Enroll Screener', 'Currently Sick', haveFluValue);
        setQuestion(1)
      } else if (haveFluValue == 'no') {
        Event ('Enroll Screener', 'Currently Sick', haveFluValue);
        setQuestion(3)
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
        props.handleNext(3)
      } else {
        // props.handleNextError()
      }
    }

  }

  function handleSymptomsChange (event) {
    event.preventDefault()
    setHaveFluValue(event.target.value)
    if (event.target.value == 'yes') {
      Event ('Enroll Screener', 'Currently Sick', event.target.value);
      setQuestion(1)
      setMoreThanThreeValue('')
      setWhoValue('')
      setHavePhoneValue('')
      setunder18Value('')
      setConditionsValue('')
      setPillsValue('')
    } else if (event.target.value == 'no') {
      Event ('Enroll Screener', 'Currently Sick', event.target.value);
      setQuestion(3)
      setMoreThanThreeValue('')
      setWhoValue('')
      setHavePhoneValue('')
      setunder18Value('')
      setConditionsValue('')
      setPillsValue('')
    }
  }
  function handleWhoChange (event) {
    Event ('Enroll Screener', 'Participent info', event.target.value);
    setWhoValue(event.target.value)
    setQuestion(1)
    if (event.target.value != 'none') {
      Event ('Enroll Screener', 'Participent info', event.target.value);
      setQuestion(1)
    } else {
      props.handleNext(5)
    }
  }

  

  function addSymptomOne (event) {
    Event ('Enroll Screener', 'Current Flu Symptoms', event.target.value);
    if (question >= 1 && question < 7) {
      setQuestion(1)
      
    } else if(question > 7){
      Event ('Enroll Screener', 'Current Flu Symptoms', event.target.value);
      setQuestion(2)
      
    }else{
      //setQuestion(1)
    }
    const array = [...symptomsList]

    var index = array.indexOf(event.target.value)
    var noneOfTheAbove = array.indexOf('None of the above')

    if (noneOfTheAbove == 0) {
      array.splice(array[noneOfTheAbove], 1)
      document.querySelectorAll('input[type=checkbox]').forEach(el => {
        if (el.value == 'None of the above') {
          el.checked = false
        } else {
        }
      })
    }

    if (index != -1) {
      array.splice(index, 1)
      setSymptopmsList(array)
    } else {
      setSymptopmsList([...symptomsList, event.target.value])
    }
  }

  function addSymptomRemove (event) {
    setSymptopmsList([event.target.value])
    document.querySelectorAll('input[type=checkbox]').forEach(el => {
      if (el.value == event.target.value) {
      } else {
        el.checked = false
      }
    })
  }
  

  const options = [
    { value: 'none', label: '' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ]

  
  

  return (
    <div className='col-12'>
      <h2>Screening Questionnaire</h2>
      {question >= 0 && (referrer != 'schools' && referrer != 'households') ? (
        <Switch
          text={props.question3}
          description={question == 0 ? props.conditions3 : null}
          label='symptoms'
          type='select'
          id='symptomsTest'
          value={haveFluValue}
          handleChange={handleSymptomsChange}
        />
      ) : null}
      
      {question >= 1 && question <+ 2 ? (
        <div className='col-12 selectSymptoms'>
          <div className='row'>
            <p>{props.question11}</p>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='FeelingFeverish1'
                value='Feeling feverish'
                onChange={addSymptomOne}
              />
              Feeling feverish
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='Headache1'
                value='Headache'
                onChange={addSymptomOne}
              />
              Headache
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='Cough1'
                value='Cough'
                onChange={addSymptomOne}
              />
              Cough
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='ChillsOrShivering1'
                value='Chills or shivering'
                onChange={addSymptomOne}
              />
              Chills or shivering
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='Sweats'
                value='Sweats'
                onChange={addSymptomOne}
              />
              Sweats
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='SoreThroatOrItchyScratchyThroat1'
                value='Sore throat or itchy/scratchy throat'
                onChange={addSymptomOne}
              />
              Sore throat or itchy/scratchy throat
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='NauseaOrVomiting1'
                value='Nausea or vomiting'
                onChange={addSymptomOne}
              />
              Nausea or vomiting
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='RunnyOrStuffyNose1'
                value='Runny or stuffy nose'
                onChange={addSymptomOne}
              />
              Runny or stuffy nose
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='FeelingMoreTiredThanUsual1'
                value='Feeling more tired than usual'
                onChange={addSymptomOne}
              />
              Feeling more tired than usual
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='MuscleOrBodyAches1'
                value='Muscle or body aches'
                onChange={addSymptomOne}
                
              />
              Muscle or body aches
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='IncreasedTroubleWithBreathing1'
                value='Increased trouble with breathing'
                onChange={addSymptomOne}
                
              />
              Increased trouble with breathing
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='NoneOfTheAbove1'
                value='None of the above'
                onChange={addSymptomRemove}
              />
              None of the above
              </label>
              <br />
            </div>
          </div>
        </div>
      ) : null}
      

      {question == 2 ? (<One />):(null)}
      {question == 3 ? (<Two />) : (null)}
      
      
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

export default Questions
