import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast'

export default function useDeleteRange(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    (data) => api.deleteRange(userid, data.rangeName, data.body),
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['ranges'])
        toastOnBottomCenter('success', 'Selected range has been deleted successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}