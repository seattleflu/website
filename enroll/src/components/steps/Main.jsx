import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Input from '../presentational/Input.jsx'
const Main = props => {
  useEffect(() => {})

  function handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  return (
    <div>
      <Input
        text='What is your Zip Code'
        label='zip_code'
        type='text'
        id='zipcode'
        value='zipcode'
        handleChange={handleChange}
      />
      <Input
        text='How old are you'
        label='age'
        type='text'
        id='zipcode'
        value='age'
        handleChange={handleChange}
      />
      <button
        className='btn btn-primary float-right'
        type='button'
        onClick={props.handleNext}
      >
        Next
      </button>
    </div>
  )
}
export default Main
