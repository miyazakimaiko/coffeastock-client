import React from 'react'
import { FaRocket } from 'react-icons/fa'

const Upgrade = ({totalUsedMbPercentage}) => {
  return (
    <div className="py-4 absolute bottom-0 left-4 right-4">
      <div className="text-xs pb-3 text-yellow font-medium">Trial ends in 7 days</div>
      <div className="flex justify-end text-xs opacity-80 mb-1">
        <span>~ {totalUsedMbPercentage}% storage used</span>
      </div>
      <div className="used-storage-bar">
        <div 
          className="bg-green h-full rounded-md"
          style={{ width: `${totalUsedMbPercentage}%` }}
        ></div>
      </div>
      <a 
        href="/plans"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="flex justify-center items-center mt-4 px-2 py-1 w-full rounded text-base text-center bg-red hover:bg-orange transition-all"
      >
        <FaRocket className="w-4 h-4 mr-2" />
        Upgrade
      </a>
    </div>
  )
}

export default Upgrade