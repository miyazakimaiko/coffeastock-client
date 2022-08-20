import { useQuery, useQueryClient } from 'react-query';
import * as api from '../api/Recipes'

export default function useRecipe(userid, beanId, recipeId) {
  const queryClient = useQueryClient();

  return useQuery(
    ['bean', beanId, 'recipe', recipeId],
    () => api.getRecipe(userid, beanId, recipeId), 
    {
      enabled: Boolean(userid) && Boolean(beanId) && Boolean(recipeId),
      initialData: () => { 
        return queryClient.getQueryData(['bean', beanId, 'recipe', recipeId])
      },
      initialStale: true
    }
  )
}