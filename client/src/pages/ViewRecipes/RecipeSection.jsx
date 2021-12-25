import React, { useState } from 'react'
import { ArrowsExpandIcon, DuplicateIcon, PencilAltIcon, StarIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import ChartRadarTaste from './ChartRadarTaste'
import { Collapse } from 'react-bootstrap';

const RecipeSection = ({recipeId}) => {
  const [hasExpanded, setExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="relative p-3 min-w-21 transition-width transition-slowest ease">
        <div className="py-4 bg-white shadow-sm rounded-md">
          <div className="flex flex-wrap">
            <div className="px-4 mx-auto">
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
            </div>
            <Collapse in={hasExpanded} dimension="width" className="px-4  mx-auto max-w-screen-md">
              <div id={recipeId}>
                <table className="coffee-details-table">
                  <tbody>
                    <tr>
                      <th>Roaster: </th>
                      <td>Waltz Coffee Roastery</td>
                    </tr>
                    <tr>
                      <th>Roast Date: </th>
                      <td>2021/10/21</td>
                    </tr>
                    <tr>
                      <th>Origin: </th>
                      <td>Brazil, Colombia, Kenya</td>
                    </tr>
                    <tr>
                      <th>Process: </th>
                      <td>Washed</td>
                    </tr>
                    <tr>
                      <th>Variety: </th>
                      <td>Caturra, Typica, Burbon</td>
                    </tr>
                    <tr>
                      <th>Grade: </th>
                      <td>9.5</td>
                    </tr>
                    <tr>
                      <th>Roast Level: </th>
                      <td>7</td>
                    </tr>
                    <tr>
                      <th>Variety: </th>
                      <td>Caturra, Typica, Burbon</td>
                    </tr>
                    <tr>
                      <th>Grade: </th>
                      <td>9.5</td>
                    </tr>
                    <tr>
                      <th>Roast Level: </th>
                      <td>7</td>
                    </tr>
                    <tr>
                      <th>Comment: </th>
                      <td>I really like this coffee, and think the best one from this roastery. Very fruty and mild yet strong body. Very nice when brewed with V60... I really like this coffee, and think the best one from this roastery. Very fruty and mild yet strong body. Very nice when brewed with V60...</td>
                    </tr>
                  </tbody>
                </table>            
              </div>
            </Collapse>
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
            <button
              onClick={() => setShowEditModal(true)}
              type="button"
            >
              <PencilAltIcon 
                className="
                  h-8 w-8 p-1
                  border-1 border-green rounded-3xl
                  transition-all duration-300 ease-out text-green hover:text-white hover:bg-green" 
              />
            </button>
            <button 
              onClick={() => setExpanded(!hasExpanded)} 
              aria-controls={recipeId}
              aria-expanded={hasExpanded}
              type="button"
            >
              { hasExpanded === true ? (
                <XIcon 
                className="
                  h-8 w-8 p-1
                  border-1 border-orange rounded-3xl
                  transition-all duration-300 ease-out text-orange hover:text-white hover:bg-orange" 
                />
              ) :
                <ArrowsExpandIcon 
                  className="
                    h-8 w-8 p-1
                    border-1 border-orange rounded-3xl
                    transition-all duration-300 ease-out text-orange hover:text-white hover:bg-orange" 
                />
              }
            </button>
          </div>
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
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
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
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
