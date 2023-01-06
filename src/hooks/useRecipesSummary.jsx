import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Recipes'
import toastOnBottomCenter from '../utils/customToast';

export default function useRecipesSummary() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['recipes', 'summary'],
    async () => await api.getRecipesSummary(user.sub, user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      initialData: () => { 
        return queryClient.getQueryData(['recipes', 'summary'])
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
      initialStale: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}