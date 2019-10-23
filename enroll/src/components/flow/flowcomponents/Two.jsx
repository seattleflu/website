import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Select from '../presentational/Select.jsx'
import Switch from '../presentational/Switch.jsx'
import ReactGA from 'react-ga';
import {Event} from '../../../services/ga';

const Two = props => {
  

  function initializeReactGA () {
    ReactGA.initialize ('UA-135203741-3');
    //ReactGA.pageview(' /enroll')
  }

  useEffect(() => {
    initializeReactGA ();
  }, [])

  return (
    <div className='col-12'>
      <p>FLOW TWO</p>
    </div>
  )
}
export default Two
