import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import myToast from '../utils/myToast'

export default function useAddRange(userid, rangeName) {
  const queryClient = useQueryClient();

  return useMutation(
    (body) => api.addRange(userid, rangeName, body),
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.refetchQueries(['ranges', `${rangeName}_range`])
        myToast('success', `New ${rangeName} range is added successfully.`)
      },
      onError: error => {
        myToast('error', error ? error : 'An unknown error has ocurred.')
      }
    }
  )
}