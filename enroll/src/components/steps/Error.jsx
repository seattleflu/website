import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { getStudy } from '../../services/api'
const ReactMarkdown = require('react-markdown')

const Error = props => {
  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [description, setDescription] = useState('')
  const [urlConsent, setUrlConsent] = useState('')
  const [urlConsentText, setUrlConsentText] = useState('')

  useEffect(() => {
    getStudy(props.studyName).then(studyData => {
      setName(studyData[0].fields.studyName)
      setHeadline(studyData[0].fields.headline)
      setDescription(studyData[0].fields.description)
      setUrlConsent(studyData[0].fields.urlConsent)
      setUrlConsentText(studyData[0].fields.urlButtonText)
    })
  }, [])

  return (
    <div>
      <h1 className="studyHeader">{headline}</h1>
      <ReactMarkdown source={description} />
      {name != "Swab & Send Study" ?  
      (<form id="ty-subscribe">
        <input type="text" id="firstNameInput" name="firstName" placeholder="First Name" />
        <input type="text" id="lastNameInput" name="lastName" placeholder="Last Name"/>
        <input type="text" id="emailInput" name="Email" placeholder="Email Address"/>
         <input type="tel" id="phoneInput" name="phone" placeholder="Phone Number"/>
        <h5 id="signup-error">Sorry, there was an error submitting you form</h5>
        <input type="submit" value="Submit"/>
      </form>) : (null)}
            <a className='btn btn-primary float-right next' href={urlConsent}>
        {urlConsentText}
      </a>
    </div>
  )
}
export default Error
