import React, { useEffect, useState }  from 'react'
import useRecipesSummary from '../../hooks/useRecipesSummary'
import useUnits from '../../hooks/useUnits'
import useBeans from '../../hooks/useBeans'
import useUserInfo from '../../hooks/useUserInfo'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeans from './TotalBeans'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'
import useBeansSummary from '../../hooks/useBeansSummary'
import Spinner from '../../elements/Spinner'
import ErrorPage from '../error'
import RecentRecipes from './RecentRecipes'
import RssFeed from './RssFeed'
import useUserTotalUsedMb from '../../hooks/useUserTotalUsedMb'

const Dashboard = () => {
  const [beansBarChart, setBeansBarChart] = useState(null);
  const [recipesBarChart, setRecipesBarChart] = useState(null);
  const { 
    data: units, 
    isLoading: unitsAreLoading,
    isError: unitsHaveError,
  } = useUnits();

  const { 
    data: userInfo, 
    isLoading: userInfoAreLoading,
    isError: userInfoHaveError,
  } = useUserInfo();
  
  const {
    data: beansList,
    isLoading: beansListIsLoading,
    isError: beansHaveError,
  } = useBeans();

  const { 
    data: beansSummary, 
    isLoading: beansSummaryIsLoading,
    isError: beansSummaryHasError,
  } = useBeansSummary();
  
  const { 
    data: recipesSummary, 
    isLoading: recipesSummaryIsLoading,
    isError: recipesSummaryHasError,
  } = useRecipesSummary();

  const { 
    data: totalUsedMb, 
    isLoading: totalUsedMbIsLoading,
    isError: totalUsedMbHasError,
  } = useUserTotalUsedMb();

  console.log({totalUsedMb})

  useEffect(() => {
    if (beansSummary && beansList) {
      setBeansBarChart(
        <ChartBarBeans
          labels={beansSummary.graderanking.map(bean => (bean.label))}
          grades={beansSummary.graderanking.map(bean => (bean.grade))}
          avgRecipeRate={beansSummary.graderanking.map(bean => (bean.avg_recipe_rate))}
        />
      );
    }
  }, [beansSummary, beansList]);

  useEffect(() => {
    if (recipesSummary && beansList) {
      setRecipesBarChart(
        <ChartBarRecipes
          labels={recipesSummary.totalrateranking.map(recipe => ([beansList[recipe.bean_id].label, `(Recipe ${recipe.recipe_no})`]))}
          totalRates={recipesSummary.totalrateranking.map(recipe => (recipe.total_rate))}
          grades={recipesSummary.totalrateranking.map(recipe => (recipe.grade))}
        />
      );
    }
  }, [recipesSummary, beansList]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  if (unitsAreLoading 
    || userInfoAreLoading 
    || beansSummaryIsLoading 
    || recipesSummaryIsLoading 
    || beansListIsLoading
    || totalUsedMbIsLoading) 
  {
    return <Spinner />
  }

  if (beansHaveError 
    || unitsHaveError
    || userInfoHaveError
    || beansSummaryHasError
    || recipesSummaryHasError
    || totalUsedMbHasError) {
    return <ErrorPage />
  }
  
  return (
    <>
      <div className="px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:mb-6">
          <TotalBrews
            amount={recipesSummary.yieldsweight}
            unit={units['fluid' + userInfo.unit_fluid_weight_id].short_label}
          />
          <TotalRecipes
            amount={recipesSummary.count}
          />
          <TotalBeans
            amount={recipesSummary.groundsweight}
            unit={units['solid' + userInfo.unit_solid_weight_id].short_label}
          />
        </div>
        <div className="flex lg:mb-6">
          <div className="w-4/12">
            <RecentRecipes/>
          </div>
          <div className="w-5/12">
            {beansBarChart}
            {recipesBarChart}
          </div>
          <div className="w-3/12">
            <RssFeed />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
