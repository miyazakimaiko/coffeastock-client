import React from 'react'
import { capitalize } from '../../../utils/HtmlConverter'

const DetailsTextarea = ({category, detailsValue, detailsOnChange}) => {
  return (
    <div className="form-section">
      <label className="font-medium">{capitalize(category)} Details</label>
      <textarea 
        type="text" 
        name="definition"
        autoComplete="off"
        placeholder="Details" 
        className="blue-outline-transition 
        block w-full h-32 py-2 px-3 rounded"
        value={detailsValue}
        onChange={detailsOnChange}
      />
    </div>
  )
}

export default DetailsTextarea