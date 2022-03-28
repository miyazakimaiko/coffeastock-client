import React from 'react'

const MultiselectConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
      <label className=" mr-4">{title}</label>
      <div className="font-medium">
        {
          Array.isArray(content)
            ?
          content.map((c) => (
            <span className="basic-chip">{c.label}</span>
          ))
            :
            <p>-</p> 
        }
      </div>
    </div>
  )
}

export default MultiselectConfirmSection