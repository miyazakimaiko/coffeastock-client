import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Recipes'

export default function useDeleteRecipe(beanid) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();


  return useMutation(
    async (body) => await api.deleteRecipe(user.sub, beanid, body, user.accessToken.jwtToken),
    {
      enabled: user && beanid ? true : false,
      onSuccess: async () => {
        await queryClient.refetchQueries(["bean", beanid, "recipes"])
        await queryClient.invalidateQueries('ranges');
        await queryClient.invalidateQueries(['recipes', 'summary']);
        toastOnBottomCenter('success', 'Recipe is deleted successfully.')
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