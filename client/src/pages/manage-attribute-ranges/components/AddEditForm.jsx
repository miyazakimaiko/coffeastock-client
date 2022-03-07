import React from 'react'

const AddEditForm = ({children, onCloseClick, onSubmit}) => {
  return (
    <div className="content">
      <form
        className="w-full"
        onSubmit={onSubmit}
      >
        <div className="bg-white px-6 shadow-sm rounded-md">
          <div className="mt-3 mb-6">
            {children}
          </div>
          <div className="flex items-center justify-between pl-4 pr-4 pb-8">
            <button
              className="text-red-500 background-transparent 
              font-bold uppercase px-6 py-2 text-md outline-none 
              focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onCloseClick}>
              Cancel
            </button>
            <button
              className="bg-blue text-white opacity-80 
              hover:opacity-100 font-bold uppercase text-md 
              px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
              type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddEditForm