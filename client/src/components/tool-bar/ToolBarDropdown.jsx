import React from 'react'
import { capitalize } from '../../utils/HtmlConverter';
import Dropdown from '../elements/Dropdown';

const ToolbarDropdown = ({children, title}) => {
  return (
    <div className="relative h-full flex items-center justify-center mx-6">
      <Dropdown dropdownText={capitalize(title)}>
        <div className="dropdown-content">
        {children}
        </div>
      </Dropdown>
    </div>
  )
}

export default ToolbarDropdown