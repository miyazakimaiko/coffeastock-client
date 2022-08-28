import { useQuery, useQueryClient } from 'react-query';
import * as api from '../api/Beans'

export default function useBean(userid, beanId, token) {
  const queryClient = useQueryClient();

  return useQuery(
    ['bean', beanId],
    () => api.getBean(userid, beanId, token), 
    {
      enabled: Boolean(userid) && Boolean(beanId),
      initialData: () => { 
        return queryClient.getQueryData('beans')?.find(d => d.bean_id == beanId)
      },
      initialStale: true
    }
  )
}