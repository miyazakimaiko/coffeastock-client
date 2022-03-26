import React, { useState } from 'react'
import { ArrowsExpandIcon, DuplicateIcon, PencilAltIcon, StarIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import ChartRadarTaste from './ChartRadarTaste'
import { useAttributeRangeList } from '../../../context/AttributeRangeContext'

const RecipeSection = ({recipe}) => {
  const attributeRangeList = useAttributeRangeList()
  const {recipe_id, brew_date, extraction_time, method} = recipe
  const [hasExpanded, setExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const generateExtractionTime = () => {
    const extractionTime = Object.keys(extraction_time).map(timeUnit => {
      const unit = timeUnit === 'hours' ? 'hrs' : timeUnit === 'minutes' ? 'min' : 'sec';
      return `${extraction_time[timeUnit]} ${unit} `
    })
    return extractionTime
  }

  console.log('recipe: ', recipe)
  console.log('attr:', attributeRangeList)
  return (
    <>
      <div className="fiex p-4 mb-4 bg-white shadow-sm rounded-md w-full">
        <div className="w-1/3">
          <div className="flex justify-between">
            <p>{brew_date.split('T')[0]}</p>
            <p>{generateExtractionTime()}</p>
          </div>
          <h3 className="text-xl my-2">{attributeRangeList['method_range']['id-' + method]['label']}</h3>
          
        </div>
        <div>

        </div>
        <div>

        </div>
      </div>

      {showEditModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-medium">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-medium outline-none focus:outline-none"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default RecipeSection
