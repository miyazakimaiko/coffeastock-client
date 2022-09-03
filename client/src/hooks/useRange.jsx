import { useQuery, useQueryClient } from 'react-query';
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

export default function useRange(rangeName) {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useQuery(
    ['range', `${rangeName}_range`],
    () => api.getRange(user.sub, rangeName, user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      keepPreviousData: true,
      initialData: () => { 
        return queryClient.getQueryData(['range', `${rangeName}_range`])
      },
      initialStale: true,
      refetchOnWindowFocus: false,
    }
  )
}