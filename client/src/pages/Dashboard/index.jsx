import React, { useEffect, useState }  from 'react'
import useRecipesSummary from '../../hooks/useRecipesSummary'
import useUnits from '../../hooks/useUnits'
import useBeans from '../../hooks/useBeans'
import useUserInfo from '../../hooks/useUserInfo'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeansBrewed from './TotalBeansBrewed'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'
import useBeansSummary from '../../hooks/useBeansSummary'
import Spinner from '../../elements/Spinner'
import ErrorPage from '../error'
import RecentRecipes from './RecentRecipes'
import RssFeed from './RssFeed'
import useUserTotalUsedMb from '../../hooks/useUserTotalUsedMb'
import TotalCoffeeBags from './TotalCoffeeBags'

const Dashboard = ({setTitle}) => {

  // useEffect(() => {
  //   setTitle("Dashboard");
  // }, [])

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
  }, [beansSummaryIsLoading, beansListIsLoading]);

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
      <div className="px-0 pt-4 md:px-4 md:pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <TotalCoffeeBags
            amount={beansSummary.totalBeansCount}
            beansCountByDayList={beansSummary.beansCountsByDay}
          />
          <TotalBeansBrewed
            amount={recipesSummary.groundsweight}
            unit={units['solid' + userInfo.unit_solid_weight_id].short_label}
            groundWeightByDayList={recipesSummary.groundWeightTotalsByDay}
          />
          <TotalRecipes
            amount={recipesSummary.count}
            recipesCountByDayList={recipesSummary.recipesCountsByDay}
          />
          <TotalBrews
            amount={recipesSummary.yieldsweight}
            unit={units['fluid' + userInfo.unit_fluid_weight_id].short_label}
            yieldWeightByDayList={recipesSummary.yieldWeightTotalsByDay}
          />
        </div>
        <div className="flex md:mb-6 flex-wrap">
          <div 
            className="flex flex-col w-full
                       md:flex-row
                       xl:flex-col xl:w-5/12"
          >
            <div className="w-full md:w-1/2 xl:w-full">
              {beansBarChart}
            </div>
            <div className="w-full md:w-1/2 xl:w-full">
              {recipesBarChart}
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-4/12">
            <RecentRecipes/>
          </div>
          <div className="w-full md:w-1/2 xl:w-3/12">
            <RssFeed />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
