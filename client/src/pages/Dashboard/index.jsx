import React from 'react'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeans from './TotalBeans'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'
import { useEffect } from 'react'
import { useUserData } from '../../context/AccountContext'
import useUnits from '../../hooks/useUnits'

const Dashboard = () => {
  const userData = useUserData();
  const units = useUnits(userData.accessToken.jwtToken);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <>
      <div className="px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:mb-6">
          <TotalBrews />
          <TotalRecipes />
          <TotalBeans />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:mb-6">
          <ChartBarBeans />
          <ChartBarRecipes />
        </div>
      </div>
    </>
  )
}

export default Dashboard
