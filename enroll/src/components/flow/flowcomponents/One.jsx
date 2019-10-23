import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
import Switch from '../presentational/Switch.jsx'
import ReactGA from 'react-ga';
import {Event} from '../../../services/ga';

const One = props => {
  

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    //ReactGA.pageview(' /enroll')
  }

  useEffect(() => {
    initializeReactGA ();
  }, [])


  const who = [
    { value: 'none', label: '' },
    { value: 'myself', label: 'Myself' },
    { value: 'over18', label: 'Someone in my household over 18' },
    { value: 'under18', label: 'My child or legal ward under 18' }
  ]

  return (
    <div className='col-12'>
      <p>FLOW ONE</p>
    </div>
  )
}
export default One
