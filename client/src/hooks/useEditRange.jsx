import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast'

export default function useEditRange(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    (data) => {
      api.editRange(userid, data.rangeName, data.body.value, data.body)
    },
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['ranges'])
        toastOnBottomCenter('success', `Entry is edited successfully.`)
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ?? 'An unknown error has ocurred.')
      },
    }
  )
}