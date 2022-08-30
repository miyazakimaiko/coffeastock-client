import { XIcon } from '@heroicons/react/outline'
import React from 'react'

const ModalWrapperContainer = ({ children, title, onCloseClick, maxWidthClass = "max-w-xl" }) => {
  return (
    <>
      <div
        className="justify-center flex overflow-x-hidden 
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div 
          className={`relative h-fit w-full md:px-2 md:my-8 mx-auto ${maxWidthClass}`}
        >
          <div 
            className="w-full border-0 rounded-lg shadow-lg relative py-4 px-6
            flex flex-col bg-white outline-none focus:outline-none"
          >
            {/*header*/}
            <div className="py-6">
              <h3 className="md:text-lg font-medium text-center">
                {title}
              </h3>
              <button
                className="absolute right-4 top-4 border-0 text-black float-right"
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

export default ModalWrapperContainer