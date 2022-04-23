import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import myToast from '../utils/myToast'

export default function useEditRange(userid, rangeName) {
  const queryClient = useQueryClient();

  return useMutation(
    (range) => api.editRange(userid, rangeName, range.value, range),
    {
      enabled: Boolean(userid),
      onSuccess: (range, variables) => {
        console.log('range: ', range)
        queryClient.invalidateQueries(['ranges'], range)
        myToast('success', `${variables.label} is edited successfully.`)
      },
      onError: error => {
        myToast('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}