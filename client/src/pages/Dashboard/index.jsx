import React from 'react'
import Header from '../../shared/Header'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeans from './TotalBeans'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'

const Dashboard = () => {
  const title = "Dashboard";
  return (
    <>
      <Header title={title}/>
      <div className="px-2">
        <div className="flex mb-4">
          <TotalBrews />
          <TotalRecipes />
          <TotalBeans />
        </div>
        <div className="flex mb-4">
          <ChartBarBeans />
          <ChartBarRecipes />
        </div>
      </div>
    </>
  )
}

export default Dashboard
