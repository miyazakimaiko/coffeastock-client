import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import myToast from '../utils/myToast'

export default function useEditRange(userid, rangeName) {
  const queryClient = useQueryClient();

  return useMutation(
    (range) => {
      return api.editRange(userid, rangeName, range.value, range)
    },
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.refetchQueries(['ranges', `${rangeName}_range`])
        myToast('success', `Entry is edited successfully.`)
      },
      onError: error => {
        myToast('error', error.message ?? 'An unknown error has ocurred.')
      },
    }
  )
}