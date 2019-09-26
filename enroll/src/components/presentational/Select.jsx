import React from 'react'
import PropTypes from 'prop-types'
const Select = ({
  label,
  text,
  type,
  id,
  value,
  options,
  description,
  handleChange
}) => (
  <div className='form-group row'>
    <div className='col-lg-8 col-md-6 col-sm-12'>
      <label htmlFor={label}>{text}</label>
    {description != ''? "<p className='inputDescription'>" + description + "</p>" : null}
    </div>
    <div className='col-lg-4 col-md-6 col-sm-12'>
      <select
        type={type}
        className='form-control'
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
    </div>
  </div>
)
Select.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}
export default Select
