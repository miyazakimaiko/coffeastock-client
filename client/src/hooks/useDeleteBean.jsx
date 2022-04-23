import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Beans'
import myToast from '../utils/myToast'

export default function useDeleteBean(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    (beanid) => api.deleteBean(userid, beanid),
    {
      enabled: Boolean(userid),
      onSuccess: () => {
        queryClient.invalidateQueries('beans')
        myToast('success', 'Coffee bean is deleted successfully.')
      },
      onError: error => {
        myToast('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}