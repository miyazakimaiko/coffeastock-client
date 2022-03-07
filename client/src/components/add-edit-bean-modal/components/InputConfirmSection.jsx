import React from 'react'

const InputConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
    <label className="text-sm mr-4">{title}</label>
    <p className="font-medium">{content !== null && content.length > 0 ? content : '-'}</p>
  </div>
  )
}

export default InputConfirmSection