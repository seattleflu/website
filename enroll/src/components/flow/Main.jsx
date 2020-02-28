import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Input from './presentational/Input.jsx';
import Select from './presentational/Select.jsx'
import ReactGA from 'react-ga';
import {Event} from '../../services/ga';
import Cookies from 'js-cookie';

const Main = props => {
  const [question, setQuestion] = useState (0);
  const [zipValue, setZipValue] = useState ('');
  const [zipWorkValue, setZipWorkValue] = useState ('');
  const [ageValue, setAgeValue] = useState ('');
  const [homeZip, setHomeZip] = useState (props.homeZip);
  const [whoValue, setWhoValue] = useState('')
  const[activeButton, setActiveButton] = useState(true)
  
  //const [workZip, setWorkZip] = useState(props.workZip)

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    ReactGA.pageview(' /enroll')
  }

  useEffect (() => {
    initializeReactGA ();
    setHomeZip (props.homeZip);
  }, []);

  function handleChange (event) {
    event.preventDefault ();
    if (question == 0) {
      //setActiveButton(true)
      if (props.homeZip.includes (zipValue)) {
        Cookies.set('flu_zipcode', zipValue, { expires: 7 })
        setQuestion (question + 1);
      } else {
        Event ('Enroll Screener', 'Home Zip', zipValue);
        props.handleNextError (props.bouncePage1);
      }
    }
    if (question == 1) {
      setActiveButton(true)
      setQuestion (question + 1);
      Event ('Enroll Screener', 'Work Zip', zipWorkValue);
    }

    if (question == 2) {
      setActiveButton(true)
      Event ('Enroll Screener', 'Your Age', event.target.value);
      if (ageValue >= 18 && (props.referrerValue == 'schools' || props.referrerValue == 'households' || props.referrerValue == 'webmd')) {
        props.handleNext(1)
      }else if(ageValue <= 18 && (props.referrerValue == 'schools' || props.referrerValue == 'households' || props.referrerValue == 'webmd')){
      props.handleNextError (props.bouncePage18);
    }else if(ageValue >= 18 && (props.referrerValue != 'schools' || props.referrerValue != 'households' || props.referrerValue != 'webmd')){
      setQuestion (question + 1);
        Event ('Enroll Screener', 'Home Zip', zipValue);
        Event ('Enroll Screener', 'Work Zip', zipWorkValue);
        Event ('Enroll Screener', 'Age', ageValue);
      } else {
        Event ('Enroll Screener', 'Home Zip', zipValue);
        Event ('Enroll Screener', 'Work Zip', zipWorkValue);
        Event ('Enroll Screener', 'Age', ageValue);
        props.handleNextError (props.bouncePage2);
      }
    }

    if (question == 3) {
      if (whoValue == 'myself') {
        props.handleNext(1)
      } else if (whoValue == 'over18') {
        props.handleNext(1)
      } else if (whoValue == 'under18') {
        props.handleNext(1)
      } else {
        // props.handleNextError()
      }
    }
  }
  function handleZipChange (event) {
    if (event.target.value.length >=5){
      setActiveButton(false)
    }else{
      setActiveButton(true)
    }
    setZipValue (event.target.value);
    props.setMainZip (event.target.value);
  }
  function handleZipWorkChange (event) {
    setActiveButton(false)
    // if (event.target.value.length >=5){
    //   setActiveButton(false)
    // }else{
    //   setActiveButton(true)
    // }
    //Event ('Enroll Screener', 'Work Zip', zipWorkValue);
    setZipWorkValue (event.target.value);
  }


  function handleAgeChange (event) {
    if (event.target.value.length >=1){
      setActiveButton(false)
    }else{
      setActiveButton(true)
    }
    setAgeValue (event.target.value);
    if(props.referrerValue == 'schools' || props.referrerValue == 'households' || props.referrerValue == 'webmd'){
        if(event.taget.value <= 18){
          props.handleNextError (props.bouncePage18);
        }else{
          props.handleNext(1)
        }
    }
    
  }
  function handleWhoChange (event) {
    if (event.target.value != 'none'){
      setActiveButton(false)
    }else{
      setActiveButton(true)
    }
    Event ('Enroll Screener', 'Participent info', event.target.value);
    setWhoValue(event.target.value)
    setQuestion(3)
      if(event.target.value != 'myself'){
        props.setFirstPersonValue(false)
      }else{
        props.setFirstPersonValue(true)
      }
      if (event.target.value != 'none') {
        Event ('Enroll Screener', 'Participent info', event.target.value);
        setQuestion(3)
      } else {
        //props.handleNext(5)
      }
  }

  const who = [
    { value: 'none', label: '' },
    { value: 'myself', label: 'Myself' },
    { value: 'over18', label: 'Someone in my household over 18' },
    { value: 'under18', label: 'My child or legal ward under 18' }
  ]

  return (
    <div className="col-12">
      <h2>Screening Questionnaire</h2>
     <p className="intro">{props.introOne}</p>
      formConfirm
      <p className="steps">Step 1 of 3</p>
      {question >= 0
        ? <Input
            text={props.question1}
            description={props.conditions1}
            label="zip_code"
            type="text"
            inputmode="numeric"
            id="zipcode-home"
            value={zipValue}
            handleChange={handleZipChange}
          />
        : null}
      {question >= 1 ? <img src="https://bm.adentifi.com/pixel/conv/ppt=6158;g=lp_study_screener_starts;gid=22964;ord=[uniqueid]" height="0" width="0" border="0"  /> : ''}
      {question >= 1
        ? <Input
            text={props.question19}
            description={props.conditions19}
            label="zip_code"
            type="text"
            inputmode="numeric"
            id="zipcode-work"
            value={zipWorkValue}
            handleChange={handleZipWorkChange}
          />
        : null}
      {question >= 2
        ? <Input
            text={props.question2}
            description={props.conditions2}
            label="age"
            type="text"
            inputmode="numeric"
            id="age"
            value={ageValue}
            handleChange={handleAgeChange}
          />
        : null}
      {question >= 3
        ? <Select
          text={props.question9}
          description={props.conditions9}
          label='whoFor'
          type='select'
          id='whoFor'
          value={whoValue}
          options={who}
          handleChange={handleWhoChange}
        />
       : null}
      
      <button
        className="btn btn-primary float-right next"
        type="submit"
        onClick={handleChange}
        disabled={activeButton}
      >
        Next
      </button>
    </div>
  );
};
export default Main;
