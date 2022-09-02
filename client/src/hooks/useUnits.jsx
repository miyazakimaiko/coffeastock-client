import { useQuery, useQueryClient } from 'react-query';
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Units'

export default function useUnits() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useQuery(
    ['units'],
    () => api.getUnits(user.accessToken.jwtToken), 
    {
      enabled: user ? true : false,
      initialData: () => { 
        return queryClient.getQueryData('units');
      },
      initialStale: true
    }
  )
}