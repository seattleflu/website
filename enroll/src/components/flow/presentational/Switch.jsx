import React from 'react'
import PropTypes from 'prop-types'

const options = [
  { value: 'none', label: '' },
  { value: 'yes', label: 'yes' },
  { value: 'no', label: 'no' }
]

const Input = ({ label, text, type, id, value, description, handleChange }) => (
  <div className='form-group row'>
    <div className='col-lg-8 col-md-6 col-sm-12'>
      <label htmlFor={label}>{text}</label>
      <p className='inputDescription'>{description}</p>
    </div>
    <select
      type={type}
      className='form-control hidden'
      id={id}
      value={value}
      onChange={handleChange}
      required
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    <div className='col-lg-4 col-md-6 col-sm-12'>
      <div className='buttonWrapper'>
        <button
          type='submit'
          value='yes'
          className={value == 'yes' ? 'switchYes switchYesActive' : 'switchYes'}
          onClick={handleChange}
        >
          YES
        </button>
        <button
          type='submit'
          value='no'
          className={value == 'no' ? 'switchNo switchNoActive' : 'switchNo'}
          onClick={handleChange}
        >
          NO
        </button>
      </div>
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
