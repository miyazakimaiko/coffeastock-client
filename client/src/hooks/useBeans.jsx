import { useQuery, useQueryClient } from 'react-query'
import * as api from '../api/Beans'

export default function useBeans(userid) {
  const queryClient = useQueryClient();

  return useQuery(
    'beans', 
    () => api.getBeans(userid),
    {
      enabled: Boolean(userid),
      onSuccess: beans => {
        Object.values(beans).forEach(bean => {
          queryClient.setQueryData(['bean', bean.bean_id], bean)
        });
      }
    }
  )
}