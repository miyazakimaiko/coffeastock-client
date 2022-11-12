import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { useSignout, useUserData } from '../context/AccountContext';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Recipes'

export default function useAddRecipe() {
  const user = useUserData(); 
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (body) => await api.addRecipe(
      user.sub, 
      body.bean_id, 
      body, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
      onSuccess: async (variables) => {
        await queryClient.invalidateQueries(['bean', variables[0].bean_id, 'recipes']);
        await queryClient.invalidateQueries('ranges');
        await queryClient.invalidateQueries(['recipes', 'summary']);
        await queryClient.invalidateQueries(['beans', 'summary']);
        await queryClient.invalidateQueries(['user', user.sub, 'totalUsedMb']);
        toastOnBottomCenter('success', 'Recipe is added successfully.');
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ? err.message : 'An unknown error has ocurred.');
      },
    }
  )
}