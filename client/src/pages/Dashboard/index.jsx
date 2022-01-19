import React from 'react'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeans from './TotalBeans'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'

const Dashboard = () => {
  const title = "Dashboard";
  return (
    <>
      <div className="px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 md:mb-4">
          <TotalBrews />
          <TotalRecipes />
          <TotalBeans />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:mb-4">
          <ChartBarBeans />
          <ChartBarRecipes />
        </div>
      </div>
    </>
  )
}

export default Dashboard
