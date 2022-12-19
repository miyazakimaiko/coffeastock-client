import React from 'react'
import { FaRocket } from 'react-icons/fa'

const Feedback = () => {
  return (
    <div className="py-4 absolute bottom-0 left-4 right-4">
      <div className="text-xs text-yellow font-medium">You are currently using the beta version.</div>
      <a 
        href="/plans"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="flex justify-center items-center mt-4 px-2 py-1 w-full rounded text-base text-center bg-red hover:bg-orange transition-all"
      >
        <FaRocket className="w-4 h-4 mr-2" />
        Write a feedback
      </a>
    </div>
  )
}

export default Feedback