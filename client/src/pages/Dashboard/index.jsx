import React from 'react'
import useUnits from '../../hooks/useUnits'
import useUserUnitIds from '../../hooks/useUserUnitIds'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeans from './TotalBeans'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'
import { useEffect } from 'react'

const Dashboard = () => {
  const { 
    data: units, 
    isLoading: unitsAreLoading 
  } = useUnits();

  const { 
    data: unitIds, 
    isLoading: unitIdsAreLoading 
  } = useUserUnitIds();

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  if (unitsAreLoading || unitIdsAreLoading) {
    return 'Loading...'
  }
  
  return (
    <>
      <div className="px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:mb-6">
          <TotalBrews
            unit={units['fluid' + unitIds['unit_fluid_weight_id']].short_label}
          />
          <TotalRecipes />
          <TotalBeans
            unit={units['solid' + unitIds['unit_solid_weight_id']].short_label}
          />
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
