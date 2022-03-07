import React from 'react'

const NameInput = ({category, nameValue, nameOnChange, nameWarningText}) => {
  return (
    <div className="form-section">
      <label className="font-medium mb-2">{category} name</label>
      <input
        type="text" 
        name="label"
        autoComplete="off"
        placeholder={`Name`} 
        className="blue-outline-transition 
        bg-creme block w-full text-base py-2 px-3 rounded-md"
        value={nameValue}
        onChange={nameOnChange}
      />
      <span className="text-xs float-right mt-1">{nameWarningText}</span>
    </div>
  )
}

export default NameInput