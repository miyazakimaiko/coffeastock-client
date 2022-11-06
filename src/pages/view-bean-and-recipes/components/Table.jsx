import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../../../elements/Spinner';
import useRanges from '../../../hooks/useRanges';
import useRecipes from '../../../hooks/useRecipes';
import ErrorPage from '../../error';
import { ORDER_BY, ORDER_METHOD } from '../utils/RecipeOrderConstants';
import Rows from './Rows';

const Table = ({searchValue, orderBy, orderMethod}) => {
  const { id } = useParams();

  const { data: ranges, 
          isLoading: rangesAreLoading,
          isError: rangesHaveError,
        } = useRanges();

  const { data: recipes, 
          isLoading: recipesAreLoading,
          isError: recipesHaveError,
        } = useRecipes(id);
        
  const [sortedRecipes, setSortedRecipes] = useState(recipes)

  useEffect(() => {
    sortRecipes();
  }, [])

  useEffect(() => {
    sortRecipes();
  }, [rangesAreLoading, recipesAreLoading, orderBy, orderMethod])

  function sortRecipes() {
    if (Boolean(ranges) && Boolean(recipes)) {
      if (orderBy === ORDER_BY.DATE_EDITED) {
        setSortedRecipes(recipes);
      }
      else if ([ORDER_BY.GRINDER, ORDER_BY.METHOD, ORDER_BY.WATER].includes(orderBy)) {
        setSortedRecipes(recipeRangeSort());
      }
      else setSortedRecipes(alphaNumericSort());
    }
  }

  function alphaNumericSort() {
    return Object.values(recipes).sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return orderMethod === ORDER_METHOD.ASC ? -1 : 1;
      }
      else if (a[orderBy] > b[orderBy]) {
        return orderMethod === ORDER_METHOD.ASC ? 1 : -1;
      }
      return 0;
    });
  }

  function recipeRangeSort() {
    const range = ranges[`${orderBy}_range`];

    return Object.values(recipes).sort((a, b) => {
      const aId = a[orderBy][0];
      const bId = b[orderBy][0];

      if (range[aId]?.label < range[bId]?.label) {
        return orderMethod === ORDER_METHOD.ASC ? -1 : 1;
      }
      else if (range[aId]?.label > range[bId]?.label) {
        return orderMethod === ORDER_METHOD.ASC ? 1 : -1;
      }
      return 0;
    });
  }

  function search(data) {
    const keys = ["brew_date", "grind_size"];

    if (Boolean(searchValue) && searchValue.length !== 0) {
      return data.filter((item) => 
        keys.some(key => item[key].toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
    return data;
  }

  if (rangesAreLoading || recipesAreLoading) {
    return <Spinner />
  }

  if (rangesHaveError || recipesHaveError) {
    return <ErrorPage />
  }

  return (
    <div className="flex mb-4 w-full flex-wrap justify-center">
      <Rows data={search(sortedRecipes ?? recipes)}/>
    </div>
  )
}

export default Table