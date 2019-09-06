import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'

const FlowTwoA = props => {
  const [question, setQuestion] = useState(0)
  const [howlongValue, setHowlongValue] = useState('')
  const [connectedValue, setconnectedValue] = useState('')
  const [conditionsValue, setConditionsValue] = useState('')
  const [symptomsList, setSymptopmsList] = useState([])

  useEffect(() => {})

  function handleDuration (event) {
    setHowlongValue(event.target.value)
  }
  function handleconnected (event) {
    setconnectedValue(event.target.value)
  }
  function handleConditions (event) {
    setConditionsValue(event.target.value)
  }

  function handleNext (event) {
    event.preventDefault()
    if (question == 0) {
      if (howlongValue == 'moreThan7') {
        props.handleNextError()
      } else {
        setQuestion(question + 1)
      }
    }
    if (question == 1) {
      if (symptomsList.length <= 2) {
        props.handleNextError()
      } else {
        setQuestion(question + 1)
      }
    }

    if (question == 2) {
      if (connectedValue == 'no') {
        props.handleNextError()
      } else {
        setQuestion(question + 1)
      }
    }
    if (question == 3) {
      if (conditionsValue == 'no') {
        props.handleNextError()
      } else {
        props.handleNext(3)
        // setQuestion(question + 1)
      }
    }
  }
  function addSymptom (event) {
    const array = [...symptomsList]
    var index = array.indexOf(event.target.value)
    if (index != -1) {
      array.splice(index, 1)
      setSymptopmsList(array)
    } else {
      setSymptopmsList([...symptomsList, event.target.value])
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
    <div>
      <p>{symptomsList}</p>
      {question >= 0 ? (
        <Select
          text='How Long have you had symptoms?'
          label='symptoms'
          type='select'
          id='symptoms'
          value={howlongValue}
          options={options}
          handleChange={handleDuration}
        />
      ) : null}

      {question >= 1 ? (
        <div>
          <input
            type='checkbox'
            name='test1'
            value='Feeling Feverish'
            onChange={addSymptom}
          />
          Feeling Feverish
          <br />
          <input
            type='checkbox'
            name='test2'
            value='Nausea or vomiting'
            onChange={addSymptom}
          />
          Nausea or vomiting
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Increased trouble with breathing'
            onChange={addSymptom}
          />
          Increased trouble with breathing
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Headaches'
            onChange={addSymptom}
          />
          Headaches
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Runny or stuffy nose or sneezing'
            onChange={addSymptom}
          />
          Runny or stuffy nose or sneezing
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Ear pain or ear discharge'
            onChange={addSymptom}
          />
          Ear pain or ear discharge
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Cough'
            onChange={addSymptom}
          />
          Cough
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Rash'
            onChange={addSymptom}
          />
          Rash
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Chills or sweats'
            onChange={addSymptom}
          />
          Chills or sweats
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Diarrhea'
            onChange={addSymptom}
          />
          Diarrhea
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Increased Fatigue(tiredness)'
            onChange={addSymptom}
          />
          Increased Fatigue(tiredness)
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Feeling dizzy'
            onChange={addSymptom}
          />
          Feeling dizzy
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Sore throat'
            onChange={addSymptom}
          />
          Sore throat
          <br />
          <input
            type='checkbox'
            name='test3'
            value='Muscle or body aches'
            onChange={addSymptom}
          />
          Muscle or body aches
          <br />
          <input
            type='checkbox'
            name='test3'
            value='None of the above'
            onChange={addSymptom}
          />
          None of the above
          <br />
        </div>
      ) : null}
      {question >= 2 ? (
        <Select
          text='Do you have regular access to an internet-enabled device, such as laptop or computer?'
          label='connected'
          type='select'
          id='connected'
          value={connectedValue}
          options={optionsYesNo}
          handleChange={handleconnected}
        />
      ) : null}
      {question >= 3 ? (
        <Select
          text='Do you have any of the following conditions:'
          label='conditions'
          type='select'
          id='conditions'
          value={conditionsValue}
          options={optionsYesNo}
          handleChange={handleConditions}
        />
      ) : null}

      <button
        className='btn btn-primary float-right'
        type='submit'
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  )
}
export default FlowTwoA
