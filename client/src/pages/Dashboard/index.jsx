import React, { useEffect, useState }  from 'react'
import useRecipesSummary from '../../hooks/useRecipesSummary'
import useUnits from '../../hooks/useUnits'
import useBeans from '../../hooks/useBeans'
import useUserUnitIds from '../../hooks/useUserUnitIds'
import ChartBarBeans from './ChartBarBeans'
import ChartBarRecipes from './ChartBarRecipes'
import TotalBeans from './TotalBeans'
import TotalBrews from './TotalBrews'
import TotalRecipes from './TotalRecipes'
import useBeansSummary from '../../hooks/useBeansSummary'
import Spinner from '../../elements/Spinner'
import ErrorPage from '../error'

const Dashboard = () => {
  const [beansBarChart, setBeansBarChart] = useState(null);
  const [recipesBarChart, setRecipesBarChart] = useState(null);
  const { 
    data: units, 
    isLoading: unitsAreLoading,
    isError: unitsHaveError,
  } = useUnits();

  const { 
    data: unitIds, 
    isLoading: unitIdsAreLoading,
    isError: unitIdsHaveError,
  } = useUserUnitIds();
  
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


  useEffect(() => {
    if (beansSummary && beansList) {
      setBeansBarChart(
        <ChartBarBeans
          labels={makeWrappedLabelsList(beansSummary.graderanking, 'beans')}
          beansData={beansSummary.graderanking.map(bean => (bean.grade))}
        />
      );
    }
  }, [beansSummary, beansList]);

  useEffect(() => {
    if (recipesSummary && beansList) {
      setRecipesBarChart(
        <ChartBarRecipes
          labels={makeWrappedLabelsList(recipesSummary.totalrateranking, 'recipes')}
          recipesData={recipesSummary.totalrateranking.map(recipe => (recipe.total_rate))}
        />
      );
    }
  }, [recipesSummary, beansList]);

  function makeWrappedLabelsList(orderedItemsObj, type) {
    // react-chart-js does not wrap labels text and no out-of-box solution for this.
    // for now we break up the label into half and set as a list
    // so that the chart can show the elements of the list next to each other
    const wrappedLabelsList = orderedItemsObj.map(recipe => {
      const singleLabel = [];
      if (beansList[recipe.bean_id].label.length > 30) {
        const s = beansList[recipe.bean_id].label
        var middle = Math.floor(s.length / 2);
        var before = s.lastIndexOf(' ', middle);
        var after = s.indexOf(' ', middle + 1);

        if (middle - before < after - middle) {
            middle = before;
        } else {
            middle = after;
        }
        singleLabel.push(s.substr(0, middle));
        singleLabel.push(s.substr(middle + 1));
        if (type === 'recipes') {
          singleLabel.push(`(Recipe ${recipe.recipe_no})`);
        }
        return singleLabel;
      }
      singleLabel.push(beansList[recipe.bean_id].label);
      if (type === 'recipes') {
        singleLabel.push(`(Recipe ${recipe.recipe_no})`);
      }
      return singleLabel;
    });
    return wrappedLabelsList;
  }

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  if (unitsAreLoading 
    || unitIdsAreLoading 
    || beansSummaryIsLoading 
    || recipesSummaryIsLoading 
    || beansListIsLoading) 
  {
    return <Spinner />
  }

  if (beansHaveError 
    || unitsHaveError
    || unitIdsHaveError
    || beansSummaryHasError
    || recipesSummaryHasError) {
    return <ErrorPage />
  }
  
  return (
    <>
      <div className="px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:mb-6">
          <TotalBrews
            amount={recipesSummary.yieldsweight}
            unit={units['fluid' + unitIds['unit_fluid_weight_id']].short_label}
          />
          <TotalRecipes
            amount={recipesSummary.count}
          />
          <TotalBeans
            amount={recipesSummary.groundsweight}
            unit={units['solid' + unitIds['unit_solid_weight_id']].short_label}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:mb-6">
          {beansBarChart}
          {recipesBarChart}
        </div>
      </div>
    </>
  )
}

export default Dashboard
