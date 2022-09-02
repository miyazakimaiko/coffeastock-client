import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Beans'

export default function useEditBean() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (bean) => await api.editBean(user.sub, bean, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
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