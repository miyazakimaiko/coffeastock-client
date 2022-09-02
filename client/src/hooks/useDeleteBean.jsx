import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Beans'

export default function useDeleteBean() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.deleteBean(user.sub, body, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
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