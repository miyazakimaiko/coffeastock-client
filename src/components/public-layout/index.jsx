import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicHeader from '../public-header'

const PublicLayout = () => {
  return (
    <div className="bg-white font-sans text-xs md:text-sm text-burnt-sienna">
      <PublicHeader />
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default PublicLayout