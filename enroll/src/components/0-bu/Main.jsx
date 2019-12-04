import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Input from '../presentational/Input.jsx';
import Select from '../presentational/Select.jsx'
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
  //const [workZip, setWorkZip] = useState(props.workZip)

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    //ReactGA.pageview(' /enroll')
  }

  useEffect (() => {
    initializeReactGA ();
    setHomeZip (props.homeZip);
  }, []);

  function handleChange (event) {
    event.preventDefault ();
    if (question == 0) {
      if (props.homeZip.includes (zipValue)) {
        Cookies.set('flu_zipcode', zipValue, { expires: 7 })
        setQuestion (question + 1);
      } else {
        Event ('Enroll Screener', 'Home Zip', zipValue);
        Cookies.set('flu_zipcode', zipValue, { expires: 7 })
        props.handleNextError (props.bouncePage1);
      }
    }
    if (question == 1) {
      setQuestion (question + 1);
    }

    if (question == 2) {
      if (ageValue >= 18) {
         Event ('Enroll Screener', 'Home Zip', zipValue);
         Event ('Enroll Screener', 'Work Zip', zipWorkValue);
         Event ('Enroll Screener', 'Age', ageValue);
         setQuestion (question + 1);
        //props.handleNext (1);
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
    setZipValue (event.target.value);
    props.setMainZip (event.target.value);
  }
  function handleZipWorkChange (event) {
    //Event ('Enroll Screener', 'Work Zip', zipWorkValue);
    setZipWorkValue (event.target.value);
  }
  function handleAgeChange (event) {
    setAgeValue (event.target.value);
  }
  function handleWhoChange (event) {
    Event ('Enroll Screener', 'Participent info', event.target.value);
    setWhoValue(event.target.value)
    setQuestion(3)
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
      {question >= 0
        ? <Input
            text={props.question1}
            description={props.question1}
            label="zip_code"
            type="text"
            id="zipcode-home"
            value={zipValue}
            handleChange={handleZipChange}
          />
        : null}
      {question >= 1
        ? <Input
            text={props.question19}
            description={props.question19}
            label="zip_code"
            type="text"
            id="zipcode-work"
            value={zipWorkValue}
            handleChange={handleZipWorkChange}
          />
        : null}
      {question >= 2
        ? <Input
            text={props.question2}
            description=""
            label="age"
            type="text"
            id="zipcode"
            value={ageValue}
            handleChange={handleAgeChange}
          />
        : null}
      {question >= 3
        ? <Select
          text={props.question9}
          description=''
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
      >
        Next
      </button>
    </div>
  );
};
export default Main;
