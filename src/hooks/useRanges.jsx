import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

const useRanges = () => {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    'ranges', 
    async () => await api.getRanges(user.sub, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
      onSuccess: ranges => {
        Object.keys(ranges).forEach(range => {
          queryClient.setQueryData(['range', range], ranges[range])
        })
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

export default useRanges;