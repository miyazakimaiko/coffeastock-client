import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import myToast from '../utils/myToast'

export default function useDeleteRange(userid, rangeName) {
  const queryClient = useQueryClient();

  return useMutation(
    (rangeid) => api.deleteRange(userid, rangeName, rangeid),
    {
      enabled: Boolean(userid),
      onSuccess: () => {
        queryClient.invalidateQueries(['ranges', `${rangeName}_range`])
        myToast('success', 'Selected range has been deleted successfully.')
      },
      onError: error => {
        myToast('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}