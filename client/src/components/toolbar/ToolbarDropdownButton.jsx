import React from 'react'
import { capitalize } from '../../helpers/HtmlConverter'

const ToolbarDropdownButton = ({title, onClick, active}) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={(active ? "active " : "") + "dropdown-item my-2"}>
        {capitalize(title)}
    </button>
  )
}

export default ToolbarDropdownButton