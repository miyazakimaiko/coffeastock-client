import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Recipes'
import toastOnBottomCenter from '../utils/customToast'

export default function useDeleteRecipe(userid, beanid) {
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.deleteRecipe(userid, beanid, body),
    {
      enabled: Boolean(userid && beanid),
      onSuccess: async () => {
        await queryClient.invalidateQueries(["bean", beanid, "recipes"])
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Recipe is deleted successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}