import React from 'react'

const MultiselectConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
      <label className=" mr-4">{title}</label>
      <div className="tag-section font-medium">
        {content === null 
            ? 
          <p>-</p>
            :
          Array.isArray(content)
            ?
          content.map((c) => (
            <span className="text-xs">{c.label}</span>
          ))
            :
          <span className="text-xs">{content.label}</span>
        }
      </div>
    </div>
  )
}

export default MultiselectConfirmSection