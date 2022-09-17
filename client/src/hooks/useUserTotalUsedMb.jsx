import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toastOnBottomCenter from '../utils/customToast';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Users'

export default function useUserTotalUsedMb() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['user', user.sub, 'totalUsedMb'],
    () => api.getUserTotalUsedMb(user.sub, user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      initialData: () => { 
        return queryClient.getQueryData(['user', user.sub, 'totalUsedMb'])
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate('/login', { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ? err.message : 'An unknown error has ocurred.');
      },
      initialStale: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}