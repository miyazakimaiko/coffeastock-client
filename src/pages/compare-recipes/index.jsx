import React, {  useEffect, useState } from 'react'
import FormMultiSelect from '../../elements/FormMultiSelect'
import Spinner from '../../elements/Spinner'
import useBeans from '../../hooks/useBeans'
import ErrorPage from '../error'
import RecipeSelectInput from './components/RecipeSelectInput'
import './compareRecipes.scss'
import RecipesInfoComparisonSection from './components/RecipesInfoComparisonSection'
import Mug from '../../assets/svgs/Mug'

const CompareRecipes = ({setTitle}) => {

  useEffect(() => {
    setTitle("Compare Recipes")
  }, [])

  const { data: beanList,
          isLoading,
          isError,
      } = useBeans();

  const [selectedBeanLeft, setSelectedBeanLeft] = useState(null);
  const [selectedBeanRight, setSelectedBeanRight] = useState(null);

  const [selectedRecipeLeft, setSelectedRecipeLeft] = useState(null);
  const [selectedRecipeRight, setSelectedRecipeRight] = useState(null);

  useEffect(() => {
    setSelectedRecipeLeft(null);
  }, [selectedBeanLeft])

  useEffect(() => {
    setSelectedRecipeRight(null);
  }, [selectedBeanRight])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) return <ErrorPage />

  return (
    <>
      <div className="mt-2 px-4 pt-8 w-full max-w-980px mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:w-full">
          <div className="md:w-1/2 border border-burnt-sienna border-opacity-20 rounded-md relative pt-8 pb-4 px-2 mx-2 mb-8 md:mb-0">
            <p className="absolute -top-2.5 left-6 bg-creme px-2">
              Recipe on Left (Red)
            </p>
            <span className={`text-xs pl-4 ${!selectedBeanLeft ? "font-semibold" : ""}`}>Select Beans</span>
            <FormMultiSelect
              options={Object.values(beanList)}
              isDisabled={false}
              value={selectedBeanLeft}
              onChange={setSelectedBeanLeft}
              isCreatable={false}
              isMulti={false}
            />
            {selectedBeanLeft ? (
              <>
                <span className={`text-xs pl-4 ${!selectedRecipeLeft ? "font-semibold" : ""}`}>Select Recipe</span>
                <RecipeSelectInput
                  beanId={selectedBeanLeft.bean_id}
                  value={selectedRecipeLeft}
                  onChange={setSelectedRecipeLeft}
                />
              </>
            ) : null}
          </div>
          <div className="md:w-1/2 border border-burnt-sienna border-opacity-20 rounded-md relative pt-8 pb-4 px-2 mx-2">
            <p className="absolute -top-2.5 left-6 bg-creme px-2">
              Recipe on Right (Blue)
            </p>
            <span className={`text-xs pl-4 ${!selectedBeanRight ? "font-semibold" : ""}`}>Select Beans</span>
            <FormMultiSelect
              options={Object.values(beanList)}
              isDisabled={false}
              value={selectedBeanRight}
              onChange={setSelectedBeanRight}
              isCreatable={false}
              isMulti={false}
            />
            {selectedBeanRight ? (
              <>
                <span className={`text-xs pl-4 ${!selectedRecipeRight ? "font-semibold" : ""}`}>Select Recipe</span>
                <RecipeSelectInput
                  beanId={selectedBeanRight.bean_id}
                  value={selectedRecipeRight}
                  onChange={setSelectedRecipeRight}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className=" max-w-980px mx-auto bg-white py-10 m-10 rounded-lg shadow-sm">
        <h3 className="mt-5 mb-16 text-xl text-center">
          Recipes Info Comparison
        </h3>
        {selectedRecipeLeft || selectedRecipeRight ? (
          <RecipesInfoComparisonSection 
            selectedRecipeLeftId={selectedRecipeLeft?.recipe_id}
            selectedRecipeRightId={selectedRecipeRight?.recipe_id}
          />
          ) : (
            <div className="flex justify-center">
              <Mug />
            </div>
          )
        }
      </div>
    </>
  );
}

export default CompareRecipes