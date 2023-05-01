import  { FiEdit } from 'react-icons/fi';
import React from 'react'

const PencilAltIconButton = ({onClick, width}) => {
  return (
    <button
      type="button"
      className="opacity-80 hover:opacity-100 
      ease-linear transition-all duration-150"
      onClick={onClick} > 
      <FiEdit className={`h-${width} w-${width} ml-4`} />
    </button>
  )
}

export default PencilAltIconButton