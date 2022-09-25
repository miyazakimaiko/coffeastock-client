import React from 'react'

const StepsTab = ({key, title, tabState, disabled = false, onClick}) => {
  return (
    <li
      className="nav-item w-1/2 sm:w-1/4" 
      key={key}>
      <button 
        role="tab"
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={
          (tabState ? "active " : "") + 
          "w-full h-full p-2 text-white bg-burnt-sienna opacity-50"
        } >
        {title}
      </button>
    </li>
  )
}

export default StepsTab