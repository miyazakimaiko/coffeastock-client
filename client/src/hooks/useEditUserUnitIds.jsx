import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Users'

export default function useEditUserUnitIds() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.editUserUnitIds(
      user.sub, 
      body, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
      onSuccess: async () => {
        await queryClient.invalidateQueries(['user', 'units']);
        toastOnBottomCenter('success', 'Units are edited successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ?? 'An unknown error has ocurred.')
      }
    }
  )
}