import React from 'react'
import { useBeanList, useFetchBeanList } from '../../context/BeansContext'
import { useAttributeRangeList, useFetchAttributeRangeList } from '../../context/AttributeRangeContext'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeans from './TotalBeans'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'
import { useEffect } from 'react'
import { useUserData } from '../../context/AccountContext'

const Dashboard = () => {
  const userData = useUserData()
  const fetchAttributeRangeList = useFetchAttributeRangeList();
  const attributeRangeList = useAttributeRangeList();
  const fetchBeanList = useFetchBeanList()
  const beanList = useBeanList()

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (Object.keys(attributeRangeList).length === 0) {
      fetchAttributeRangeList(userData.sub);
    }
    if (Object.keys(beanList).length === 0) {
      fetchBeanList(userData.sub);
    }
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
