import React from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const FormMultiSelect = ({title, required = false, options, value, onChange, isCreatable = false}) => {

  return (
    <div className="form-section">
      <label className="font-medium">{title}</label>
      {isCreatable ? 
        <CreatableSelect
          isMulti
          options={options}
          defaultValue={value}
          value={value}
          onChange={onChange}
        />
        :
        <Select
          isMulti
          options={options}
          defaultValue={value}
          value={value}
          onChange={onChange}
        />
      }
      <span className="text-xs float-right mt-1">
        {required && value === null ? "* Required" : ""}
      </span>
    </div>
  )
}

export default FormMultiSelect