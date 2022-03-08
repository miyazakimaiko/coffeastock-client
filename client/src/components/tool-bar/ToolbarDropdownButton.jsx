import React from 'react'
import { capitalize } from '../../utils/HtmlConverter'

const ToolbarDropdownButton = ({title, onClick, active}) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={(active ? "active " : "") + "dropdown-item"}>
        {capitalize(title)}
    </button>
  )
}

export default ToolbarDropdownButton