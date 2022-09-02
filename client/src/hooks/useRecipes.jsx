import { useQuery, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import extractRecipeNoFromRecipeId from '../helpers/ExtractRecipeNoFromRecipeId';
import * as apiRecipes from '../api/Recipes'

export default function useRecipes(beanid) {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useQuery(
    ['bean', beanid, 'recipes'], 
    () => apiRecipes.getRecipes(
      user.sub, 
      beanid, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
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