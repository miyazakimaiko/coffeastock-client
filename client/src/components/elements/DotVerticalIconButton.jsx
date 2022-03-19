import { DotsVerticalIcon } from '@heroicons/react/outline'
import React from 'react'

const DotVerticalIconButton = ({onClick, width}) => {
  return (
    <button
      type="button"
      className="opacity-80 hover:opacity-100 
      ease-linear transition-all duration-150"
      onClick={onClick} > 
      <DotsVerticalIcon className={`h-${width} w-${width} ml-4`} />
    </button>
  )
}

export default DotVerticalIconButton