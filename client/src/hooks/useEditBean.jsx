import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Beans'
import toastOnBottomCenter from '../utils/customToast'

export default function useEditBean(userid, token) {
  const queryClient = useQueryClient();

  return useMutation(
    async (bean) => await api.editBean(userid, bean, token),
    {
      enabled: Boolean(userid),
      onSuccess: async (variables) => {
        await queryClient.refetchQueries(['bean', variables[0].bean_id])
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Coffee bean is edited successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}