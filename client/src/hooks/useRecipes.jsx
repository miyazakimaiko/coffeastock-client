import { useQuery, useQueryClient } from 'react-query'
import * as apiRecipes from '../api/Recipes'

export default function useRecipes(userid, beanid) {
  const queryClient = useQueryClient();

  return useQuery(
    ['bean', beanid, 'recipes'], 
    () => apiRecipes.getRecipes(userid, beanid),
    {
      enabled: Boolean(userid, beanid),
      onSuccess: recipes => {
        Object.values(recipes).forEach(recipe => {
          queryClient.setQueryData(['bean', recipe.bean_id, 'recipe', recipe.recipe_id], recipe)
        });
      }
    }
  );
}