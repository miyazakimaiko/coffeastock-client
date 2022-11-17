import React, { useEffect, useState } from 'react'
import PalateRadarChartDouble from '../../elements/PalateRadarChartDouble'
import Spinner from '../../elements/Spinner'
import useBeans from '../../hooks/useBeans'
import useRecipesSummary from '../../hooks/useRecipesSummary'
import ErrorPage from '../error'

const RecentRecipes = () => {

  const [chartContent, setChartContent] = useState(null);

  const { 
    data: recipesSummary, 
    isLoading: recipesSummaryIsLoading,
    isError: recipesSummaryHasError,
  } = useRecipesSummary();

  const { 
    data: beanList, 
    isLoading: beanListIsLoading,
    isError: beanListHasError,
  } = useBeans();

  useEffect(() => {
    if (recipesSummary.recentRecipes && beanList) {
      const recipeLeft = recipesSummary.recentRecipes[1];
      const recipeRight = recipesSummary.recentRecipes[0];

      setChartContent(
        <>
          <PalateRadarChartDouble
            className="w-full max-w-lg mx-auto"
            redTitle={recipeLeft ? `${beanList[recipeLeft.bean_id]?.label} (Recipe No.${recipeLeft.recipe_no})` : 'Not Selected'}
            blueTitle={recipeRight ? `${beanList[recipeRight.bean_id]?.label} (Recipe No. ${recipeRight.recipe_no})` : 'Not Selected'}
            redRatesObj={recipeLeft?.palate_rates}
            blueRatesObj={recipeRight?.palate_rates}
          />
        </>
      )
    }
  }, [recipesSummary, beanList])

  if (recipesSummaryIsLoading || beanListIsLoading) {
    return <Spinner />
  }

  if (recipesSummaryHasError || beanListHasError) {
    return <ErrorPage />
  }

  return (
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="
          w-full p-4 justify-between
          bg-white shadow-sm rounded-md"
      >
        <h3 className="font-normal text-md opacity-60 mb-4">
          Recently Added Recipes
        </h3>
        <div className="flex">
          <div className="w-full relative">
            {chartContent}
            {recipesSummary.recentRecipes.length < 2 && (
            <div className="absolute backdrop-filter backdrop-blur-sm bg-white/30 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
              <p className="text-lg text-burnt-sienna">
                No Data Available Yet...
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentRecipes
