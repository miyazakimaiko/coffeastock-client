import React from 'react'
import { Outlet } from 'react-router-dom'
import BasicHeader from '../basic-header'

const BasicLayout = () => {
  return (
    <div className="bg-white font-sans text-xs md:text-sm text-burnt-sienna">
      <BasicHeader />
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default BasicLayout