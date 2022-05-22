import React from 'react'
import { capitalize } from '../../../helpers/HtmlConverter'

const NameInput = ({category, nameValue, nameOnChange, nameWarningText}) => {
  return (
    <div className="form-section">
      <label className="font-medium mb-2">{capitalize(category)} Name</label>
      <input
        type="text" 
        name="label"
        autoComplete="off"
        placeholder={`Name`} 
        className="blue-outline-transition 
        block w-full py-2 px-3 rounded"
        value={nameValue}
        onChange={nameOnChange}
      />
      <span className="text-xs float-right mt-1">{nameWarningText}</span>
    </div>
  )
}

export default NameInput