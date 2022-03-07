import React from 'react'

const MultiselectConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
      <label className="text-sm mr-4">{title}</label>
      <div className="tag-section font-medium">
        {content.length <= 0 ? 
          <p>-</p> :
          content.map((c) => (
            <span className="text-xs">{c.label}</span>
        ))}
      </div>
    </div>
  )
}

export default MultiselectConfirmSection