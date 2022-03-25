import React from 'react'

const FormRadio = ({title, name, checked, disabled = false, onChange}) => {
  return (
    
      <div className="mb-2 ml-4">
        <input
          type="radio" 
          name={name}
          checked={checked}
          disabled={disabled}
          className="mr-2"
          onChange={onChange}
        />
        <label className="capitalize">{title}</label>
      </div>
  )
}

export default FormRadio