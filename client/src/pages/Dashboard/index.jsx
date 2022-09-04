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

const Dashboard = () => {
  const [recipesBarChart, setRecipesBarChart] = useState(null);
  const { 
    data: units, 
    isLoading: unitsAreLoading 
  } = useUnits();

  const { 
    data: unitIds, 
    isLoading: unitIdsAreLoading 
  } = useUserUnitIds();

  const { 
    data: recipesSummary, 
    isLoading: recipesSummaryIsLoading 
  } = useRecipesSummary();

  const {
    data: beansList,
    isLoading: beansListIsLoading
  } = useBeans();

  useEffect(() => {
    if (recipesSummary) {
      // react-chart-js does not wrap labels text and no out-of-box solution for this.
      // for now we break up the label into half and set as a list
      // so that the chart can show the elements of the list next to each other
      const wrappedLabelsList = recipesSummary.totalrateranking.map(recipe => {
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
          return [s.substr(0, middle), s.substr(middle + 1), `(Recipe ${recipe.recipe_no})`] 
        }
        return [beansList[recipe.bean_id].label, `(Recipe ${recipe.recipe_no})`] 
      });

      setRecipesBarChart(
        <ChartBarRecipes
          labels={wrappedLabelsList}
          recipesData={recipesSummary.totalrateranking.map(recipe => (recipe.total_rate))}
        />
      );
    }
  }, [recipesSummary]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  if (unitsAreLoading || unitIdsAreLoading || recipesSummaryIsLoading || beansListIsLoading) {
    return 'Loading...'
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:mb-6">
          <ChartBarBeans />
          {recipesBarChart}
        </div>
      </div>
    </>
  )
}

export default Dashboard
