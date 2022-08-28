import React from 'react'
import { useUserData } from '../../../context/AccountContext';
import FormMultiSelect from '../../../elements/FormMultiSelect';
import useRecipes from '../../../hooks/useRecipes';

const RecipeSelectInput = ({ beanId, value, onChange }) => {
  const userData = useUserData();
  const { data: recipeList, isLoading } = useRecipes(userData.sub, beanId, userData.accessToken.jwtToken);
 
  if (isLoading) {
    return 'Loading...'
  }

  return (
    <FormMultiSelect
      options={recipeList}
      isDisabled={false}
      value={value}
      onChange={onChange}
      isCreatable={false}
      isMulti={false}
    />
  )
}

export default RecipeSelectInput