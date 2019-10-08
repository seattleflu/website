import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {getStudy} from '../../services/api';
const ReactMarkdown = require ('react-markdown');
import axios from 'axios';
import ReactGA from 'react-ga';
import {Event} from '../../services/ga';

const Error = props => {
  const [name, setName] = useState ('');
  const [headline, setHeadline] = useState ('');
  const [description, setDescription] = useState ('');
  const [urlConsent, setUrlConsent] = useState ('');
  const [urlConsentText, setUrlConsentText] = useState ('');
  const [zip, setZip] = useState ('none');
  const [form, setForm] = useState ('true');
  const [url, setUrl] = useState ('');
  const [errorForm, setErrorForm] = useState('false');
  
  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    ReactGA.pageview ("/study/" + props.studyName);
  }

  useEffect (() => {
    setZip (props.zip);
    getStudy (props.studyName).then (studyData => {
      setName (studyData[0].fields.studyName);
      setHeadline (studyData[0].fields.headline);
      setDescription (studyData[0].fields.description);
      setUrlConsent (studyData[0].fields.urlConsent);
      setUrlConsentText (studyData[0].fields.urlButtonText);
      setUrl (studyData[0].fields.url);
    });
    initializeReactGA ();
  }, []);

  function handleSubmit (event) {
    event.preventDefault ();
    Event ('Enroll Screener', 'Study', url);
    let apiUrl = '';
    if (name == 'Household_Intervention') {
      apiUrl =
        'https://qgxlw82k00.execute-api.us-east-1.amazonaws.com/Intervention/';
    } else if (name == 'Household_Observation') {
      apiUrl =
        'https://9e876ldgu1.execute-api.us-east-1.amazonaws.com/Observation/';
    }else{
      apiUrl =
        'https://api.fluathome.org';
    }

    const data =
      'email_address=' +
      event.target.email.value +
      '&first_name=' +
      event.target.firstName.value +
      '&last_name=' +
      event.target.lastName.value +
      '&phone_number=' +
      event.target.phone.value +
      '&zip_code=' +
      zip;

    axios ({
      method: 'post',
      url: apiUrl,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then (function (response) {
        console.log(response)
        if (response.data.statusCode == '200') {
          setForm ('false');
          setErrorForm('false');
        }else{
          setErrorForm('true');
        }
      })
      .catch (function (error) {
        console.log (error);
        setErrorForm('true');
      });
  }

  return (
    <div>
      <h1 className="studyHeader">{headline}</h1>
      <ReactMarkdown source={description} />
      {form == 'true'
        ? <div>
            {name != 'Swab & Send Study'
              ? <form id="ty-subscribe" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    id="firstNameInput"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    id="lastNameInput"
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    id="emailInput"
                    name="email"
                    placeholder="Email Address"
                  />
                  <input
                    type="tel"
                    id="phoneInput"
                    name="phone"
                    placeholder="Phone Number"
                  />
                 
                  <input type="submit" value="Submit" />
                </form>
              : null}
            {urlConsent
              ? <a
                  className="btn btn-primary float-right next"
                  href={urlConsent}
                >
                  {urlConsentText}
                </a>
              : null}
          </div>
        : <div><h3>Thank You, We will contact you soon.</h3></div>}
        {errorForm == 'true' ? ( <h5 id="signup-error">
                    Sorry, there was an error submitting you form
                  </h5>):(null)}
    </div>
  );
};
export default Error;
