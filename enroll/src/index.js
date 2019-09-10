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

const App = () => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {})

  function handleNext (value) {
    setCurrentStep(value)
    // if (currentStep == 5) {
    //   setCurrentStep(0)
    // } else {
    //   setCurrentStep(currentStep + 1)
    // }
  }
  function handleNextError (url) {
    setCurrentStep(5)
    window.open('/thank-you/' + url)
  }

  return (
    <div className='enrollment'>
      <form id='enroll-form'>
        {currentStep == 0 ? (
          <Main
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
          />
        ) : null}
        {currentStep == 1 ? (
          <FlowOne
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
          />
        ) : null}
        {currentStep == 2 ? (
          <FlowTwo
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
          />
        ) : null}

        {currentStep == 3 ? (
          <FlowThree
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
          />
        ) : null}

        {currentStep == 4 ? (
          <FlowFour
            handleNext={handleNext}
            handleNextError={handleNextError}
            currentStep={currentStep}
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
