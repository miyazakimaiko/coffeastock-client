import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useBeans() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    'beans', 
    async () => await api.getBeans(user.sub, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
      onSuccess: beans => {
        Object.values(beans).forEach(bean => {
          queryClient.setQueryData(['bean', bean.bean_id], bean)
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
  )
}