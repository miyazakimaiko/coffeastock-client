import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const Spinner = () => {
  return (
    <>
      <div className="bg-white opacity-50 fixed inset-0 z-40 flex justify-center items-center flex-col">
        <CgSpinner className="spinner w-16 h-16" />
        Loading...
      </div>
    </>
  )
}

export default Spinner