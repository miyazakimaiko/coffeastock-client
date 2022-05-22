import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Recipes'
import toastOnBottomCenter from '../utils/customToast'

export default function useAddRecipe(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.addRecipe(userid, body.bean_id, body),
    {
      enabled: Boolean(userid),
      onSuccess: (variables) => {
        queryClient.invalidateQueries(['bean', variables[0].bean_id, 'recipes'])
        queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Recipe is added successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}