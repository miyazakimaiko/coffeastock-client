import React from 'react'

const InputConfirmSection = ({title, content}) => {
  return (
    <div className="confirm-section">
    <label className=" mr-4">{title}</label>
    <p className="font-medium flex flex-wrap">{content !== null && content !== undefined && content.toString().length > 0 ? content : '-'}</p>
  </div>
  )
}

export default InputConfirmSection