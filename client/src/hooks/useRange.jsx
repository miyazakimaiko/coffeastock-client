import { useQuery } from 'react-query';
import * as api from '../api/Ranges'

export default function useRange(userid, rangeName, pageNumber) {

  return useQuery(
    ['range', `${rangeName}_range`, pageNumber],
    () => api.getRange(userid, rangeName, pageNumber), 
    {
      enabled: Boolean(userid) && Boolean(rangeName),
      keepPreviousData: true,
    }
  )
}