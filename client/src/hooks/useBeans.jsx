import { useQuery, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useBeans() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useQuery(
    'beans', 
    () => api.getBeans(user.sub, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
      onSuccess: beans => {
        Object.values(beans).forEach(bean => {
          queryClient.setQueryData(['bean', bean.bean_id], bean)
        });
      },
      refetchOnWindowFocus: false,
    }
  )
}