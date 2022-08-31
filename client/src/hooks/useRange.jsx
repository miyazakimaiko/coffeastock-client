import { useQuery, useQueryClient } from 'react-query';
import * as api from '../api/Ranges'

export default function useRange(userid, rangeName, token) {
  const queryClient = useQueryClient();

  return useQuery(
    ['range', `${rangeName}_range`],
    () => api.getRange(userid, rangeName, token), 
    {
      enabled: Boolean(userid) && Boolean(rangeName),
      keepPreviousData: true,
      initialData: () => { 
        return queryClient.getQueryData(['range', `${rangeName}_range`])
      },
      initialStale: true,
    }
  )
}