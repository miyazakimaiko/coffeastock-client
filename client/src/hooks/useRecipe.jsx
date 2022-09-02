import { useQuery, useQueryClient } from 'react-query';
import { useUserData } from '../context/AccountContext';
import extractBeanIdFromRecipeId from '../helpers/ExtractBeanIdFromRecipeId';
import extractRecipeNoFromRecipeId from '../helpers/ExtractRecipeNoFromRecipeId';
import * as api from '../api/Recipes'

export default function useRecipe(recipeId) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const beanId = extractBeanIdFromRecipeId(recipeId);
  const recipeNo = extractRecipeNoFromRecipeId(recipeId);

  return useQuery(
    ['bean', beanId, 'recipe', recipeNo],
    () => api.getRecipe(
      user.sub, 
      beanId, 
      recipeNo, 
      user.accessToken.jwtToken
    ), 
    {
      enabled: user && beanId && recipeNo ? true : false,
      initialData: () => { 
        return queryClient.getQueryData(['bean', beanId, 'recipe', recipeNo])
      },
      initialStale: true,
    }
  )
}