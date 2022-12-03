import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import { useSignout, useUserData } from '../context/AccountContext';
import extractBeanIdFromRecipeId from '../helpers/ExtractBeanIdFromRecipeId';
import extractRecipeNoFromRecipeId from '../helpers/ExtractRecipeNoFromRecipeId';
import * as api from '../api/Recipes'

export default function useRecipe(recipeId) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const beanId = extractBeanIdFromRecipeId(recipeId);
  const recipeNo = extractRecipeNoFromRecipeId(recipeId);
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['bean', beanId, 'recipe', recipeNo],
    async () => await api.getRecipe(
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
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else {
          navigate(TO_GENERAL_ERROR, { replace: true } );
        }
      },
      initialStale: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}