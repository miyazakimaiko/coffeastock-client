import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Beans'
import myToast from '../utils/myToast'

export default function useAddBean(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    (bean) => api.addBean(userid, bean),
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.refetchQueries('beans')
        myToast('success', 'Coffee bean is added successfully.')
      },
      onError: error => {
        myToast('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}