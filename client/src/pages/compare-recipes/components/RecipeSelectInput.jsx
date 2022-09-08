import React from 'react'
import FormMultiSelect from '../../../elements/FormMultiSelect';
import Spinner from '../../../elements/Spinner';
import useRecipes from '../../../hooks/useRecipes';
import ErrorPage from '../../error';

const RecipeSelectInput = ({ beanId, value, onChange }) => {
  const { data: recipeList,
          isLoading,
          isError,
        } = useRecipes(beanId);
 
  if (isLoading) {
    return <Spinner />
  }

  if (isError) return <ErrorPage />

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