import { useQuery, useQueryClient } from 'react-query';
import * as api from '../api/Users'

export default function useUserUnitIds(userid, token) {
  const queryClient = useQueryClient();

  return useQuery(
    ['user', 'units'],
    () => api.getUserUnitIds(userid, token), 
    {
      enabled: token ? true : false,
      initialData: () => { 
        return queryClient.getQueryData(['user', 'units']);
      },
      initialStale: true
    }
  )
}