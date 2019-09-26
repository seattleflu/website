import React from 'react'
import PropTypes from 'prop-types'
const Input = ({ label, text, type, id, value, description, handleChange }) => (
  <div className='form-group row'>
    <div className='col-lg-8 col-md-6 col-sm-12'>
      <label htmlFor={label}>{text}</label>
      <p className='inputDescription'>{description}</p>
    </div>
    <div className='col-lg-4 col-md-6 col-sm-12'>
      <input
        type={type}
        className='form-control'
        id={id}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  </div>
)
Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}
export default Input
