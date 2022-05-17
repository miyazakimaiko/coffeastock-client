import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Beans'
import toastOnBottomCenter from '../utils/customToast'

export default function useEditBean(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    (bean) => api.editBean(userid, bean),
    {
      enabled: Boolean(userid),
      onSuccess: async (variables) => {
        await queryClient.invalidateQueries(['beans', variables.bean_id])
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Coffee bean is edited successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}