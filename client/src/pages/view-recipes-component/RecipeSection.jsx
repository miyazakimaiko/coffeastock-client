import React from 'react'
import { ArrowsExpandIcon, DuplicateIcon, PencilAltIcon, StarIcon, TrashIcon } from '@heroicons/react/outline'
import ChartRadarTaste from './ChartRadarTaste'

const RecipeSection = () => {
  return (
    <div className="relative p-4 w-1/3 max-w-md min-w-21">
      <div className="p-4 bg-white shadow-sm rounded-md">
        <div className="m-auto w-full">
          <ChartRadarTaste />
        </div>
        <div className="text-center py-4">
          <h4 className="text-lg">V60</h4>
          <span className="flex justify-center pt-2 text-yellow">
            <StarIcon className="h-5 w-5" />
            <StarIcon className="h-5 w-5" />
            <StarIcon className="h-5 w-5" />
            <StarIcon className="h-5 w-5" />
            <StarIcon className="h-5 w-5" />
          </span>
          <div className="pt-2">
            <span>Brewed on </span>
            <span>2021-12-21</span>
          </div>
        </div>
        <div className="flex justify-evenly pt-4 border-t-2 border-gray-100">
          <button>
            <TrashIcon 
              className="
                h-8 w-8 p-1
                border-1 border-gray-400 rounded-3xl
                transition-all duration-300 ease-out text-gray-400 hover:text-white hover:bg-gray-400" 
            />
          </button>
          <button>
            <DuplicateIcon 
              className="
                h-8 w-8 p-1
                border-1 border-blue rounded-3xl
                transition-all duration-300 ease-out text-blue hover:text-white hover:bg-blue" 
            />
          </button>
          <button>
            <PencilAltIcon 
              className="
                h-8 w-8 p-1
                border-1 border-green rounded-3xl
                transition-all duration-300 ease-out text-green hover:text-white hover:bg-green" 
            />
          </button>
          <button>
            <ArrowsExpandIcon 
              className="
                h-8 w-8 p-1
                border-1 border-orange rounded-3xl
                transition-all duration-300 ease-out text-orange hover:text-white hover:bg-orange" 
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeSection
