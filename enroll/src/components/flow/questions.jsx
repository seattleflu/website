import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from './presentational/Select.jsx'
import Switch from './presentational/Switch.jsx'
import One from './flowcomponents/One.jsx'
import Two from './flowcomponents/Two.jsx'


import ReactGA from 'react-ga';
import {Event} from './../../services/ga';


const Questions = props => {
  const [mainQuestion, setMainQuestion] = useState(0)
  const [referrer, setReferrerValue] = useState('')
  const [symptomsList, setSymptopmsList] = useState([])
  const[activeButton, setActiveButton] = useState(true)

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    ReactGA.pageview(' /enroll')
  }

  useEffect(() => {
    setReferrerValue(props.referrerValue)
    if(props.referrerValue == "schools"){
      setMainQuestion(1)
    }else if(props.referrerValue == "households"){
      setMainQuestion(1)
    }else if(props.referrerValue == "webmd"){
      setMainQuestion(1)
    }
  }, [])

  function handleChange (event) {
    event.preventDefault()
    if (mainQuestion == 0) {
      if(symptomsList.length == 0 || (symptomsList.length <= 1 && symptomsList.includes('None of the above'))){
        if(props.householdStudies){
          setMainQuestion(1)
        }else{
          props.handleNextError(props.bouncePage11)
        }
      }else if(symptomsList.length == 1 && symptomsList.includes('Cough')){
        setMainQuestion(2)
      }else if(symptomsList.length == 1){
        if(props.asymptomatic){
            props.handleStudy(props.fluStudyPage11)
          }else{
            props.handleNextError(props.bouncePage11)
        }
      }else if (
        symptomsList.length == 2 &&
        (symptomsList.includes('Chills or shivering') ||
          symptomsList.includes('Sweats'))
      ) {
        props.handleNextError(props.bouncePage11)
      } else if (
        symptomsList.length <= 3 &&
        symptomsList.includes('Chills or shivering') &&
        symptomsList.includes('Sweats')
      ) {
        setMainQuestion(2)
      } else {
        setMainQuestion(2)
      }
    }

  }


  function addSymptomOne (event) {
    setActiveButton(false)
    Event ('Enroll Screener', 'Current Flu Symptoms', event.target.value);
    if (mainQuestion >= 1 && mainQuestion < 7) {
      setMainQuestion(1)
      
    } else if(mainQuestion > 7){
      Event ('Enroll Screener', 'Current Flu Symptoms', event.target.value);
      setMainQuestion(2)
      
    }else{
      //setMainQuestion(1)
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
      if(array.length == 0){
        setActiveButton(true)
      }
    } else {
      setSymptopmsList([...symptomsList, event.target.value])
    }
  }

  function addSymptomRemove (event) {
    if(symptomsList.includes('None of the above')){
    setActiveButton(true)
    }else{
    setActiveButton(false)
    }
     
     console.log(event.target.value)
    setSymptopmsList([event.target.value])
    Event ('Enroll Screener', 'Current Flu Symptoms', 'None');
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
      {mainQuestion == 0 ? <p className="intro">{props.introTwo}</p> : null}
      {mainQuestion == 1 ? <p className="intro">{props.introThree}</p> : null}
      {mainQuestion == 2 ? <p className="intro">{props.introFour}</p> : null}
      {mainQuestion == 0 ? <p className="steps">Step 2 of 3</p> : null}
      {mainQuestion == 1 ? <p className="steps">Step 3 of 3</p> : null}
      {mainQuestion == 2 ? <p className="steps">Step 3 of 3</p> : null}
      {mainQuestion <= 0  && (referrer != 'schools' && referrer != 'households') ? (
        
        <div className='col-12 selectSymptoms'>
          
            <label htmlFor="symptoms" data-children-count="0">{props.fistPersonValue ? props.question11 : props.question18}</label>
            <p className='inputDescription'>{props.fistPersonValue ? props.conditions11 : props.conditions18}</p>
            <div className="symptom-wrapper">
              <div className='symptom noSymptoms col-md-12 col-lg-12'>
              <label>
                <input
                  type='checkbox'
                  name='NoneOfTheAbove1'
                  value='None of the above'
                  onChange={addSymptomRemove}
                />
                {props.fistPersonValue ? 'I':'They'} currently do not have any symptoms
                </label>
                <br />
              </div>
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
            </div>
            
        </div>
      ) : null}
      

      {mainQuestion == 1 ? (<One 
      referrerValue={props.referrerValue}
        handleStudy={props.handleStudy}
        handleNextError={props.handleNextError}
        fluStudyPage2={props.fluStudyPage2}
        question4={props.question4}
        conditions4={props.conditions4}
        bouncePage4={props.bouncePage4}
        fluStudyPage4={props.fluStudyPage4}
        question5={props.question5}
        conditions5={props.conditions5}
        bouncePage5={props.bouncePage5}
        fluStudyPage5={props.fluStudyPage5}
        question6={props.question6}
        conditions6={props.conditions6}
        bouncePage6={props.bouncePage6}
        fluStudyPage6={props.fluStudyPage6}
        question7={props.question7}
        conditions7={props.conditions7}
        bouncePage7={props.bouncePage7}
        fluStudyPage7={props.fluStudyPage7}
        question8={props.question8}
        conditions8={props.conditions8}
        bouncePage8={props.bouncePage8}
        fluStudyPage8={props.fluStudyPage8}
        hhIntervention={props.hhIntervention}
        householdStudies={props.householdStudies}
        asymptomatic={props.asymptomatic}
      />):(null)}
      {mainQuestion == 2 ? (<Two 
        fistPersonValue={props.fistPersonValue}
        handleStudy={props.handleStudy}
        handleNextError={props.handleNextError}
        question10={props.question10}
        conditions10={props.conditions10}
        bouncePage10={props.bouncePage10}
        fluStudyPage10={props.fluStudyPage10}
        question12={props.question12}
        conditions12={props.conditions12}
        bouncePage={props.bouncePage}
        fluStudyPage={props.fluStudyPage}
        question15={props.question15}
        conditions15={props.conditions15}
        bouncePage15={props.bouncePage15}
        fluStudyPage15={props.fluStudyPage15}
        question14={props.question14}
        conditions14={props.conditions14}
        bouncePage14={props.bouncePage14}
        fluStudyPage14={props.fluStudyPage14}
        hhIntervention={props.hhIntervention}
        householdStudies={props.householdStudies}
      />) : (null)}
      
      {mainQuestion == 0 ? (
      <button
        className='btn btn-primary float-right next'
        type='submit'
        onClick={handleChange}
        disabled={activeButton}
      >
        Next
      </button>
      ) : (null)}
    </div>
  )
}

export default Questions
