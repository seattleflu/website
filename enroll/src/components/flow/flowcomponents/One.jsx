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



  return (
    <div className='col-12'>
    <p>FLOW ONE</p>
      <Switch
          text={props.question4}
          description={props.conditions4}
          label='symptoms'
          type='select'
          id='symptomsTest'
          
        />

        <Switch
          text={props.question5}
          description={props.conditions5}
          label='symptoms'
          type='select'
          id='symptomsTest'
          
        />

        <Switch
          text={props.question6}
          description={props.conditions6}
          label='symptoms'
          type='select'
          id='symptomsTest'
          
        />

        <Switch
          text={props.question7}
          description={props.conditions7}
          label='symptoms'
          type='select'
          id='symptomsTest'
          
        />

        <Switch
          text={props.question8}
          description={props.conditions8}
          label='symptoms'
          type='select'
          id='symptomsTest'
          
        />
    </div>
  )
}
export default One
