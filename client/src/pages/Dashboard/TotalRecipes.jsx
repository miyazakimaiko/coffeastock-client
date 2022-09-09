import React from 'react'
import { GiNotebook } from 'react-icons/gi'

const TotalRecipes = ({amount}) => {
  return (
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="
          w-full p-4 flex justify-between
          bg-white shadow-sm rounded-md"
      >
        <div className="flex flex-col justify-between">
          <h3 className="font-normal text-md opacity-60 mb-4">
            Total Recipes
          </h3>
          <div className="flex items-center">
            <div className="flex items-end">
              <span className="text-3xl font-medium">{amount ?? 0}</span>
              <span className="ml-1">recipes</span>
            </div>
            <div className="font-medium text-base ml-6 text-red">+15%</div>
          </div>
        </div>
        <GiNotebook className="w-8 h-8 opacity-40" />
      </div>
    </div>
  )
}

export default TotalRecipes
