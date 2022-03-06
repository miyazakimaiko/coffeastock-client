import React from 'react'
import Dropdown from '../elements/Dropdown';

const ToolbarDropdown = ({children, title}) => {
  return (
    <div className="relative h-full flex items-center mx-6">
      <Dropdown dropdownText={title.charAt(0).toUpperCase() + title.slice(1)}>
        <div className="dropdown-content">
        {children}
        </div>
      </Dropdown>
    </div>
  )
}

export default ToolbarDropdown