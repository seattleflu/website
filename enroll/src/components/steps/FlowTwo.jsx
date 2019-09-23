import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
import Switch from '../presentational/Switch.jsx'

const FlowTwo = props => {
  const [question, setQuestion] = useState(0)
  const [howlongValue, setHowlongValue] = useState('')
  const [connectedValue, setconnectedValue] = useState('')
  const [conditionsValue, setConditionsValue] = useState('')
  const [symptomsList, setSymptopmsList] = useState([])

  const [deviceValue, setDeviceValue] = useState('')

  useEffect(() => {})

  function handleDuration (event) {
    setHowlongValue(event.target.value)
    if (question != 0) {
      setQuestion(0)
    }
    if (event.target.value == 'lessThan72') {
      setQuestion(1)
      console.log(event.target.value)
    } else if (event.target.value == 'moreThanandlessthan') {
      setQuestion(7)
      console.log(event.target.value)
    } else {
      // props.handleNextError(props.bouncepage10)
    }
  }

  function handleconnectedOne (event) {
    event.preventDefault()
    setconnectedValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    } else {
      setConditionsValue('')
      setQuestion(2)
    }
  }
  function handleconnectedTwo (event) {
    event.preventDefault()
    setconnectedValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    } else {
      setConditionsValue('')
      setQuestion(5)
    }
  }
  function handleconnectedThree (event) {
    event.preventDefault()
    setconnectedValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(question + 1)
    } else {
      setConditionsValue('')
      setQuestion(8)
    }
  }
  function handleConditions (event) {
    event.preventDefault()
    setConditionsValue(event.target.value)
    if (event.target.value == 'yes') {
      // props.handleStudy(props.fluStudyPage13)
    } else {
      // props.handleNextError(props.bouncepage13)
    }
  }

  function handleDeviceValue (event) {
    event.preventDefault()
    setDeviceValue(event.target.value)
    if (event.target.value == 'yes') {
      setQuestion(4)
    } else {
      setQuestion(question + 1)
    }
  }

  function handleNext (event) {
    event.preventDefault()
    if (question == 0) {
      if (howlongValue == 'lessThan72') {
        setQuestion(question + 1)
      } else if (howlongValue == 'moreThanandlessthan') {
        setQuestion(7)
      } else {
        props.handleNextError(props.bouncePage10)
      }
    }
    if (question == 1) {
      if (symptomsList.length <= 2 &&
          (symptomsList.includes('Chills or shivering') ||
            symptomsList.includes('Sweats'))){
              props.handleNextError(props.bouncePage11)
      } else if (
        symptomsList.length <= 3 &&
        symptomsList.includes('Chills or shivering') &&
        symptomsList.includes('Sweats')
      ) {
        setQuestion(4)
      } else {
        setQuestion(2)
      }
    }

    if (question == 2) {
      if (connectedValue == 'no') {
        props.handleNextError(props.bouncePage12)
      } else {
        setQuestion(2)
      }
    }
    if (question == 3) {
      if (conditionsValue == 'yes') {
        props.handleNextError(props.bouncePage13)
      } else {
        // props.handleNext(3)
        // props.handleNextError(props.fluStudyPage13)
        props.handleStudy(props.fluStudyPage13)
      }
    }
    if (question == 4) {
      if (deviceValue == 'no') {
        setQuestion(question + 1)
      } else {
        props.handleNextError(props.bouncePage16)
      }
    }
    if (question == 5) {
      if (deviceValue == 'no') {
        props.handleNextError(props.bouncePage16)
      } else {
        setQuestion(question + 1)
      }
    }
    if (question == 6) {
      if (conditionsValue == 'no') {
        props.handleStudy(props.fluStudyPage13)
      } else {
        props.handleNextError(props.bouncePage13)
      }
    }
    if (question == 7) {
      if (
        symptomsList.length <= 2 &&
        (symptomsList.includes('Chills or shivering') ||
          symptomsList.includes('Sweats'))
      ) {
        props.handleNextError(props.bouncePage11)
      } else if (
        symptomsList.length <= 3 &&
        symptomsList.includes('Chills or shivering') &&
        symptomsList.includes('Sweats')
      ) {
        props.handleNextError(props.bouncePage11)
        
      } else {
        setQuestion(8)
      }
    }

    if (question == 8) {
      if (connectedValue == 'no') {
        props.handleNextError(props.bouncePage12)
      } else {
        setQuestion(question + 1)
      }
    }
    if (question == 9) {
      if (conditionsValue == 'no') {
        props.handleNextError(props.bouncePage3)
      } else {
        // props.handleNextError(props.fluStudyPage3)
        props.handleStudy(props.fluStudyPage3)
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
    if (question != 1) {
      setQuestion(1)
      setconnectedValue('')
      setConditionsValue('')
    }
    const array = [...symptomsList]

    var index = array.indexOf(event.target.value)
    var noneOfTheAbove = array.indexOf('None of the above')
    console.log(array.indexOf('None of the above'))

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
      console.log(symptomsList)
    }
  }

  function addSymptomTwo (event) {
    if (question != 7) {
      setQuestion(7)
      setconnectedValue('')
      setConditionsValue('')
    }
    const array = [...symptomsList]

    var index = array.indexOf(event.target.value)
    var noneOfTheAbove = array.indexOf('None of the above')
    console.log(array.indexOf('None of the above'))

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
      setSymptopmsList([array, event.target.value])
      console.log(symptomsList)
    }
  }

  const options = [
    { value: 'none', label: '' },
    { value: 'lessThan72', label: 'Less than 72 hours' },
    {
      value: 'moreThanandlessthan',
      label: 'Less that 72 hours, but less than 7 days'
    },
    { value: 'moreThan7', label: '7 Days or more' }
  ]
  const optionsYesNo = [
    { value: 'none', label: '' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ]

  return (
    <div className='col-12'>
      <h2>Screening Questionnaire (Myself)</h2>
      {question >= 0 ? (
        <Select
          text={props.question10}
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
        <div classname='col-12 selectSymptoms'>
          <div className='row'>
            <div className='col-12'>
              <p>{props.question11}</p>
              <div className='symptom col-4'>
                <label>
                  <input
                    type='checkbox'
                    name='test1'
                    value='Feeling Feverish'
                    onChange={addSymptomOne}
                  />
                  Feeling Feverish
                </label>
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test2'
                  value='Headache'
                  onChange={addSymptomOne}
                />
                Headache
                <br />
              </div>
              <div className='symptom col-4'>
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
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Chills or shivering'
                  onChange={addSymptomOne}
                />
                Chills or shivering
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Sweats'
                  onChange={addSymptomOne}
                />
                Sweats
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Sore throat or itchy/scratchy throat'
                  onChange={addSymptomOne}
                />
                Sore throat or itchy/scratchy throat
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Nausea or vomiting'
                  onChange={addSymptomOne}
                />
                Nausea or vomiting
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Runny or stuffy nose'
                  onChange={addSymptomOne}
                />
                Runny or stuffy nose
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Feeling more tired than usual'
                  onChange={addSymptomOne}
                />
                Feeling more tired than usual
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Muscle or body aches'
                  onChange={addSymptomOne}
                />
                Muscle or body aches
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Increased trouble with breathing'
                  onChange={addSymptomOne}
                />
                Increased trouble with breathing
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='None of the above'
                  onChange={addSymptomRemove}
                />
                None of the above
                <br />
              </div>
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
          text={props.question13}
          description={props.conditions}
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
          text={props.question13}
          description={props.conditions}
          label='conditions'
          type='select'
          id='conditions'
          value={conditionsValue}
          options={optionsYesNo}
          handleChange={handleConditions}
        />
      ) : null}

      {question >= 7 ? (
        <div classname='col-12 selectSymptoms'>
          <div className='row'>
            <div className='col-12'>
              <p>{props.question11}</p>
              <div className='symptom col-4'>
                <label>
                  <input
                    type='checkbox'
                    name='test1'
                    value='Feeling Feverish'
                    onChange={addSymptomTwo}
                  />
                  Feeling Feverish
                </label>
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test2'
                  value='Headache'
                  onChange={addSymptomTwo}
                />
                Headache
                <br />
              </div>
              <div className='symptom col-4'>
                <label>
                  <input
                    type='checkbox'
                    name='test3'
                    value='Cough'
                    onChange={addSymptomTwo}
                  />
                  Cough
                </label>
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Chills or shivering'
                  onChange={addSymptomTwo}
                />
                Chills or shivering
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Sweats'
                  onChange={addSymptomTwo}
                />
                Sweats
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Sore throat or itchy/scratchy throat'
                  onChange={addSymptomTwo}
                />
                Sore throat or itchy/scratchy throat
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Nausea or vomiting'
                  onChange={addSymptomTwo}
                />
                Nausea or vomiting
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Runny or stuffy nose'
                  onChange={addSymptomTwo}
                />
                Runny or stuffy nose
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Feeling more tired than usual'
                  onChange={addSymptomTwo}
                />
                Feeling more tired than usual
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Muscle or body aches'
                  onChange={addSymptomTwo}
                />
                Muscle or body aches
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='Increased trouble with breathing'
                  onChange={addSymptomTwo}
                />
                Increased trouble with breathing
                <br />
              </div>
              <div className='symptom col-4'>
                <input
                  type='checkbox'
                  name='test3'
                  value='None of the above'
                  onChange={addSymptomRemove}
                />
                None of the above
                <br />
              </div>
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
          text={props.question13}
          description={props.conditions}
          label='conditions'
          type='select'
          id='conditions'
          value={conditionsValue}
          options={optionsYesNo}
          handleChange={handleConditions}
        />
      ) : null}

      <button
        className='btn btn-primary float-left next'
        type='submit'
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  )
}
export default FlowTwo
