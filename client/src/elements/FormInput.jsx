import React from 'react'

const FormInput = ({
  title, 
  type,
  name, 
  autoComplete = "off", 
  placeholder, 
  value,
  invalid = false,
  onChange, 
  warningText,
  counterText
}) => {

  return (
    <div className="form-section">
      <label className="font-medium">{title}</label>
      <span className="text-xs ml-2">{warningText}</span>
      <input 
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${invalid ? 'red-outline' : 'blue-outline-transition'}
        block w-full py-2 px-3 rounded border-1`}
        value={value}
        onChange={onChange}
      />
      <span className="text-xs float-right mt-1">{counterText}</span>
    </div>
  )
}

export default FormInput