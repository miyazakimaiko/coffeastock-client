import React from 'react'

const ToolbarDropdownButton = ({title, onClick, active}) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={(active ? "active " : "") + "dropdown-item"}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
    </button>
  )
}

export default ToolbarDropdownButton