import React from 'react'

const FormBlendRatioInput = ({title, name, value, onChange}) => {
  return (
    <div className="flex justify-between items-center py-2">
      <label className="text-sm">{title}</label>
      <div className="percent-char">
        <input 
          type="number" 
          name={name}
          id={name}
          autoComplete="off"
          placeholder="e.g. 85.5"
          className="inline blue-outline-transition 
          bg-creme text-base py-2 px-3 rounded-md border-1"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default FormBlendRatioInput