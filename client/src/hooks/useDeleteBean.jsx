import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Beans'
import toastOnBottomCenter from '../utils/customToast'

export default function useDeleteBean(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    (beanid) => api.deleteBean(userid, beanid),
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.invalidateQueries('beans')
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Coffee bean is deleted successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}