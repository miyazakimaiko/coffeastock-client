import { useQuery, useQueryClient } from 'react-query';
import * as api from '../api/Units'

export default function useUnits(token) {
  const queryClient = useQueryClient();

  return useQuery(
    ['units'],
    () => api.getUnits(token), 
    {
      enabled: token ? true : false,
      initialData: () => { 
        return queryClient.getQueryData('units');
      },
      initialStale: true
    }
  )
}