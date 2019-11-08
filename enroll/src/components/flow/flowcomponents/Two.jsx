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

  const options = [
    { value: 'none', label: '' },
    { value: 'lessThan72h', label: 'Less than 72 hours' },
    {
      value: 'moreThan72hAndLessThan7d',
      label: 'More than 72 hours, but less than 7 days'
    },
    { value: 'moreThan7d', label: '7 Days or more' }
  ]

  return (
    <div className='col-12'>
      <p>FLOW TWO</p>
      <Select
          text={props.question10}
          description=''
          label='symptoms'
          type='select'
          id='symptoms'
          
          options={options}
          
        />
        <Switch
          text={props.question12}
          description={props.conditions12}
          label='symptoms'
          type='select'
          id='symptomsTest'
          
        />

         <Select
          text={props.question15}
          description=''
          label='symptoms'
          type='select'
          id='symptoms'
          
          options={options}
          
        />

        <Switch
          text={props.question16}
          description={props.conditions16}
          label='symptoms'
          type='select'
          id='symptomsTest'
          
        />
    </div>
  )
}
export default Two
