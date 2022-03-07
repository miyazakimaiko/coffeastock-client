import React from 'react'

const BlueButton = ({text, disabled = false, onClick}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className="border-2 border-blue bg-blue text-white opacity-80 hover:opacity-100 font-bold blue-button
      uppercase text-md px-6 py-2 rounded-3xl button-transition"
      onClick={onClick}
    >
      {text} 
    </button>
  )
}

export default BlueButton