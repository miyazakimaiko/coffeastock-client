import { useQuery } from 'react-query';
import * as api from '../api/Ranges'

export default function useRange(userid, rangeName) {

  return useQuery(
    ['range', `${rangeName}_range`],
    () => api.getRange(userid, rangeName), 
    {
      enabled: Boolean(userid) && Boolean(rangeName),
    }
  )
}