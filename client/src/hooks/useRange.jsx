import { useQuery } from 'react-query';
import * as api from '../api/Ranges'

export default function useRange(userid, rangeName, token) {

  return useQuery(
    ['range', `${rangeName}_range`],
    () => api.getRange(userid, rangeName, token), 
    {
      enabled: Boolean(userid) && Boolean(rangeName),
      keepPreviousData: true,
    }
  )
}