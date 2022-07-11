import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
import Switch from '../presentational/Switch.jsx'
import ReactGA from 'react-ga';
import {Event} from '../../services/ga';

const FlowFour = props => {
  const [question, setQuestion] = useState(0)
  const [howlongValue, setHowlongValue] = useState('')
  const [connectedValue, setconnectedValue] = useState('')
  const [conditionsValue, setConditionsValue] = useState('')
  const [symptomsList, setSymptopmsList] = useState([])

  const [deviceValue, setDeviceValue] = useState('')
  
  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    //ReactGA.pageview(' /enroll')
  }

  useEffect(() => {
    initializeReactGA ();
  }, [])

  function handleDuration (event) {
    setHowlongValue(event.target.value)
    if (question != 0) {
      setQuestion(0)
      setconnectedValue()
      setConditionsValue('')
      setSymptopmsList([])
    }
    if (event.target.value == 'lessThan72h') {
      Event ('Enroll Screener', 'Symptom Length', event.target.value);
      setQuestion(1)
    } else if (event.target.value == 'moreThan72hAndLessThan7d') {
      Event ('Enroll Screener', 'Symptom Length', event.target.value);
      setQuestion(7)
    } else {
      Event ('Enroll Screener', 'Symptom Length', event.target.value);
      // props.handleNextError(1)
    }
  }

  function handleconnectedOne (event) {
    event.preventDefault()
    setconnectedValue(event.target.value)
    if (event.target.value == 'yes') {
      Event ('Enroll Screener', 'Internet Device', event.target.value);
      //setQuestion(question + 1)
    } else {
      Event ('Enroll Screener', 'Internet Device', event.target.value);
      setConditionsValue('')
      setQuestion(2)
    }
  }
  function handleconnectedTwo (event) {
    event.preventDefault()
    setconnectedValue(event.target.value)
    if (event.target.value == 'yes') {
      Event ('Enroll Screener', 'Internet Device', event.target.value);
      //setQuestion(question + 1)
    } else {
      Event ('Enroll Screener', 'Internet Device', event.target.value);
      setConditionsValue('')
      setQuestion(5)
    }
  }
  function handleconnectedThree (event) {
    event.preventDefault()
    setconnectedValue(event.target.value)
    if (event.target.value == 'yes') {
      Event ('Enroll Screener', 'Internet Device', event.target.value);
      //setQuestion(question + 1)
    } else {
      Event ('Enroll Screener', 'Internet Device', event.target.value);
      setConditionsValue('')
      setQuestion(8)
    }
  }
  function handleConditions (event) {
    event.preventDefault()
    setConditionsValue(event.target.value)
  }

  function handleDeviceValue (event) {
    event.preventDefault()
    setDeviceValue(event.target.value)
    if (event.target.value == 'yes') {
      Event ('Enroll Screener', 'Smartphone', event.target.value);
      setQuestion(4)
    } else {
      Event ('Enroll Screener', 'Smartphone', event.target.value);
      setQuestion(question + 1)
    }
  }

  function handleNext (event) {
    event.preventDefault()
    if (question == 0) {
      if (howlongValue == 'lessThan72h') {
        setQuestion(question + 1)
      } else if (howlongValue == 'moreThan72hAndLessThan7d') {
        setQuestion()
      } else {
        props.handleNextError(props.bouncePage10)
      }
    }
    if (question == 1) {
      if(symptomsList.length <= 1){
        props.handleNextError(props.bouncePage18)
      }else if (
        symptomsList.length <= 2 &&
        (symptomsList.includes('Chills or shivering') ||
          symptomsList.includes('Sweats'))
      ) {
        props.handleNextError(props.bouncePage18)
      } else if (
        symptomsList.length <= 3 &&
        symptomsList.includes('Chills or shivering') &&
        symptomsList.includes('Sweats')
      ) {
        props.handleNextError(props.bouncePage18)
      } else {
        setQuestion(2)
      }
    }

    if (question == 2) {
      if (connectedValue == 'no') {
        Event ('Enroll Screener', 'Internet Device', connectedValue);
        props.handleNextError(props.bouncePage12)
      } else if (connectedValue == 'yes') {
        Event ('Enroll Screener', 'Internet Device', connectedValue);
        //setQuestion(2)
        props.handleStudy(props.fluStudyPage12)
      }else{

      }
    }
    if (question == 3) {
      if (conditionsValue == 'no') {
        props.handleStudy(props.fluStudyPage17)
      } else if (conditionsValue == 'yes'){
        props.handleNextError(props.bouncePage17)
      }else{

      }
    }
    if (question == 4) {
      if (deviceValue == 'no') {
        Event ('Enroll Screener', 'Smartphone', deviceValue);
        setQuestion(question + 1)
      } else if (deviceValue == 'yes'){
        Event ('Enroll Screener', 'Smartphone', deviceValue);
        props.handleNextError(props.bouncePage12)
      }else{

      }
    }
    if (question == 5) {
      if (deviceValue == 'no') {
        Event ('Enroll Screener', 'Smartphone', deviceValue);
        props.handleNextError(props.bouncePage12)
      } else if (deviceValue == 'yes'){
        Event ('Enroll Screener', 'Smartphone', deviceValue);
        //setQuestion(question + 1)
        props.handleStudy(props.fluStudyPage12)
      }else{

      }
    }
    if (question == 6) {
      if (conditionsValue == 'no') {
        props.handleStudy(props.fluStudyPage17)
      } else if (conditionsValue == 'yes'){
        props.handleNextError(props.bouneePage17)
      }else{

      }
    }

    if (question == 7) {
      if(symptomsList.length <= 1){
        props.handleNextError(props.bouncePage18)
      }else if (
        symptomsList.length <= 2 &&
        (symptomsList.includes('Chills or shivering') ||
          symptomsList.includes('Sweats'))
      ) {
        props.handleNextError(props.bouncePage18)
      } else if (
        symptomsList.length <= 3 &&
        symptomsList.includes('Chills or shivering') &&
        symptomsList.includes('Sweats')
      ) {
        props.handleNextError(props.bouncePage18)
      } else {
        setQuestion(8)
      }
    }
    if (question == 8) {
      if (connectedValue == 'no') {
        Event ('Enroll Screener', 'Internet Device', connectedValue);
        props.handleNextError(props.bouncePage12)
      } else if (connectedValue == 'yes'){
        Event ('Enroll Screener', 'Internet Device', connectedValue);
        //setQuestion(question + 1)
        props.handleStudy(props.fluStudyPage12)
      }else{

      }
    }
    if (question == 9) {
      if (conditionsValue == 'no') {
        props.handleStudy(props.fluStudyPage17)
      } else if (conditionsValue == 'yes'){
        props.handleNextError(props.bouncePage17)
      }else{

      }
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
  function addSymptomOne (event) {
    Event ('Enroll Screener', 'Current Flu Symptoms', event.target.value);
    if (question > 1 && question < 7) {
      setQuestion(1)
      setconnectedValue('')
      setConditionsValue('')
    } else if(question > 7){
      Event ('Enroll Screener', 'Current Flu Symptoms', event.target.value);
      setQuestion(7)
      setconnectedValue('')
      setConditionsValue('')
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
      <h2>Screening Questionnaire</h2>
      {question >= 0 ? (
        <Select
          text={props.question15}
          description=''
          label='symptoms'
          type='select'
          id='symptoms'
          value={howlongValue}
          options={options}
          handleChange={handleDuration}
        />
      ) : null}

      {question >= 1 && question < 7 ? (
        <div className='col-12 selectSymptoms'>
          <div className='row'>
            <p>{props.question18}</p>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
                <input
                  type='checkbox'
                  name='test1'
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
                name='test2'
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
                  name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
                value='Diarrhea'
                onChange={addSymptomOne}
              />
              Diarrhea
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='test3'
                value='Ear pain/ear discharge'
                onChange={addSymptomOne}
              />
              Ear pain/ear discharge
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='test3'
                value='Rash'
                onChange={addSymptomOne}
              />
              Rash
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='test3'
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

      {question >= 2 && question < 4 ? (
        <Switch
          text={props.question12}
          description=''
          label='connected'
          type='select'
          id='connected'
          value={connectedValue}
          options={optionsYesNo}
          handleChange={handleconnectedOne}
        />
      ) : null}
      {question >= 3 && question < 4 ? (
        <Switch
          text={props.question17}
          description={props.conditions17}
          label='conditions'
          type='select'
          id='conditions'
          value={conditionsValue}
          options={optionsYesNo}
          handleChange={handleConditions}
        />
      ) : null}

      {question >= 4 && question < 7 ? (
        <Switch
          text={props.question16}
          description=''
          label='device'
          type='select'
          id='device'
          value={deviceValue}
          options={optionsYesNo}
          handleChange={handleDeviceValue}
        />
      ) : null}

      {question >= 5 && question < 7 ? (
        <Switch
          text={props.question12}
          description=''
          label='connected'
          type='select'
          id='connected'
          value={connectedValue}
          options={optionsYesNo}
          handleChange={handleconnectedTwo}
        />
      ) : null}
      {question >= 6 && question < 7 ? (
        <Switch
          text={props.question17}
          description={props.conditions17}
          label='conditions'
          type='select'
          id='conditions'
          value={conditionsValue}
          options={optionsYesNo}
          handleChange={handleConditions}
        />
      ) : null}

      {question >= 7 ? (
        <div className='col-12 selectSymptoms'>
          <div className='row'>
            <p>{props.question18}</p>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
                <input
                  type='checkbox'
                  name='test1'
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
                name='test2'
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
                  name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
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
                name='test3'
                value='Diarrhea'
                onChange={addSymptomOne}
              />
              Diarrhea
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='test3'
                value='Ear pain/ear discharge'
                onChange={addSymptomOne}
              />
              Ear pain/ear discharge
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='test3'
                value='Rash'
                onChange={addSymptomOne}
              />
              Rash
              </label>
              <br />
            </div>
            <div className='symptom col-md-6 col-lg-4'>
            <label>
              <input
                type='checkbox'
                name='test3'
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

      {question >= 8 ? (
        <Switch
          text={props.question12}
          description=''
          label='connected'
          type='select'
          id='connected'
          value={connectedValue}
          options={optionsYesNo}
          handleChange={handleconnectedThree}
        />
      ) : null}

      {question >= 9 ? (
        <Switch
          text={props.question17}
          description={props.conditions17}
          label='conditions'
          type='select'
          id='conditions'
          value={conditionsValue}
          options={optionsYesNo}
          handleChange={handleConditions}
        />
      ) : null}

      <button
        className='btn btn-primary float-right next'
        type='submit'
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  )
}
export default FlowFour
