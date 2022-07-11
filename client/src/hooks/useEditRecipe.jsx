import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Recipes'
import toastOnBottomCenter from '../utils/customToast'

export default function useEditRecipe(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.editRecipe(userid, body),
    {
      enabled: Boolean(userid),
      onSuccess: async (variables) => {
        await queryClient.invalidateQueries(['bean', variables[0].bean_id, 'recipes'])
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Recipe is edited successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ?? 'An unknown error has ocurred.')
      }
    }
  )
}