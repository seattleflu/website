import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Error = props => {
  useEffect(() => {})

  return (
    <div>
      <h2>Bounce Page</h2>
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
export default Error
