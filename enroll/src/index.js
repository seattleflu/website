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
  getWebSiteSettings,
  getStudy
} from './services/api'

const App = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [question1, setQuestion1] = useState('')
  const [bouncePage1, setBouncePage1] = useState('')
  const [fluStudyPage1, setFluStudyPage1] = useState('')

  const [question2, setQuestion2] = useState('')
  const [bouncePage2, setBouncePage2] = useState('')
  const [fluStudyPage2, setFluStudyPage2] = useState('')

  const [question3, setQuestion3] = useState('')
  const [bouncePage3, setBouncePage3] = useState('')
  const [fluStudyPage3, setFluStudyPage3] = useState('')

  const [question4, setQuestion4] = useState('')
  const [bouncePage4, setBouncePage4] = useState('')
  const [fluStudyPage4, setFluStudyPage4] = useState('')

  const [question5, setQuestion5] = useState('')
  const [bouncePage5, setBouncePage5] = useState('')
  const [fluStudyPage5, setFluStudyPage5] = useState('')

  const [question6, setQuestion6] = useState('')
  const [bouncePage6, setBouncePage6] = useState('')
  const [fluStudyPage6, setFluStudyPage6] = useState('')

  const [question7, setQuestion7] = useState('')
  const [bouncePage7, setBouncePage7] = useState('')
  const [fluStudyPage7, setFluStudyPage7] = useState('')

  const [question8, setQuestion8] = useState('')
  const [bouncePage8, setBouncePage8] = useState('')
  const [fluStudyPage8, setFluStudyPage8] = useState('')

  const [question9, setQuestion9] = useState('')
  const [bouncePage9, setBouncePage9] = useState('')
  const [fluStudyPage9, setFluStudyPage9] = useState('')

  const [question10, setQuestion10] = useState('')
  const [bouncePage10, setBouncePage10] = useState('')
  const [fluStudyPage10, setFluStudyPage10] = useState('')

  const [question11, setQuestion11] = useState('')
  const [bouncePage11, setBouncePage11] = useState('')
  const [fluStudyPage11, setFluStudyPage11] = useState('')

  const [question12, setQuestion12] = useState('')
  const [bouncePage12, setBouncePage12] = useState('')
  const [fluStudyPage12, setFluStudyPage12] = useState('')

  const [question13, setQuestion13] = useState('')
  const [bouncePage13, setBouncePage13] = useState('')
  const [fluStudyPage13, setFluStudyPage13] = useState('')

  const [question14, setQuestion14] = useState('')
  const [bouncePage14, setBouncePage14] = useState('')
  const [fluStudyPage14, setFluStudyPage14] = useState('')

  const [question15, setQuestion15] = useState('')
  const [bouncePage15, setBouncePage15] = useState('')
  const [fluStudyPage15, setFluStudyPage15] = useState('')

  const [question16, setQuestion16] = useState('')
  const [bouncePage16, setBouncePage16] = useState('')
  const [fluStudyPage16, setFluStudyPage16] = useState('')

  const [question17, setQuestion17] = useState('')
  const [bouncePage17, setBouncePage17] = useState('')
  const [fluStudyPage17, setFluStudyPage17] = useState('')

  const [question18, setQuestion18] = useState('')
  const [bouncePage18, setBouncePage18] = useState('')
  const [fluStudyPage18, setFluStudyPage18] = useState('')

  const [question19, setQuestion19] = useState('')
  const [bouncePage19, setBouncePage19] = useState('')
  const [fluStudyPage19, setFluStudyPage19] = useState('')

  const [zipCodes, setZipCodes] = useState('')

  const [conditions, setConditions] = useState('')

  const [studyName, setStudyName] = useState('')
  // const [conditions, setConditions] = useState('')
  // const [conditions, setConditions] = useState('')

  const [homeZip, setHomeZip] = useState()
  const [workZip, setWorkZip] = useState()

  useEffect(() => {
    getThankyou(1).then(thankyouData => {
      console.log(thankyouData)
    })

    getWebSiteSettings().then(settings => {
      console.log(settings[0].fields.validStudyZipCodes)
      const work = settings[0].fields.validStudyWorkZipCodes
      const home = settings[0].fields.validStudyHomeZipCodes
      const workString = work.replace(' ', '')
      const homeString = home.replace(' ', '')
      const workArray = workString.split(',')
      const homeArray = homeString.split(',')
      setWorkZip(workArray)
      setHomeZip(homeArray)
    })

    getEnrollmentQuestions().then(questions => {
      questions.map(question => {
        switch (question.fields.id) {
          case 1:
            if (question.fields.bouncePage) {
              setBouncePage1(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage1(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion1(question.fields.question)
            break
          case 2:
            if (question.fields.bouncePage) {
              setBouncePage2(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage2(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion2(question.fields.question)
            break
          case 3:
            if (question.fields.bouncePage) {
              setBouncePage3(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage3(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion3(question.fields.question)
            break
          case 4:
            if (question.fields.bouncePage) {
              setBouncePage4(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage4(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion4(question.fields.question)
            break
          case 5:
            if (question.fields.bouncePage) {
              setBouncePage5(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage5(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion5(question.fields.question)
            break
          case 6:
            if (question.fields.bouncePage) {
              setBouncePage6(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage6(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion6(question.fields.question)
            break
          case 7:
            if (question.fields.bouncePage) {
              setBouncePage7(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage7(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion7(question.fields.question)
            break
          case 8:
            if (question.fields.bouncePage) {
              setBouncePage8(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage8(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion8(question.fields.question)
            break
          case 9:
            if (question.fields.bouncePage) {
              setBouncePage9(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage9(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion9(question.fields.question)
            break
          case 10:
            if (question.fields.bouncePage) {
              setBouncePage10(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage10(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion10(question.fields.question)
            break
          case 11:
            if (question.fields.bouncePage) {
              setBouncePage11(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage11(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion11(question.fields.question)
            break
          case 12:
            if (question.fields.bouncePage) {
              setBouncePage12(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage12(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion12(question.fields.question)
            break
          case 13:
            if (question.fields.bouncePage.fields.url) {
              setBouncePage13(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage.fields.studyName) {
              setFluStudyPage13(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion13(question.fields.question)
            setConditions(question.fields.addInformation)
            break
          case 14:
            if (question.fields.bouncePage) {
              setBouncePage14(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage14(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion14(question.fields.question)
            break
          case 15:
            if (question.fields.bouncePage) {
              setBouncePage15(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage15(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion15(question.fields.question)
            break
          case 16:
            if (question.fields.bouncePage) {
              setBouncePage16(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage16(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion16(question.fields.question)
            break
          case 17:
            if (question.fields.bouncePage) {
              setBouncePage17(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage17(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion17(question.fields.question)
            break
          case 18:
            if (question.fields.bouncePage) {
              setBouncePage18(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage18(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion18(question.fields.question)
            break
          case 19:
            if (question.fields.bouncePage) {
              setBouncePage19(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage19(question.fields.fluStudyPage.fields.studyName)
            }
            setQuestion19(question.fields.question)
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
  function handleStudy (url) {
    setStudyName(url)
    setCurrentStep(5)
  }

  return (
    <div className='enrollment container'>
      <form id='enroll-form row'>
        {currentStep == 0 ? (
          <Main
            handleNext={handleNext}
            handleNextError={handleNextError}
            handleStudy={handleStudy}
            currentStep={currentStep}
            question1={question1}
            bouncePage1={bouncePage1}
            fluStudyPage1={fluStudyPage1}
            question2={question2}
            bouncePage2={bouncePage2}
            fluStudyPage2={fluStudyPage2}
            question19={question19}
            bouncePage19={bouncePage19}
            fluStudyPage19={fluStudyPage19}
            homeZip={homeZip}
            workZip={workZip}
          />
        ) : null}
        {currentStep == 1 ? (
          <FlowOne
            handleNext={handleNext}
            handleNextError={handleNextError}
            handleStudy={handleStudy}
            currentStep={currentStep}
            question3={question3}
            bouncePage3={bouncePage3}
            fluStudyPage3={fluStudyPage3}
            question4={question4}
            bouncePage4={bouncePage4}
            fluStudyPage4={fluStudyPage4}
            question5={question5}
            bouncePage5={bouncePage5}
            fluStudyPage5={fluStudyPage5}
            question6={question6}
            bouncePage6={bouncePage6}
            fluStudyPage6={fluStudyPage6}
            question7={question7}
            bouncePage7={bouncePage7}
            fluStudyPage7={fluStudyPage7}
            question8={question8}
            bouncePage8={bouncePage8}
            fluStudyPage8={fluStudyPage8}
            question9={question9}
            bouncePage9={bouncePage9}
            fluStudyPage9={fluStudyPage9}
            question13={question13}
            bouncePage13={bouncePage13}
            fluStudyPage13={fluStudyPage13}
            conditions={conditions}
          />
        ) : null}
        {currentStep == 2 ? (
          <FlowTwo
            handleNext={handleNext}
            handleNextError={handleNextError}
            handleStudy={handleStudy}
            currentStep={currentStep}
            question9={question9}
            bouncePage9={bouncePage9}
            fluStudyPage9={fluStudyPage9}
            question10={question10}
            bouncePage10={bouncePage10}
            fluStudyPage10={fluStudyPage10}
            question11={question11}
            bouncePage11={bouncePage11}
            fluStudyPage11={fluStudyPage11}
            question12={question12}
            bouncePage12={bouncePage12}
            fluStudyPage12={fluStudyPage12}
            question13={question13}
            bouncePage13={bouncePage13}
            fluStudyPage13={fluStudyPage13}
            question14={question14}
            bouncePage14={bouncePage14}
            fluStudyPage14={fluStudyPage14}
            question16={question16}
            bouncePage16={bouncePage16}
            fluStudyPage16={fluStudyPage16}
            conditions={conditions}
          />
        ) : null}

        {currentStep == 3 ? (
          <FlowThree
            handleNext={handleNext}
            handleNextError={handleNextError}
            handleStudy={handleStudy}
            currentStep={currentStep}
            question10={question10}
            bouncePage10={bouncePage10}
            fluStudyPage10={fluStudyPage10}
            question15={question15}
            bouncePage15={bouncePage15}
            fluStudyPage15={fluStudyPage15}
            question16={question16}
            bouncePage16={bouncePage16}
            fluStudyPage16={fluStudyPage16}
            question12={question12}
            bouncePage12={bouncePage12}
            fluStudyPage12={fluStudyPage12}
            question17={question17}
            bouncePage17={bouncePage17}
            fluStudyPage17={fluStudyPage17}
            question18={question18}
            bouncePage18={bouncePage18}
            fluStudyPage18={fluStudyPage18}
            conditions={conditions}
          />
        ) : null}

        {currentStep == 4 ? (
          <FlowFour
            handleNext={handleNext}
            handleNextError={handleNextError}
            handleStudy={handleStudy}
            currentStep={currentStep}
            question10={question10}
            bouncePage10={bouncePage10}
            fluStudyPage10={fluStudyPage10}
            question15={question15}
            bouncePage15={bouncePage15}
            fluStudyPage15={fluStudyPage15}
            question16={question16}
            bouncePage16={bouncePage16}
            fluStudyPage16={fluStudyPage16}
            question12={question12}
            bouncePage12={bouncePage12}
            fluStudyPage12={fluStudyPage12}
            question17={question17}
            bouncePage17={bouncePage17}
            fluStudyPage17={fluStudyPage17}
            question18={question18}
            bouncePage18={bouncePage18}
            fluStudyPage18={fluStudyPage18}
          />
        ) : null}
      </form>
      {currentStep == 5 ? (
        <Error
          handleNext={handleNext}
          handleNextError={handleNextError}
          currentStep={currentStep}
          studyName={studyName}
        />
      ) : null}
    </div>
  )
}
export default App
const wrapper = document.getElementById('eligibility')
wrapper ? ReactDOM.render(<App />, wrapper) : false
