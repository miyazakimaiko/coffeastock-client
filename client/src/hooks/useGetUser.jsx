import { useMutation, useQueryClient } from 'react-query';
import * as api from '../api/Users'
import toastOnBottomCenter from '../utils/customToast';

export default function useGetUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async (userid, token) => await api.getUser(userid, token), 
    {
      onSuccess: data => {
        queryClient.setQueryData(['user', 'unit_solid_weight_id'], data.unit_solid_weight_id);
        queryClient.setQueryData(['user', 'unit_fluid_weight_id'], data.unit_fluid_weight_id);
        queryClient.setQueryData(['user', 'unit_temperature_id'], data.unit_temperature_id);
        queryClient.setQueryData(['range', 'origin_range'], data.origin_range.items);
        queryClient.setQueryData(['range', 'farm_range'], data.farm_range.items);
        queryClient.setQueryData(['range', 'variety_range'], data.variety_range.items);
        queryClient.setQueryData(['range', 'process_range'], data.process_range.items);
        queryClient.setQueryData(['range', 'roaster_range'], data.roaster_range.items);
        queryClient.setQueryData(['range', 'method_range'], data.method_range.items);
        queryClient.setQueryData(['range', 'grinder_range'], data.grinder_range.items);
        queryClient.setQueryData(['range', 'water_range'], data.water_range.items);
        queryClient.setQueryData(['range', 'palate_range'], data.palate_range.items);
        queryClient.setQueryData(['range', 'aroma_range'], data.aroma_range.items);
      },
      onError: error => toastOnBottomCenter('error', error.message)
    }
  )
}