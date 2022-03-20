import React from 'react'

const RedOutlineButton = ({text, disabled = false, onClick}) => {
  return (
    <button
      className="border-2 border-red text-red opacity-80 
      hover:opacity-100  
      px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
      type="button"
      disabled={disabled}
      onClick={onClick}
    > 
      {text}
    </button>
  )
}

export default RedOutlineButton