import { useQuery, useQueryClient } from 'react-query'
import * as api from '../api/Beans'

export default function useBeans(userid, token) {
  const queryClient = useQueryClient();

  return useQuery(
    'beans', 
    () => api.getBeans(userid, token),
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