import React from 'react'
import { MultiSelect } from 'react-multi-select-component'

const FormMultiSelect = ({title, required = false, options, value, onChange, isCreatable = false}) => {
  const valueRenderer = (selected) => {
    if (!selected.length) {
      return "Select or Create...";
    }
  }
  return (
    <div className="form-section">
      <label className="font-medium">{title}</label>
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        isCreatable={isCreatable}
        labelledBy="Select"
        valueRenderer={isCreatable ? valueRenderer : null}
      />
      <span className="text-xs float-right mt-1">
        {required && value.length === 0 ? "* Required" : ""}
      </span>
    </div>
  )
}

export default FormMultiSelect