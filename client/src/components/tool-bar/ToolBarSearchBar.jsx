import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

const ToolBarSearchBar = ({value, onChange, placeholder = 'Search...', maxWidth = 'auto' }) => {
  return (
    <div className="relative w-full m-2"
      style={{maxWidth: maxWidth}}>
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-sm bg-creme blue-outline-transition"
      />
      <SearchIcon className="h-5 w-5 absolute left-3" style={{ top: '10px' }}/>
    </div>
  )
}

export default ToolBarSearchBar