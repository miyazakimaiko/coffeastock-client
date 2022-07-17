import { XIcon } from '@heroicons/react/outline'
import React, { useContext } from 'react'
import { ModalStateContext } from '../../context/ModalStateContext'

const DeleteModal = ({label, onDeleteSubmit}) => {
  const {closeModal} = useContext(ModalStateContext);

  // can add all delete functionality here for Bean, Recipe, and Range by using modal.mode

  return (
    <>
      <div
        className="justify-center flex overflow-x-hidden 
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">        
        <div className="relative w-full md:w-550px px-2 my-16 mx-auto">
          {/*content*/}
          <div
            className="border-0 rounded-lg
            shadow-lg relative flex flex-col 
            w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div 
              className="flex items-center justify-between p-3 rounded-t 
              border-b border-burnt-sienna border-opacity-20">
              <button
                className="p-1 ml-auto border-0 text-black float-right"
                onClick={closeModal}
              >
                <XIcon className="h-6 w-6"/>
              </button>
            </div>
            {/*body*/}
            <div className="card-content px-3 py-10">
              <p className='text-center'>
                Are you sure to delete the entry <strong>{label}</strong> ?
              </p>
            </div>
            <div className="flex items-center justify-between px-8 pb-8">
              <button
                className="text-red-500 background-transparent 
                  px-6 py-2  outline-none 
                focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red text-white opacity-80 
                hover:opacity-100    
                px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                type="submit"
                onClick={onDeleteSubmit}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default DeleteModal