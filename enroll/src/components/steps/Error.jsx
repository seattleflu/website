import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { getStudy } from '../../services/api'

const Error = props => {
  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [description, setDescription] = useState('')
  const [urlConsent, setUrlConsent] = useState('')

  useEffect(() => {
    getStudy(props.studyName).then(studyData => {
      console.log('STUDY NAME: ' + props.studyName)
      console.log('test data: ' + JSON.stringify(studyData[0].fields.studyName))
      setName(studyData[0].fields.studyName)
      setHeadline(studyData[0].fields.headline)
      setDescription(studyData[0].fields.description)
      setUrlConsent(studyData[0].fields.urlConsent)
    })
  }, [])

  return (
    <div>
      <h2>Study Page</h2>
      <p>Name: {name}</p>
      <p>Headline: {headline}</p>
      <p>description: {description}</p>
      <a href='{urlConsent}'>{urlConsent}</a>
    </div>
  )
}
export default Error
