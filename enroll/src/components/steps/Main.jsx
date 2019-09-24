import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Input from '../presentational/Input.jsx'
const Main = props => {
  const [question, setQuestion] = useState(0)
  const [zipValue, setZipValue] = useState('')
  const [zipWorkValue, setZipWorkValue] = useState('')
  const [ageValue, setAgeValue] = useState('')
  const [homeZip, setHomeZip] = useState(props.homeZip)
  const [workZip, setWorkZip] = useState(props.workZip)

  useEffect(() => {
    console.log('Home Zips: ' + props.homeZip)
    // setHomeZip(props.homeZip)
    // setWorkZip(props.workZip)
  }, [])
  const zipCodes = [
    '98101',
    '98102',
    '98103',
    '98104',
    '98105',
    '98106',
    '98107',
    '98108',
    '98109',
    '98112',
    '98115',
    '98116',
    '98117',
    '98118',
    '98119',
    '98121',
    '98122',
    '98125',
    '98126',
    '98133',
    '98134',
    '98136',
    '98144',
    '98146',
    '98154',
    '98164',
    '98174',
    '98177',
    '98178',
    '98195',
    '98199'
  ]

  function handleChange (event) {
    event.preventDefault()
    if (question == 0) {
      if (props.homeZip.includes(zipValue)) {
        setQuestion(question + 1)
      } else {
        props.handleNextError(props.bouncePage1)
      }
    }
    if (question == 1) {
      if (props.workZip.includes(zipWorkValue)) {
        setQuestion(question + 1)
      } else {
        setQuestion(question + 1)
        // props.handleNextError(props.bouncePage1)
      }
    }

    if (question == 2) {
      if (ageValue >= 18) {
        props.handleNext(1)
      } else {
        props.handleNextError(props.bouncePage2)
      }
    }
  }
  function handleZipChange (event) {
    setZipValue(event.target.value)
  }
  function handleZipWorkChange (event) {
    setZipWorkValue(event.target.value)
  }
  function handleAgeChange (event) {
    setAgeValue(event.target.value)
  }

  return (
    <div className='col-12'>
      <h2>Screening Questionnaire</h2>
      {question >= 0 ? (
        <Input
          text={props.question1}
          description=''
          label='zip_code'
          type='text'
          id='zipcode-home'
          value={zipValue}
          handleChange={handleZipChange}
        />
      ) : null}
      {question >= 1 ? (
        <Input
          text={props.question19}
          description=''
          label='zip_code'
          type='text'
          id='zipcode-work'
          value={zipWorkValue}
          handleChange={handleZipWorkChange}
        />
      ) : null}
      {question >= 2 ? (
        <Input
          text={props.question2}
          description=''
          label='age'
          type='text'
          id='zipcode'
          value={ageValue}
          handleChange={handleAgeChange}
        />
      ) : null}
      <button
        className='btn btn-primary float-left next'
        type='submit'
        onClick={handleChange}
      >
        Next
      </button>
    </div>
  )
}
export default Main
