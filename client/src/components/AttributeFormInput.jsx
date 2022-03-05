import React, { useState } from 'react'
import './formInputs.scss'

const AttributeFormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { category, label, message, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  }

  return (
    <div className="form-section">
      <label className="font-semibold uppercase mb-2">{label}</label>
      { id === 2 
        ?
        <textarea 
          className="blue-outline-transition bg-creme block w-full h-32 text-base py-2 px-3 rounded-lg"
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
        />
        :
        <input
          className="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
        />
      }
      <span className="text-sm float-right mt-1">{message}</span>
    </div>
  )
}

export default AttributeFormInput