import React, { useState } from 'react'
import { useUserData } from '../../../context/AccountContext';
import FormMultiSelect from '../../../elements/FormMultiSelect';
import useRecipes from '../../../hooks/useRecipes';

const RecipeSelectInput = ({ beanId }) => {
  const userData = useUserData();
  const { data: recipeList, isLoading } = useRecipes(userData.sub, beanId);

  const [selectedRecipe, setSelectedRecipe] = useState([])
 
  if (isLoading) {
    return 'Loading...'
  }

  return (
    <FormMultiSelect
      options={recipeList}
      isDisabled={false}
      value={selectedRecipe}
      onChange={setSelectedRecipe}
      isCreatable={false}
      isMulti={false}
    />
  )
}

export default RecipeSelectInput