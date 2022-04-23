import { useQuery, useQueryClient } from 'react-query';
import * as api from '../api/Ranges'

export default function useRange(userid, rangeName) {
  const queryClient = useQueryClient();

  return useQuery(
    ['ranges', `${rangeName}_range`],
    () => api.getRange(userid, rangeName), 
    {
      enabled: Boolean(userid) && Boolean(rangeName),
      initialData: () => { 
        if(queryClient.getQueryData('ranges')) {
          return queryClient.getQueryData('ranges')[`${rangeName}_range`]
        }
      },
      initialStale: true
    }
  )
}