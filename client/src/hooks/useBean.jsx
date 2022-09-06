import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toastOnBottomCenter from '../utils/customToast';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useBean(beanId) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['bean', beanId],
    async () => await api.getBean(user.sub, beanId, user.accessToken.jwtToken), 
    {
      enabled: user && beanId ? true : false,
      initialData: () => { 
        return queryClient.getQueryData('beans')?.find(d => d.bean_id == beanId)
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