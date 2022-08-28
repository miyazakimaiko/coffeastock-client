import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Beans'
import toastOnBottomCenter from '../utils/customToast'

export default function useAddBean(userid, token) {
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.addBean(userid, body, token),
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.invalidateQueries('beans')
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Coffee bean is added successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}