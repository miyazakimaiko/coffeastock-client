import { BiSearch } from'react-icons/bi'
import React from 'react'

const ToolBarSearchBar = ({value, onChange, placeholder = 'Search...', maxWidth = 'auto' }) => {
  return (
    <div className="relative w-full mr-2 sm:mx-8"
      style={{maxWidth: maxWidth}}>
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-sm bg-creme blue-outline-transition"
      />
      <BiSearch className="h-5 w-5 absolute left-3" style={{ top: '10px' }}/>
    </div>
  )
}

export default ToolBarSearchBar