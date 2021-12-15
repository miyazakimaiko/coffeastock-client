import React from 'react'
import Header from '../shared/Header'
import ChartBarBeans from './dashboard-component/ChartBarBeans'
import ChartBarRecipes from './dashboard-component/ChartBarRecipes'
import ChartWorldMap from './dashboard-component/ChartWorldMap'
import TotalBeans from './dashboard-component/TotalBeans'
import TotalBrews from './dashboard-component/TotalBrews'
import TotalRecipes from './dashboard-component/TotalRecipes'

const Dashboard = () => {
  return (
    <>
      <Header/>
      <div className="flex mb-4">
        <TotalBrews />
        <TotalRecipes />
        <TotalBeans />
      </div>
      <div className="flex mb-4">
        <ChartBarBeans />
        <ChartBarRecipes />
      </div>
      <div>
        <ChartWorldMap />
      </div>
    </>
  )
}

export default Dashboard
