import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useRoutes, useRedirect } from 'hookrouter'
import Input from './components/presentational/Input.jsx'
import Main from './components/steps/Main.jsx'
import FlowOne from './components/steps/FlowOne.jsx'
import FlowTwo from './components/steps/FlowTwo.jsx'
import FlowThree from './components/steps/FlowThree.jsx'
import FlowFour from './components/steps/FlowFour.jsx'
import Error from './components/steps/Error.jsx'
import {
  getThankyou,
  getEnrollmentQuestions,
  getWebSiteSettings
} from './services/api'

const App = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [question4, setQuestion4] = useState('')
  const [question5, setQuestion5] = useState('')
  const [question6, setQuestion6] = useState('')
  const [question7, setQuestion7] = useState('')
  const [question8, setQuestion8] = useState('')
  const [question9, setQuestion9] = useState('')
  const [question10, setQuestion10] = useState('')
  const [question11, setQuestion11] = useState('')
  const [question12, setQuestion12] = useState('')
  const [question13, setQuestion13] = useState('')
  const [question14, setQuestion14] = useState('')
  const [question15, setQuestion15] = useState('')
  const [question16, setQuestion16] = useState('')
  const [question17, setQuestion17] = useState('')
  const [question18, setQuestion18] = useState('')

  useEffect(() => {
    getThankyou(1).then(thankyouData => {
      console.log(thankyouData)
    })

    getWebSiteSettings().then(settings => {
      console.log(settings)
    })

    getEnrollmentQuestions().then(questions => {
      questions.map(question => {
        switch (question.fields.id) {
          case 1:
            console.log(question.fields.question)
            setQuestion1(question.fields.question)
            break
          case 2:
            console.log(question.fields.question)
            setQuestion2(question.fields.question)
            break
          case 3:
            console.log(question.fields.question)
            setQuestion3(question.fields.question)
            break
          case 4:
            console.log(question.fields.question)
            setQuestion4(question.fields.question)
            break
          case 5:
            console.log(question.fields.question)
            setQuestion5(question.fields.question)
            break
          case 6:
            console.log(question.fields.question)
            setQuestion6(question.fields.question)
            break
          case 7:
            console.log(question.fields.question)
            setQuestion7(question.fields.question)
            break
          case 8:
            console.log(question.fields.question)
            setQuestion8(question.fields.question)
            break
          case 9:
            console.log(question.fields.question)
            setQuestion9(question.fields.question)
            break
          case 10:
            console.log(question.fields.question)
            setQuestion10(question.fields.question)
            break
          case 11:
            console.log(question.fields.question)
            setQuestion11(question.fields.question)
            break
          case 12:
            console.log(question.fields.question)
            setQuestion12(question.fields.question)
            break
          case 13:
            console.log(question.fields.question)
            setQuestion13(question.fields.question)
            break
          case 14:
            console.log(question.fields.question)
            setQuestion14(question.fields.question)
            break
          case 15:
            console.log(question.fields.question)
            setQuestion15(question.fields.question)
            break
          case 16:
            console.log(question.fields.question)
            setQuestion16(question.fields.question)
            break
          case 17:
            console.log(question.fields.question)
            setQuestion17(question.fields.question)
            break
          case 18:
            console.log(question.fields.question)
            setQuestion18(question.fields.question)
            break
          default:
          // console.log(question.fields.question)
        }
      })
    })
  }, [])

  function handleNext (value) {
    setCurrentStep(value)
    // if (currentStep == 5) {
    //   setCurrentStep(0)
    // } else {
    //   setCurrentStep(currentStep + 1)
    // }
  }
  function handleNextError (url) {
    // setCurrentStep(5)
    window.location.replace('/thank-you/' + url)
  }

  return (
    <div className='enrollment'>
      <form id='enroll-form'>
        {currentStep == 0 ? (
          <Main
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
            question1={question1}
            question2={question2}
          />
        ) : null}
        {currentStep == 1 ? (
          <FlowOne
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
            question3={question3}
            question4={question4}
            question5={question5}
            question6={question6}
            question7={question7}
            question8={question8}
            question9={question9}
          />
        ) : null}
        {currentStep == 2 ? (
          <FlowTwo
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
            question9={question9}
            question10={question10}
            question11={question11}
            question12={question12}
            question13={question13}
            question14={question14}
            question16={question16}
          />
        ) : null}

        {currentStep == 3 ? (
          <FlowThree
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
            question15={question15}
            question16={question16}
            question12={question12}
            question17={question17}
            question18={question18}
          />
        ) : null}

        {currentStep == 4 ? (
          <FlowFour
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
            question15={question15}
            question16={question16}
            question12={question12}
            question17={question17}
            question18={question18}
          />
        ) : null}
      </form>
      {currentStep == 5 ? (
        <Error
          handleNext={handleNext}
          handleNextError={handleNextError}
          currentStep={currentStep}
        />
      ) : null}
    </div>
  )
}
export default App
const wrapper = document.getElementById('eligibility')
wrapper ? ReactDOM.render(<App />, wrapper) : false
