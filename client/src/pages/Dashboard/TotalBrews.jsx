import React from 'react'
import imgServer from '../../assets/images/server.png'

const TotalBrews = () => {
  return (
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="
          w-full p-4 flex justify-between
          bg-white shadow-sm rounded-md"
      >
        <div>
          <img 
            src={imgServer}
            alt="Coffee server"
            className="w-20 h-20 mr-4"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="font-light text-lg">
            Total Brews
          </h3>
          <div className="flex items-end place-content-end">
            <span className="text-3xl">1,500</span>
            <span className="ml-1">ml</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalBrews
