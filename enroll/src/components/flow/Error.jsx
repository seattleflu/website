import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {getStudy} from '../../services/api';
const ReactMarkdown = require ('react-markdown');
import axios from 'axios';
import ReactGA from 'react-ga';
import {Event} from '../../services/ga';
import Cookies from 'js-cookie';

const Error = props => {
  const [name, setName] = useState ('');
  const [headline, setHeadline] = useState ('');
  const [description, setDescription] = useState ('');
  const [urlConsent, setUrlConsent] = useState ('');
  const [urlConsentText, setUrlConsentText] = useState ('');
  const [zip, setZip] = useState ('none');
  const [form, setForm] = useState ('true');
  const [url, setUrl] = useState ('');
  const [errorForm, setErrorForm] = useState ('false');
  const [error, setError] = useState ('error-hide');
  const [firstNameError, setFistNameError] = useState ('false');
  const [lastNameError, setLastNameError] = useState ('false');
  const [emailError, setEmailError] = useState ('false');
  const [phoneError, setPhoneError] = useState ('false');

  const [firstName, setFirstName] = useState ('');
  const [lastName, setLastName] = useState ('');
  const [email, setEmail] = useState ('');
  const [phone, setPhone] = useState ('');

  const [firstNameValid, setFirstNameValid] = useState ('');
  const [lastNameValid, setLastNameValid] = useState ('');
  const [phoneValid, setPhoneValid] = useState ('');
  const [emailValid, setEmailValid] = useState ('');
  const [thankyouMessage, setThankyouMessage] = useState ('Thank You');
  const [errorMessage, setErrorMessage] = useState ('Form Error');
  const [validForm, setValidForm] = useState ('disabled');

  const [campaign, setCampaign] = useState ('');
  const [medium, setMedium] = useState ('');
  const [source, setSource] = useState ('');
  const [content, setContent] = useState ('not-set');
  const [hutk, setHutk] = useState('');

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    ReactGA.pageview ('/study/' + props.studyName);
  }

  useEffect (() => {
    setCampaign (Cookies.get ('utm_campaign'));
    setMedium (Cookies.get ('utm_medium'));
    setSource (Cookies.get ('utm_source'));
    setContent (Cookies.get ('utm_content'));
    setHutk (Cookies.get ('hubspotutk'));

    if (
      firstNameValid == 'valid' &&
      lastNameValid == 'valid' &&
      phoneValid == 'valid' &&
      emailValid == 'valid'
    ) {
      setValidForm ('');
    }
    setZip (props.zip);
    getStudy (props.studyName).then (studyData => {
      setName (studyData[0].fields.studyName);
      setHeadline (studyData[0].fields.headline);
      setDescription (studyData[0].fields.description);
      setUrlConsent (studyData[0].fields.urlConsent);
      setUrlConsentText (studyData[0].fields.urlButtonText);
      setUrl (studyData[0].fields.url);
      setThankyouMessage (studyData[0].fields.thankYouMessage);
      setErrorMessage (studyData[0].fields.errorMessage);
    });
    initializeReactGA ();
  }, []);

  function handleSSsubmit (event) {
    event.preventDefault ();

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (
        email
      )
    ) {
      setEmailValid ('notValid');
      setError ('error');
      console.log ('email is not valid' + email);
      setEmail ('');
      return false;
    } else {
      setEmailValid ('valid');
      const swabdata =
        'email_address=' +
        email +
        '&zip_code=' +
        zip +
        '&utm_campaign=' +
        campaign +
        '&utm_medium=' +
        medium +
        '&utm_source=' +
        source +
        '&utm_content=' +
        content +
        '&hutk=' +
        hutk;

      if (name == "Swab_and_Send"){
        Event ('Study Form', 'Sign Up', 'Swab & Send');
      }else{
        Event ('Study Form', 'Sign Up', 'Swab & Send Asymptomatic');
      }
      axios ({
        method: 'post',
        url: 'https://dnyz0i0eq4.execute-api.us-east-1.amazonaws.com/swab_and_send',
        data: swabdata,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then (function (response) {
          console.log (response);
          if (response.status == '200') {
            setForm ('false');
            setErrorForm ('false');
            window.location.href = urlConsent;
          } else {
            setErrorForm ('true');
          }
        })
        .catch (function (error) {
          setErrorForm ('true');
        });
    }
  }

  function handleSubmit (event) {
    event.preventDefault ();

    console.log ('Campaign: ' + campaign);
    console.log ('Medium: ' + medium);
    console.log ('Source: ' + source);

    let apiUrl = '';
    let gaName = '';
    if (name == 'Household_Intervention') {
      apiUrl =
        'https://qgxlw82k00.execute-api.us-east-1.amazonaws.com/Intervention/';
      gaName = 'Household Intervention';
    } else if (name == 'Household_Observation') {
      apiUrl =
        'https://9e876ldgu1.execute-api.us-east-1.amazonaws.com/Observation';
      gaName = 'Household Observation';
    } else if (name == 'Swab_and_Send') {
      apiUrl =
        'https://dnyz0i0eq4.execute-api.us-east-1.amazonaws.com/swab_and_send';
      gaName = 'Swab & Send';
    }else if (name == 'Swab_and_Send_or_Self_Test') {
      apiUrl =
        'https://dnyz0i0eq4.execute-api.us-east-1.amazonaws.com/swab_and_send';
      gaName = 'Swab & Send or Self Test';
    } else {
      apiUrl = 'https://api.fluathome.org';
    }

    const data =
      'email_address=' +
      email +
      '&first_name=' +
      firstName +
      '&last_name=' +
      lastName +
      '&phone_number=' +
      phone +
      '&zip_code=' +
      zip +
      '&utm_campaign=' +
      campaign +
      '&utm_medium=' +
      medium +
      '&utm_source=' +
      source +
      '&utm_content=' +
      content +
      '&hutk=' +
        hutk;

    if (
      firstNameValid == 'valid' &&
      lastNameValid == 'valid' &&
      phoneValid == 'valid' &&
      emailValid == 'valid'
    ) {
      setError ('error-hide');
      Event ('Study Form', 'Sign Up', gaName);
      axios ({
        method: 'post',
        url: apiUrl,
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then (function (response) {
          console.log ('response: ' + response);
          if (response.status == '200') {
            setForm ('false');
            setErrorForm ('false');
          } else {
            //setErrorForm ('true');
          }
        })
        .catch (function (error) {
          setErrorForm ('true');
        });
    } else {
      return false;
    }
  }
  function firstnameset (event) {
    if (/^([^0-9]*)$/.test (firstName)) {
      setFirstNameValid ('valid');
      setFirstName (event.target.value);
      setError ('error-hide');
      setValid ();
    } else {
      setFirstName (event.target.value);
      setFirstNameValid ('notValid');
      setError ('error');
    }
  }
  function lastnameset (event) {
    if (/^([^0-9]*)$/.test (lastName)) {
      setLastNameValid ('valid');
      setLastName (event.target.value);
      setError ('error-hide');
      setValid ();
    } else {
      setLastName (event.target.value);
      setLastNameValid ('notValid');
      setError ('error');
    }
  }
  function emailset (event) {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (
        event.target.value
      )
    ) {
      setEmailValid ('notValid');
      setError ('error');
      setEmail ('');
      setEmail (event.target.value);
    } else {
      setEmail (event.target.value);
      setEmailValid ('valid');
      setError ('error-hide');
      setValid ();
    }
  }
  function emailsetSingle (event) {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (
        event.target.value
      )
    ) {
      setEmailValid ('notValid');
      setError ('error');
      setEmail ('');
      setEmail (event.target.value);
    } else {
      setEmail (event.target.value);
      setEmailValid ('valid');
      setError ('error-hide');
      setValidForm ('');
    }
  }
  function phoneset (event) {
    if (
      /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/.test (
        event.target.value
      )
    ) {
      setPhoneValid ('valid');
      setError ('error-hide');
      setValid ();
      setPhone (event.target.value);
    } else {
      setPhoneValid ('notValid');
      setError ('error');
      setPhone (event.target.value);
    }
  }

  function setValid () {
    if (
      firstNameValid == 'valid' &&
      lastNameValid == 'valid' &&
      emailValid == 'valid'
    ) {
      setValidForm ('');
      console.log ('valid');
    } else {
      setValidForm ('disabled');
      console.log ('not valid');
    }
  }
  function setWhatForm(name){
    if(name == 'Swab_and_Send'){
      return false
    }else if(name == "Asymptomatic_Swab_and_Send_Study"){
      return false
    }else{
      return true
    }
  }

  return (
    <div>
      <h1 className="studyHeader">{headline}</h1>
      <ReactMarkdown source={description} />
      {form == 'true'
        ? <div>
            {setWhatForm(name)
              ? <form id="ty-subscribe" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    id="firstNameInput"
                    name="firstName"
                    placeholder="First Name (required)"
                    className={firstNameValid}
                    value={firstName}
                    onChange={firstnameset}
                  />

                  <input
                    type="text"
                    id="lastNameInput"
                    name="lastName"
                    placeholder="Last Name (required)"
                    className={lastNameValid}
                    value={lastName}
                    onChange={lastnameset}
                  />

                  <input
                    type="text"
                    id="emailInput"
                    name="email"
                    placeholder="Email Address (required)"
                    className={emailValid}
                    value={email}
                    onChange={emailset}
                  />

                  <input
                    type="tel"
                    id="phoneInput"
                    name="phone"
                    placeholder="Phone Number (required)"
                    className={phoneValid}
                    value={phone}
                    onChange={phoneset}
                  />
                  <input type="submit" value="Submit" disabled={validForm} />
                  <span className={error}>Invalid entry</span>
                </form>
              : <form id="ss-form" onSubmit={handleSSsubmit}>
                  <input
                    type="text"
                    id="emailInputSwab"
                    name="email"
                    placeholder="Email Address (required)"
                    className={emailValid}
                    value={email}
                    onChange={emailsetSingle}
                  />
                  <input
                    id="submitSwab"
                    type="submit"
                    value="Submit"
                    disabled={validForm}
                  />
                </form>}
            {/* urlConsent
              ? <a
                  className="btn btn-primary float-right next isDisabled"
                  href={urlConsent}
                >
                  {urlConsentText}
                </a>
              : null */}
          </div>
        : <div><h3>{thankyouMessage}</h3></div>}
      {errorForm == 'true'
        ? <h5 id="signup-error">
            {errorMessage}
          </h5>
        : null}
    </div>
  );
};
export default Error;
