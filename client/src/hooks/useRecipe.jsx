import { useQuery, useQueryClient } from 'react-query';
import * as api from '../api/Recipes'
import extractBeanIdFromRecipeId from '../helpers/ExtractBeanIdFromRecipeId';
import extractRecipeNoFromRecipeId from '../helpers/ExtractRecipeNoFromRecipeId';

export default function useRecipe(userid, recipeId, token) {
  const queryClient = useQueryClient();
  const beanId = extractBeanIdFromRecipeId(recipeId);
  const recipeNo = extractRecipeNoFromRecipeId(recipeId);

  return useQuery(
    ['bean', beanId, 'recipe', recipeNo],
    () => api.getRecipe(userid, beanId, recipeNo, token), 
    {
      enabled: userid && beanId && recipeNo && token ? true : false,
      initialData: () => { 
        return queryClient.getQueryData(['bean', beanId, 'recipe', recipeNo])
      },
      initialStale: true,
    }
  )
}