import React from 'react'
import imgBeans from '../../assets/images/beans.png'

const TotalBeans = ({unit}) => {
  return (
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="
          w-full p-4 flex justify-between
          bg-white shadow-sm rounded-md"
      >
        <div>
          <img 
            src={imgBeans}
            alt="Coffee mill"
            className="w-20 h-20 mr-4"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="font-light text-lg">
            Total Beans
          </h3>
          <div className="flex items-end place-content-end">
            <span className="text-3xl">2.5</span>
            <span className="ml-1">{unit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalBeans
