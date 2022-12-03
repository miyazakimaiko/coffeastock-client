import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

export default function useRange(rangeName) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['range', `${rangeName}_range`],
    async () => await api.getRange(user.sub, rangeName, user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      keepPreviousData: true,
      initialData: () => { 
        return queryClient.getQueryData(['range', `${rangeName}_range`])
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