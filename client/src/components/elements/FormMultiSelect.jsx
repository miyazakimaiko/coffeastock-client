import React from 'react'
import { MultiSelect } from 'react-multi-select-component'

const FormMultiSelect = ({title, note, options, value, onChange, isCreatable = false}) => {
  return (
    <div className="form-section">
      <label className="font-semibold">{title}</label>
      <span className="ml-2 text-sm">{note}</span>
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        isCreatable={isCreatable}
        labelledBy="Select"
      />
    </div>
  )
}

export default FormMultiSelect