import { useQuery, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

const useRanges = () => {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useQuery(
    'ranges', 
    () => api.getRanges(user.sub, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
      onSuccess: ranges => {
        Object.keys(ranges).forEach(range => {
          queryClient.setQueryData(['range', range], ranges[range])
        })
      },
      refetchOnWindowFocus: false,
    }
  )
}

export default useRanges;