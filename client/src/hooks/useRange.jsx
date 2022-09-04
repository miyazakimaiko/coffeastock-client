import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

export default function useRange(rangeName) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['range', `${rangeName}_range`],
    () => api.getRange(user.sub, rangeName, user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      keepPreviousData: true,
      initialData: () => { 
        return queryClient.getQueryData(['range', `${rangeName}_range`])
      },
      onError: err => {
        console.log({err})
        if (err.message === 'Not authorized') {
          signout();
          navigate('/login', { replace: true } );
        }
      },
      initialStale: true,
      refetchOnWindowFocus: false,
    }
  )
}