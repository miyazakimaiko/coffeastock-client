import React from 'react'

const MultiselectConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
      <label className=" mr-4">{title}</label>
      <div className="font-medium">
        {content === null 
            ? 
          <p>-</p>
            :
          Array.isArray(content)
            ?
          content.map((c) => (
            <span className="basic-chip">{c.label}</span>
          ))
            :
          <span className="basic-chip">{content.label}</span>
        }
      </div>
    </div>
  )
}

export default MultiselectConfirmSection