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
  const [errorForm, setErrorForm] = useState ('false');
  const [firstNameError, setFistNameError] = useState ('false');
  const [lastNameError, setLastNameError] = useState ('false');
  const [emailError, setEmailError] = useState ('false');
  const [phoneError, setPhoneError] = useState ('false');

  const [firstName, setFirstName] = useState ('');
  const [lastName, setLastName] = useState ('');
  const [email, setEmail] = useState ('');
  const [phone, setPhone] = useState ('');

  const [firstNameValid, setFirstNameValid] = useState ('valid');
  const [lastNameValid, setLastNameValid] = useState ('valid');
  const [phoneValid, setPhoneValid] = useState ('valid');
  const [emailValid, setEmailValid] = useState ('valid');

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    ReactGA.pageview ('/study/' + props.studyName);
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

  function handleSSsubmit(event){
    event.preventDefault ();
    window.location.href = urlConsent;
  }

  function handleSubmit (event) {
    event.preventDefault ();

    Event ('Enroll Screener', 'Study', url);
    let apiUrl = '';
    if (name == 'Household_Intervention') {
      apiUrl =
        'https://qgxlw82k00.execute-api.us-east-1.amazonaws.com/Intervention/';
    } else if (name == 'Household_Observation') {
      apiUrl =
        'https://qgxlw82k00.execute-api.us-east-1.amazonaws.com/Intervention/';
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
      zip;

    if (firstName < 1) {
      setFirstNameValid ('notValid');
      return false;
    } else {
      setFirstNameValid ('valid');
    }

    if (lastName < 1) {
      setLastNameValid ('notValid');
      return false;
    } else {
      setLastNameValid ('valid');
    }

    if (phone.length < 8) {
      setPhoneValid ('notValid');
      return false;
    } else {
      setPhoneValid ('valid');
    }

    if (email.length < 1) {
      setEmailValid ('notValid');
      return false;
    } else {
      setEmailValid ('valid');
      console.log ('email is valid ' + email);
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (
        email
      )
    ) {
      setEmailValid ('notValid');
      console.log ('email is not valid' + email);
      setEmail ('');
      return false;
    } else {
      setEmailValid ('valid');
      console.log ('email is valid ' + email);
    }

    if((firstName !='') && (lastName != '') && (phone >= 8) && (email != '')){
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
            setErrorForm('true');
          });
    }else{
      console.log(firstNameValid + lastNameValid + phoneValid + emailValid)
    }

    // axios ({
    //       method: 'post',
    //       url: apiUrl,
    //       data: data,
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     })
    //       .then (function (response) {
    //         console.log(response)
    //         if (response.data.statusCode == '200') {
    //           setForm ('false');
    //           setErrorForm('false');
    //         }else{
    //           setErrorForm('true');
    //         }
    //       })
    //       .catch (function (error) {
    //         setErrorForm('true');
    //       });
  }
  function firstnameset(event){
    setFirstName(event.target.value)
  }
  function lastnameset(event){
    setLastName(event.target.value)
  }
  function emailset(event){
    setEmail(event.target.value)
  }
  function phoneset(event){
    setPhone(event.target.value)
  }


  return (
    <div>
      <h1 className="studyHeader">{headline}</h1>
      <ReactMarkdown source={description} />
      {form == 'true'
        ? <div>
            {name != 'Swab_and_Send'
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
                  
                  <input type="submit" value="Submit" />
                </form>
              : <form id="ss-form" onSubmit={handleSSsubmit}>
                  <input
                    type="text"
                    id="emailInput"
                    name="email"
                    placeholder="Email Address (required)"
                    className={emailValid}
                    value={email}
                    onChange={emailset}
                  />
                  <input type="submit" value="Submit" />
                </form>}
            {urlConsent
              ? <a
                  className="btn btn-primary float-right next isDisabled"
                  href={urlConsent}
                >
                  {urlConsentText}
                </a>
              : null}
          </div>
        : <div><h3>Thank You, We will contact you soon.</h3></div>}
      {errorForm == 'true'
        ? <h5 id="signup-error">
            Sorry, there was an error submitting you form
          </h5>
        : null}
    </div>
  );
};
export default Error;
