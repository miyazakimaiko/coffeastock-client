import React from 'react'

const MultiselectConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
      <label className="w-1/4">{title}</label>
      <div className="font-medium flex flex-wrap w-3/4">
        {content === null || content === undefined || content.length === 0 
            ? 
          <p>-</p>
            :
          Array.isArray(content)
            ?
          content.map((c) => (
            <span className="basic-chip">{c?.label}</span>
          ))
            :
          <span className="basic-chip">{content?.label}</span>
        }
      </div>
    </div>
  )
}

export default MultiselectConfirmSection