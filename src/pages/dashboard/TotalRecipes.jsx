import React from 'react'
import { GiNotebook } from 'react-icons/gi'
import ChartLineBackground from './ChartLineBackground'

const TotalRecipes = ({amount, recipesCountByDayList}) => {
  return (
    <div className="px-1 sm:px-2 mb-2 sm:mb-4">
      <div className="relative overflow-hidden w-full p-2 md:p-4 flex justify-between bg-white shadow-sm rounded-md">
        <div className="z-20 flex flex-col justify-between">
          <h3 className="font-normal text-md opacity-60 mb-2">
            Total Recipes
          </h3>
          <div className="flex items-center">
            <div className="flex items-baseline">
              <span className="text-lg md:text-3xl font-medium">{amount ?? 0}</span>
              <span className="ml-1">recipes</span>
            </div>
          </div>
        </div>
        <GiNotebook className="w-8 h-8 opacity-40" />
        <div className="z-10 absolute top-10 -bottom-3 -left-3 -right-3">
          <ChartLineBackground 
            data={recipesCountByDayList} 
            color="rgb(255,143,93,0.3)" // orange
            max={1000}
          />
        </div>
      </div>
    </div>
  )
}

export default TotalRecipes
