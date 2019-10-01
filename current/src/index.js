import React from 'react'
import ReactDOM from 'react-dom'
import CurrentConditions from './components/CurrentConditions';

const wrapper = document.getElementById('current')
wrapper ? ReactDOM.render(<CurrentConditions/>, wrapper) : false
