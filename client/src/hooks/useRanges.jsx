import { useQuery, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'

const useRanges = (userid) => {
  const queryClient = useQueryClient();

  return useQuery(
    'ranges', 
    () => api.getRanges(userid),
    {
      enabled: Boolean(userid),
      onSuccess: ranges => {
        Object.keys(ranges).forEach(range => {
          queryClient.setQueryData(['range', range], ranges[range])
        })
      }
    }
  )
}

export default useRanges;