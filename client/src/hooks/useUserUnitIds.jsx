import { useQuery, useQueryClient } from 'react-query';
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Users'

export default function useUserUnitIds() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useQuery(
    ['user', 'units'],
    () => api.getUserUnitIds(user.sub, user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      initialData: () => { 
        return queryClient.getQueryData(['user', 'units']);
      },
      initialStale: true,
      refetchOnWindowFocus: false,
    }
  )
}