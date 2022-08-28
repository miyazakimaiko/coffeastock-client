import { useQuery, useQueryClient } from 'react-query'
import * as apiRecipes from '../api/Recipes'
import extractRecipeNoFromRecipeId from '../helpers/ExtractRecipeNoFromRecipeId';

export default function useRecipes(userid, beanid, token) {
  const queryClient = useQueryClient();

  return useQuery(
    ['bean', beanid, 'recipes'], 
    () => apiRecipes.getRecipes(userid, beanid, token),
    {
      enabled: Boolean(userid, beanid),
      onSuccess: recipes => {
        recipes.forEach(recipe => {
          queryClient.setQueryData(
            [
              "bean",
              recipe.bean_id,
              "recipe",
              extractRecipeNoFromRecipeId(recipe.recipe_id),
            ],
            recipe
          );
        });
      }
    }
  );
}

//["bean","5ce1ea33-411c-491f-9394-2660127d4fec","recipe","3"]
//["bean","5ce1ea33-411c-491f-9394-2660127d4fec","recipe","3"]