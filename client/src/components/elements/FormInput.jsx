import React from 'react'

const FormInput = ({
  title, 
  note, 
  type,
  step,
  name, 
  autoComplete = "off", 
  placeholder, 
  value, 
  onChange, 
  warningText
}) => {
  return (
    <div className="form-section">
      <label className="font-medium">{title}</label>
      <span className="ml-2 text-sm">{note}</span>
      <input 
        type={type}
        step={step}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="blue-outline-transition bg-creme 
        block w-full text-base py-2 px-3 rounded-md border-1"
        value={value}
        onChange={onChange}
      />
      <span className="text-xs float-right mt-1">{warningText}</span>
    </div>
  )
}

export default FormInput