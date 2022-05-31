import React from 'react'
import { unescapeHtml } from '../../../helpers/HtmlConverter'

const BlendRatioInput = ({title, name, value, onChange}) => {
  return (
    <div className="flex justify-between items-center py-2">
      <label className="">{unescapeHtml(title)}</label>
      <div className="percent-char w-1/2">
        <input 
          type="number" 
          name={name}
          id={name}
          autoComplete="off"
          placeholder="e.g. 85.5"
          className="inline blue-outline-transition w-3/4
          bg-creme py-2 px-3 rounded-md border-1"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default BlendRatioInput