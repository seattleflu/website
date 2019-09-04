import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Input from './components/presentational/Input.jsx'
import Main from './components/steps/Main.jsx'
import FlowOne from './components/steps/FlowOne.jsx'
import FlowTwoA from './components/steps/FlowTwoA.jsx'
import FlowTwoB from './components/steps/FlowTwoB.jsx'
import FlowThree from './components/steps/FlowThree.jsx'
const App = () => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {})

  function handleNext (event) {
    setCurrentStep(currentStep + 1)
  }

  return (
    <div>
      <form id='enroll-form'>
        {currentStep == 0 ? (
          <Main handleNext={handleNext} currentStep={currentStep} />
        ) : null}
        {currentStep == 1 ? (
          <FlowOne handleNext={handleNext} currentStep={currentStep} />
        ) : null}
        {currentStep == 2 ? (
          <FlowTwoA handleNext={handleNext} currentStep={currentStep} />
        ) : null}
        {currentStep == 3 ? (
          <FlowTwoB handleNext={handleNext} currentStep={currentStep} />
        ) : null}
        {currentStep == 4 ? (
          <FlowThree handleNext={handleNext} currentStep={currentStep} />
        ) : null}
      </form>
    </div>
  )
}
export default App
const wrapper = document.getElementById('eligibility')
wrapper ? ReactDOM.render(<App />, wrapper) : false
