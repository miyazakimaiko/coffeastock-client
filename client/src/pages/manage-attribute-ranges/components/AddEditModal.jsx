import { XIcon } from '@heroicons/react/outline'
import React from 'react'

const AddEditModal = ({children, mode, category, onCloseClick}) => {
  const titleAdd = `Add New ${category}`
  const titleEdit = `Edit ${category}`

  return (
    <>
      <div
        className="justify-center flex 
        overflow-x-hidden overflow-y-auto 
        fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full md:w-550px px-2 my-16 mx-auto">
          {/*content*/}
          <div
            className="border-0 rounded-lg 
            shadow-lg relative flex flex-col 
            w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div 
              className="flex justify-center py-8 rounded-t 
              border-b border-burnt-sienna border-opacity-20">
              <h3 className="text-lg font-light font-capitals uppercase">
                {mode === 'add' ? titleAdd : titleEdit}
              </h3>
              <button
                className="absolute top-4 right-4 text-black"
                onClick={onCloseClick}>
                <XIcon className="h-6 w-6"/>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default AddEditModal