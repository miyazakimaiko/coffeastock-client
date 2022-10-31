import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toastOnBottomCenter from '../utils/customToast';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useBeansSummary() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['beans', 'summary'],
    () => api.getBeansSummary(user.sub, user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      initialData: () => { 
        return queryClient.getQueryData(['beans', 'summary'])
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
    }
  )
}