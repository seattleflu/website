import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useRoutes, useRedirect } from 'hookrouter'
import Main from './components/flow/Main.jsx'
import Questions from './components/flow/questions.jsx'
import Error from './components/flow/Error.jsx'
import {
  getThankyou,
  getEnrollmentQuestions,
  getWebSiteSettings,
  getStudy
} from './services/api'

const App = () => {
  const [zip, setZip] = useState('')
  const [fistPersonValue, setFirstPersonValue] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [introOne, setIntroOne] = useState('')
  const [introTwo, setIntroTwo] = useState('')
  const [introThree, setIntroThree] = useState('')
  const [introFour, setIntroFour] = useState('')
  const [asymptomatic, setAsymptomatic] = useState('')
  const [householdStudies, sethouseholdStudies] = useState('')
  const [hhIntervention, sethhIntervention] = useState('')

  
  const [question1, setQuestion1] = useState('')
  const [bouncePage1, setBouncePage1] = useState('')
  const [fluStudyPage1, setFluStudyPage1] = useState('')
  const [conditions1, setConditions1] = useState('')


  const [question2, setQuestion2] = useState('')
  const [bouncePage2, setBouncePage2] = useState('')
  const [fluStudyPage2, setFluStudyPage2] = useState('')
  const [conditions2, setConditions2] = useState('')
  
  const [question3, setQuestion3] = useState('')
  const [bouncePage3, setBouncePage3] = useState('')
  const [fluStudyPage3, setFluStudyPage3] = useState('')
  const [conditions3, setConditions3] = useState('')

  const [question4, setQuestion4] = useState('')
  const [bouncePage4, setBouncePage4] = useState('')
  const [fluStudyPage4, setFluStudyPage4] = useState('')
  const [conditions4, setConditions4] = useState('')

  const [question5, setQuestion5] = useState('')
  const [bouncePage5, setBouncePage5] = useState('')
  const [fluStudyPage5, setFluStudyPage5] = useState('')
  const [conditions5, setConditions5] = useState('')

  const [question6, setQuestion6] = useState('')
  const [bouncePage6, setBouncePage6] = useState('')
  const [fluStudyPage6, setFluStudyPage6] = useState('')
  const [conditions6, setConditions6] = useState('')

  const [question7, setQuestion7] = useState('')
  const [bouncePage7, setBouncePage7] = useState('')
  const [fluStudyPage7, setFluStudyPage7] = useState('')
  const [conditions7, setConditions7] = useState('')

  const [question8, setQuestion8] = useState('')
  const [bouncePage8, setBouncePage8] = useState('')
  const [fluStudyPage8, setFluStudyPage8] = useState('')
  const [conditions8, setConditions8] = useState('')

  const [question9, setQuestion9] = useState('')
  const [bouncePage9, setBouncePage9] = useState('')
  const [fluStudyPage9, setFluStudyPage9] = useState('')
  const [conditions9, setConditions9] = useState('')

  const [question10, setQuestion10] = useState('')
  const [bouncePage10, setBouncePage10] = useState('')
  const [fluStudyPage10, setFluStudyPage10] = useState('')
  const [conditions10, setConditions10] = useState('')

  const [question11, setQuestion11] = useState('')
  const [bouncePage11, setBouncePage11] = useState('')
  const [fluStudyPage11, setFluStudyPage11] = useState('')
  const [conditions11, setConditions11] = useState('')

  const [question12, setQuestion12] = useState('')
  const [bouncePage12, setBouncePage12] = useState('')
  const [fluStudyPage12, setFluStudyPage12] = useState('')
  const [conditions12, setConditions12] = useState('')

  const [question13, setQuestion13] = useState('')
  const [bouncePage13, setBouncePage13] = useState('')
  const [fluStudyPage13, setFluStudyPage13] = useState('')
  const [conditions13, setConditions13] = useState('')

  const [question14, setQuestion14] = useState('')
  const [bouncePage14, setBouncePage14] = useState('')
  const [fluStudyPage14, setFluStudyPage14] = useState('')
  const [conditions14, setConditions14] = useState('')

  const [question15, setQuestion15] = useState('')
  const [bouncePage15, setBouncePage15] = useState('')
  const [fluStudyPage15, setFluStudyPage15] = useState('')
  const [conditions15, setConditions15] = useState('')

  const [question16, setQuestion16] = useState('')
  const [bouncePage16, setBouncePage16] = useState('')
  const [fluStudyPage16, setFluStudyPage16] = useState('')
  const [conditions16, setConditions16] = useState('')

  const [question17, setQuestion17] = useState('')
  const [bouncePage17, setBouncePage17] = useState('')
  const [fluStudyPage17, setFluStudyPage17] = useState('')
  const [conditions17, setConditions17] = useState('')

  const [question18, setQuestion18] = useState('')
  const [bouncePage18, setBouncePage18] = useState('')
  const [fluStudyPage18, setFluStudyPage18] = useState('')
  const [conditions18, setConditions18] = useState('')

  const [question19, setQuestion19] = useState('')
  const [bouncePage19, setBouncePage19] = useState('')
  const [fluStudyPage19, setFluStudyPage19] = useState('')
  const [conditions19, setConditions19] = useState('')

  const [zipCodes, setZipCodes] = useState('')
  const [conditions, setConditions] = useState('')
  const [studyName, setStudyName] = useState('')
  const [homeZip, setHomeZip] = useState()
  //const [workZip, setWorkZip] = useState()
  const [referrerValue, setReferrer] = useState('')

  useEffect(() => {
    var referrer = document.referrer.split("/").pop();
    setReferrer(referrer)
    getThankyou(1).then(thankyouData => {
    }, [])

    getWebSiteSettings().then(settings => {
      //setIntros
      
      //const work = settings[0].fields.validStudyWorkZipCodes
      const home = settings[0].fields.validStudyHomeZipCodes
      //const workString = work.replace(' ', '')
      const homeString = home.replace(' ', '')
      //const workArray = workString.split(',')
      const homeArray = homeString.split(',')
      // setWorkZip(workArray)
      setHomeZip(homeArray)
      setIntroOne(settings[0].fields.introCopyOne)
      setIntroTwo(settings[0].fields.introCopyTwo)
      setIntroThree(settings[0].fields.introCopyThree)
      setIntroFour(settings[0].fields.introCopyFour)
      setAsymptomatic(settings[0].fields.asymptomatic_SS)
      sethouseholdStudies(settings[0].fields.householdStudies)
      sethhIntervention(settings[0].fields.hhIntervention)
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
            if(question.fields.addInformation){
              setConditions1(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions2(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions3(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions4(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions5(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions6(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions7(question.fields.addInformation)
            }
            setQuestion7(question.fields.question)
            break
          case 8:
            if (question.fields.bouncePage) {
              setBouncePage8(question.fields.bouncePage.fields.studyName)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage8(question.fields.fluStudyPage.fields.studyName)
            }
            if(question.fields.addInformation){
              setConditions8(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions9(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions10(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions11(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions12(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions13(question.fields.addInformation)
            }
            setQuestion13(question.fields.question)
            break
          case 14:
            if (question.fields.bouncePage) {
              setBouncePage14(question.fields.bouncePage.fields.url)
            }
            if (question.fields.fluStudyPage) {
              setFluStudyPage14(question.fields.fluStudyPage.fields.studyName)
            }
            if(question.fields.addInformation){
              setConditions14(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions15(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions16(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions17(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions18(question.fields.addInformation)
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
            if(question.fields.addInformation){
              setConditions19(question.fields.addInformation)
            }
            setQuestion19(question.fields.question)
            break
          default:
        }
      })
    })
  }, [])

  function setMainZip(zipCode){
    setZip(zipCode)
  }
function setFirstPerson(value){
  if (value != null){
    setFirstPersonValue(value)
  }
}
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
    
    if(asymptomatic){
      setStudyName('Asymptomatic_Swab_and_Send_Study') 
    }else{
      setStudyName(url)
    }
    
    setCurrentStep(5)
  }

  return (
    <div className='enrollment container'>
      <form id='enroll-form row'>
        {currentStep == 0 ? (
          <Main
            setMainZip={setMainZip}
            handleNext={handleNext}
            handleNextError={handleNextError}
            handleStudy={handleStudy}
            currentStep={currentStep}
            question1={question1}
            conditions1={conditions1}
            bouncePage1={bouncePage1}
            fluStudyPage1={fluStudyPage1}
            question2={question2}
            conditions2={conditions2}
            bouncePage2={bouncePage2}
            fluStudyPage2={fluStudyPage2}
            question9={question9}
            conditions9={conditions9}
            bouncePage9={bouncePage9}
            fluStudyPage9={fluStudyPage9}
            question19={question19}
            conditions19={conditions19}
            bouncePage19={bouncePage19}
            fluStudyPage19={fluStudyPage19}
            homeZip={homeZip}
            setFirstPersonValue={setFirstPersonValue}
            referrerValue={referrerValue}
            introOne={introOne}
            asymptomatic={asymptomatic}
            householdStudies={householdStudies}
            hhIntervention={hhIntervention}
          />
        ) : null}
        {currentStep == 1 ? (
          <Questions
            referrerValue={referrerValue}
            handleNext={handleNext}
            handleNextError={handleNextError}
            handleStudy={handleStudy}
            currentStep={currentStep}
            fistPersonValue={fistPersonValue}
            introTwo={introTwo}
            introThree={introThree}
            introFour={introFour}
            fluStudyPage2={fluStudyPage2}
            question11={question11}
            conditions11={conditions11}
            bouncePage11={bouncePage11}
            fluStudyPage11={fluStudyPage11}
            
            question4={question4}
            conditions4={conditions4}
            bouncePage4={bouncePage4}
            fluStudyPage4={fluStudyPage4}
            question5={question5}
            conditions5={conditions5}
            bouncePage5={bouncePage5}
            fluStudyPage5={fluStudyPage5}
            question6={question6}
            conditions6={conditions6}
            bouncePage6={bouncePage6}
            fluStudyPage6={fluStudyPage6}
            question7={question7}
            conditions7={conditions7}
            bouncePage7={bouncePage7}
            fluStudyPage7={fluStudyPage7}
            question8={question8}
            conditions8={conditions8}
            bouncePage8={bouncePage8}
            fluStudyPage8={fluStudyPage8}

            question10={question10}
            conditions10={conditions10}
            bouncePage10={bouncePage10}
            fluStudyPage10={fluStudyPage10}
            question12={question12}
            conditions12={conditions12}
            bouncePage12={bouncePage12}
            fluStudyPage12={fluStudyPage12}
            question15={question15}
            conditions15={conditions15}
            bouncePage15={bouncePage15}
            fluStudyPage15={fluStudyPage15}
            question14={question14}
            conditions14={conditions14}
            bouncePage14={bouncePage14}
            fluStudyPage14={fluStudyPage14}
            question18={question18}
            conditions18={conditions18}
            bouncePage18={bouncePage18}
            fluStudyPage18={fluStudyPage18}
            asymptomatic={asymptomatic}
            householdStudies={householdStudies}
            hhIntervention={hhIntervention}
            
          />
        ) : null}
        
      </form>
      {currentStep == 5 ? (
        <Error
          zip={zip}
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
