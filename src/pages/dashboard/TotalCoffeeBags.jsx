import React from 'react'
import { GiPaperBagFolded } from 'react-icons/gi'
import ChartLineBackground from './ChartLineBackground'

const TotalCoffeeBags = ({amount, beansCountByDayList}) => {
  return (
    <div className="px-1 sm:px-2 mb-2 sm:mb-4">
      <div className="relative overflow-hidden w-full p-2 md:p-4 flex justify-between bg-white shadow-sm rounded-md">
        <div className="z-20 flex flex-col justify-between">
          <h3 className="font-normal text-md opacity-60 mb-2">
            Total Beans Entries
          </h3>
          <div className="flex items-center">
            <div className="flex items-baseline">
              <span className="text-lg md:text-3xl font-medium">{amount ?? 0}</span>
              <span className="ml-1">bags</span>
            </div>
          </div>
        </div>
        <GiPaperBagFolded className="w-9 h-9 opacity-40" />
        <div className="z-10 absolute top-10 -bottom-3 -left-3 -right-3">
          <ChartLineBackground 
            data={beansCountByDayList} 
            color="rgb(184,216,215, 0.6)" // light blue
            max={1000}
          />
        </div>
      </div>
    </div>
  )
}

export default TotalCoffeeBags
