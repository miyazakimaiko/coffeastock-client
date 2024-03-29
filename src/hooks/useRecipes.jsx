import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import { useSignout, useUserData } from '../context/AccountContext';
import extractRecipeNoFromRecipeId from '../helpers/ExtractRecipeNoFromRecipeId';
import * as apiRecipes from '../api/Recipes'
import toastOnBottomCenter from '../utils/customToast';

export default function useRecipes(beanid) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['bean', beanid, 'recipes'], 
    async () => await apiRecipes.getRecipes(
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
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ?? 'An unknown error has ocurred.');
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
}

//["bean","5ce1ea33-411c-491f-9394-2660127d4fec","recipe","3"]
//["bean","5ce1ea33-411c-491f-9394-2660127d4fec","recipe","3"]