import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast'

export default function useAddRange(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      await api.addRange(userid, data.rangeName, data.body)
    },
    {
      enabled: Boolean(userid),
      onSuccess: () => {
        queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', `New range is added successfully.`)
      },
      onError: (error) => {
        toastOnBottomCenter('error', error.message ?? 'An unknown error has ocurred.')
      }
    }
  )
}