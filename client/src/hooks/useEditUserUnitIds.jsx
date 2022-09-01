import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Users'
import toastOnBottomCenter from '../utils/customToast'

export default function useEditUserUnitIds(userid, token) {
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.editUserUnitIds(userid, body, token),
    {
      enabled: Boolean(userid),
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