import { useQuery, useQueryClient } from 'react-query';
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useBean(beanId) {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useQuery(
    ['bean', beanId],
    () => api.getBean(user.sub, beanId, user.accessToken.jwtToken), 
    {
      enabled: user && beanId ? true : false,
      initialData: () => { 
        return queryClient.getQueryData('beans')?.find(d => d.bean_id == beanId)
      },
      initialStale: true,
      refetchOnWindowFocus: false,
    }
  )
}