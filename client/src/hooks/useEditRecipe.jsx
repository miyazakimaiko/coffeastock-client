import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { useSignout, useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
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
        await queryClient.invalidateQueries(['bean', variables[0].bean_id, 'recipe', variables[0].recipe_no])
        await queryClient.refetchQueries(['bean', variables[0].bean_id, 'recipes']) // it does not recognize inner values are changed, so it has to force refetch
        await queryClient.invalidateQueries('ranges');
        await queryClient.invalidateQueries(['recipes', 'summary']);
        toastOnBottomCenter('success', 'Recipe is edited successfully.')
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate('/login', { replace: true } );
          toastOnBottomCenter('error', 'Not authorized. Please login and try again.');
        }
        else toastOnBottomCenter('error', err.message ? err.message : 'An unknown error has ocurred.');
      },
    }
  )
}