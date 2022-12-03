import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Recipes'

export default function useEditRecipe() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (body) => await api.editRecipe(
      user.sub, 
      body, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
      onSuccess: async (variables) => {
        await queryClient.refetchQueries(['bean', variables[0].bean_id, 'recipes']) // it does not recognize inner values are changed, so it has to force refetch
        await queryClient.invalidateQueries(['bean', variables[0].bean_id, 'recipe', variables[0].recipe_no])
        await queryClient.invalidateQueries(['recipes', 'summary']);
        await queryClient.invalidateQueries(['beans', 'summary']);
        toastOnBottomCenter('success', 'Recipe is edited successfully.')
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
    }
  )
}