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
import RecentRecipes from './RecentRecipes'
import RssFeed from './RssFeed'
import TotalCoffeeBags from './TotalCoffeeBags'
import ViewBeansList from '../view-beans-list'

const Dashboard = ({setTitle}) => {

  useEffect(() => {
    setTitle("Dashboard");
  }, [])

  const [beansBarChart, setBeansBarChart] = useState(null);
  const [recipesBarChart, setRecipesBarChart] = useState(null);

  const { 
    data: units, 
    isLoading: unitsAreLoading,
  } = useUnits();

  const { 
    data: userInfo, 
    isLoading: userInfoAreLoading,
  } = useUserInfo();
  
  const {
    data: beansList,
    isLoading: beansListIsLoading,
  } = useBeans();

  const { 
    data: beansSummary, 
    isLoading: beansSummaryIsLoading,
  } = useBeansSummary();
  
  const { 
    data: recipesSummary, 
    isLoading: recipesSummaryIsLoading,
  } = useRecipesSummary();


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
          labels={recipesSummary.totalrateranking.map(
            recipe => ([beansList[recipe.bean_id].label, `(Recipe ${recipe.recipe_no})`])
          )}
          totalRates={recipesSummary.totalrateranking.map(
            recipe => (recipe.total_rate)
          )}
          grades={recipesSummary.totalrateranking.map(
            recipe => (recipe.grade)
          )}
        />
      );
    }
  }, [recipesSummary, beansList]);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  if (unitsAreLoading 
    || userInfoAreLoading 
    || beansSummaryIsLoading 
    || recipesSummaryIsLoading 
    || beansListIsLoading
  ) {
    return <Spinner />
  }
  
  return (
    <div className="max-w-[1177px] mx-auto pt-2 px-1 md:pt-4">
      <div className="w-full grid grid-cols-2 md:grid-cols-4">
        <TotalCoffeeBags
          amount={beansSummary.totalBeansCount}
          beansCountByDayList={beansSummary.beansCountsByDay}
        />
        <TotalBeansBrewed
          amount={recipesSummary.groundsweight}
          unit={units['solid' + userInfo.unit_solid_weight_id]?.short_label}
          groundWeightByDayList={recipesSummary.groundWeightTotalsByDay}
        />
        <TotalRecipes
          amount={recipesSummary.count}
          recipesCountByDayList={recipesSummary.recipesCountsByDay}
        />
        <TotalBrews
          amount={recipesSummary.yieldsweight}
          unit={units['fluid' + userInfo.unit_fluid_weight_id]?.short_label}
          yieldWeightByDayList={recipesSummary.yieldWeightTotalsByDay}
        />
      </div>
      <div className="flex flex-wrap px-0">
        <div className="w-full sm:w-1/2 xl:w-1/3">
          {recipesBarChart}
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/3">
          {beansBarChart}
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/3">
          <RecentRecipes/>
        </div>
        <div className="w-full sm:w-1/2 xl:w-full">
          <RssFeed />
        </div>
      </div>
      {/* <div className="w-full flex">
        <div className="lg:w-[70%]">
          <ViewBeansList />
        </div>

      </div> */}
    </div>
  )
}

export default Dashboard
