import React from 'react'

const MultiselectConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
      <label className="w-1/4">{title}</label>
      <div className="font-medium flex flex-wrap w-3/4">
        {
          Array.isArray(content)
            ?
          content.map((c) => (
            <span className="basic-chip">{c?.label}</span>
          ))
            :
            <p>-</p> 
        }
      </div>
    </div>
  )
}

export default MultiselectConfirmSection