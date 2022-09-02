import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Beans'

export default function useAddBean() {
  const userData = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.addBean(userData.sub, body, userData.accessToken.jwtToken),
    {
      enabled: userData ? true : false,
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