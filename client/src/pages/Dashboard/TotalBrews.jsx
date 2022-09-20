import React from 'react'
import { GiCoffeePot } from 'react-icons/gi'
import ChartLineBackground from './ChartLineBackground'

const TotalBrews = ({amount, unit, yieldWeightByDayList}) => {
  return (
    <div className="px-3 mb-4 md:mb-0">
      <div className="relative overflow-hidden w-full p-4 flex justify-between bg-white shadow-sm rounded-md">
        <div className="z-20 flex flex-col justify-between">
          <h3 className="font-normal text-md opacity-60 mb-4">
            Total Brew
          </h3>
          <div className="flex items-center">
            <div className="flex items-end">
              <span className="text-3xl font-medium">{amount ?? 0}</span>
              <span className="ml-1">{unit}</span>
            </div>
          </div>
        </div>
        <GiCoffeePot className="w-8 h-8 opacity-40" />
        <div className="z-10 absolute top-10 -bottom-3 -left-3 -right-3">
          <ChartLineBackground 
            data={yieldWeightByDayList} 
            color="rgb(213,193,171,0.5)" // brown
            max={1000}
          />
        </div>
      </div>
    </div>
  )
}

export default TotalBrews
