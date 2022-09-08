import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const Spinner = () => {
  return (
    <>
      <div className="opacity-50 fixed inset-0 z-40 flex justify-center items-center">
        <CgSpinner className="spinner w-12 h-12" />
      </div>
    </>
  )
}

export default Spinner