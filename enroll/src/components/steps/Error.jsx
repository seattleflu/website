import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { getStudy } from '../../services/api'

const Error = props => {
  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [description, setDescription] = useState('')
  const [urlConsent, setUurlConsent] = useState('')
  
  
  useEffect(() => {

    getStudy(props.studyName).then(studyData => {
      console.log("test data: " + JSON.stringify(studyData[0].fields.studyName))
      setName(studyData[0].fields.studyName)
      setHeadline(studyData[0].fields.headline)
      setDescription(studyData[0].fields.description)
      setUurlConsent(studyData[0].fields.consent)
    })
  }, [])

  return (
    <div>
      <h2>Bounce Page</h2>
      <p>Name: {name}</p>
      <p>Headline: {headline}</p>
      <p>description: {description}</p>
      <p><a href={urlConsent} >Url Concent</a></p>
      
    </div>
  )
}
export default Error
