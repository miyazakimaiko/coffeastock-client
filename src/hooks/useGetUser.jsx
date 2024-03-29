import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import { useSignout } from '../context/AccountContext';
import * as api from '../api/Users'
import toastOnBottomCenter from '../utils/customToast';

export default function useGetUser() {
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (user) => await api.getUser(user.sub, user.accessToken.jwtToken), 
    {
      onSuccess: data => {
        queryClient.setQueryData(
          ['user', 'units'], 
          {
            unit_solid_weight_id: data.unit_solid_weight_id,
            unit_fluid_weight_id: data.unit_fluid_weight_id,
            unit_temperature_id: data.unit_temperature_id
          });
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
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ?? 'An unknown error has ocurred.');
      },
    }
  )
}