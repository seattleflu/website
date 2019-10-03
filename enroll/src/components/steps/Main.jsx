import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Input from '../presentational/Input.jsx';
import ReactGA from 'react-ga';
import {Event} from '../../services/ga';
const Main = props => {
  const [question, setQuestion] = useState (0);
  const [zipValue, setZipValue] = useState ('');
  const [zipWorkValue, setZipWorkValue] = useState ('');
  const [ageValue, setAgeValue] = useState ('');
  const [homeZip, setHomeZip] = useState (props.homeZip);
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
        setQuestion (question + 1);
      } else {
        props.handleNextError (props.bouncePage1);
      }
    }
    if (question == 1) {
      setQuestion (question + 1);
    }

    if (question == 2) {
      if (ageValue >= 18) {
        props.handleNext (1);
      } else {
        props.handleNextError (props.bouncePage2);
      }
    }
  }
  function handleZipChange (event) {
    if(zipValue.length >= 5){
      Event ('Enroll Screener', 'Home Zip', zipValue);
    }
    setZipValue (event.target.value);
    props.setMainZip (event.target.value);
  }
  function handleZipWorkChange (event) {
    //Event ('Enroll Screener', 'Work Zip', zipWorkValue);
    setZipWorkValue (event.target.value);
  }
  function handleAgeChange (event) {
    Event ('Enroll Screener', 'Your Age', ageValue);
    setAgeValue (event.target.value);
  }

  return (
    <div className="col-12">
      <h2>Screening Questionnaire</h2>
      {question >= 0
        ? <Input
            text={props.question1}
            description={props.question1Description}
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
            description={props.question19Description}
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
