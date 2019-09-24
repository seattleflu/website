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
      <h2><ReactMarkdown source={headline} /></h2>
      <ReactMarkdown source={headline} />
      <ReactMarkdown source={description} />
            <a className='btn btn-primary float-left next' href={urlConsent}>
        {urlConsentText}
      </a>
    </div>
  )
}
export default Error
