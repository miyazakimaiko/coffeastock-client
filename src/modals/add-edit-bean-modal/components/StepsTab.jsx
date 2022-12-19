import React from 'react'

const StepsTab = ({key, title, tabState, disabled = false, onClick}) => {
  return (
    <li
      className="nav-item w-1/3" 
      key={key}>
      <button 
        role="tab"
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={
          (tabState ? "opacity-100" : "opacity-50") + 
          " w-full h-full p-2 text-white bg-burnt-sienna"
        } >
        {title}
      </button>
    </li>
  )
}

export default StepsTab