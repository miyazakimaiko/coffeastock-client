import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Beans'
import myToast from '../utils/myToast'

export default function useEditBean(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    (bean) => api.editBean(userid, bean),
    {
      enabled: Boolean(userid),
      onSuccess: (bean, variables) => {
        queryClient.invalidateQueries(['beans', { bean_id :variables.bean_id }], bean)
        myToast('success', 'Coffee bean is edited successfully.')
      },
      onError: error => {
        myToast('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}