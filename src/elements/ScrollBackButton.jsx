import { ChevronDoubleUpIcon } from '@heroicons/react/outline'
import React from 'react'

const ScrollBackButton = () => {
  return (
    <button
      type="button"
      onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 rounded-3xl p-3 w-12 h-12 
        bg-green text-white opacity-80 hover:opacity-100 transition-opacity duration-150 ease-linear">
      <ChevronDoubleUpIcon className="h-6 w-6" />
    </button>
  )
}

export default ScrollBackButton