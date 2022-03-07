import React from 'react'

const FormTextarea = ({title, name, autoComplete = "off", value, onChange, warningText}) => {
  return (
    <div className="form-section">
      <label className="font-medium">{title}</label>
      <textarea 
        name={name}
        autoComplete={autoComplete}
        placeholder="e.g. Name of the shop you bought this coffee, the price and weight etc." 
        className=" h-40 blue-outline-transition bg-creme 
        block w-full text-base py-2 px-3 rounded-md border-1"
        value={value}
        onChange={onChange}
      />
      <span className="text-xs float-right mt-1">{warningText}</span>
    </div>
  )
}

export default FormTextarea