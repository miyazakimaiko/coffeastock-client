import React, {  useEffect, useState } from 'react'
import { useUserData } from '../../context/AccountContext'
import FormMultiSelect from '../../elements/FormMultiSelect'
import useBeans from '../../hooks/useBeans'
import RecipeSelectInput from './components/RecipeSelectInput'
import './compareRecipes.scss'
import RecipesInfoComparisonSection from './components/RecipesInfoComparisonSection'

const CompareRecipes = () => {
  const userData = useUserData();
  const { data: beanList, isLoading } = useBeans(userData.sub);

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
    return 'Loading...'
  }

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto">
        <h3 className="mt-5 mb-10 text-xl text-center">Compare Recipes</h3>
        <div className="flex justify-between md:w-full">
          <div className="md:w-2/5 border border-burnt-sienna border-opacity-20 rounded-md relative py-4 px-2">
            <p className="absolute -top-2.5 left-6 bg-creme px-2">
              Recipe on Left (Red)
            </p>
            <FormMultiSelect
              options={Object.values(beanList)}
              isDisabled={false}
              value={selectedBeanLeft}
              onChange={setSelectedBeanLeft}
              isCreatable={false}
              isMulti={false}
            />
            {selectedBeanLeft ? (
              <RecipeSelectInput
                beanId={selectedBeanLeft.bean_id}
                value={selectedRecipeLeft}
                onChange={setSelectedRecipeLeft}
              />
            ) : null}
          </div>
          <div className="flex flex-col justify-around items-center py-4">
            <h4
              className={
                !selectedBeanLeft || !selectedBeanRight ? "font-semibold" : ""
              }
            >
              Select Beans
            </h4>
            {selectedBeanLeft || selectedBeanRight ? (
              <h4
                className={
                  selectedBeanLeft &&
                  selectedBeanRight &&
                  (!selectedRecipeLeft || !selectedRecipeRight)
                    ? "font-semibold"
                    : ""
                }
              >
                Select Recipes
              </h4>
            ) : null}
          </div>
          <div className="md:w-2/5 border border-burnt-sienna border-opacity-20 rounded-md relative py-4 px-2">
            <p className="absolute -top-2.5 left-6 bg-creme px-2">
              Recipe on Right (Blue)
            </p>
            <FormMultiSelect
              options={Object.values(beanList)}
              isDisabled={false}
              value={selectedBeanRight}
              onChange={setSelectedBeanRight}
              isCreatable={false}
              isMulti={false}
            />
            {selectedBeanRight ? (
              <RecipeSelectInput
                beanId={selectedBeanRight.bean_id}
                value={selectedRecipeRight}
                onChange={setSelectedRecipeRight}
              />
            ) : null}
          </div>
        </div>
      </div>

      {selectedRecipeLeft || selectedRecipeRight ? (
        <RecipesInfoComparisonSection 
          selectedRecipeLeftId={selectedRecipeLeft?.recipe_id}
          selectedRecipeRightId={selectedRecipeRight?.recipe_id}
        />
        ) : null
      }
    </>
  );
}

export default CompareRecipes