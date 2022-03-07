import React from 'react'

const FormCheckbox = ({title, name, onChange}) => {
  return (
    <div className="form-section h-1/3 flex items-end justify-start">
      <div className="mb-2">
        <input type="checkbox" 
          name={name} 
          className="mr-2"
          onChange={onChange}
        />
        <label className="capitalize">{title}</label>
      </div>
    </div>
  )
}

export default FormCheckbox