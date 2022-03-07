import React from 'react'

const DetailsTextarea = ({category, detailsValue, detailsOnChange}) => {
  return (
    <div className="form-section">
      <label className="font-semibold">{category} details</label>
      <textarea 
        type="text" 
        name="definition"
        autoComplete="off"
        placeholder={`${category} details`} 
        className="blue-outline-transition 
        bg-creme block w-full h-32 text-base py-2 px-3 rounded-lg"
        value={detailsValue}
        onChange={detailsOnChange}
      />
    </div>
  )
}

export default DetailsTextarea