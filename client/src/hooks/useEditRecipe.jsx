import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Recipes'
import toastOnBottomCenter from '../utils/customToast'

export default function useEditRecipe(userid, token) {
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.editRecipe(userid, body, token),
    {
      enabled: Boolean(userid),
      onSuccess: async (variables) => {
        await queryClient.invalidateQueries(['bean', variables[0].bean_id, 'recipe', variables[0].recipe_no])
        await queryClient.refetchQueries(['bean', variables[0].bean_id, 'recipes']) // it does not recognize inner values are changed, so it has to force refetch
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Recipe is edited successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ?? 'An unknown error has ocurred.')
      }
    }
  )
}