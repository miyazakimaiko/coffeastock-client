import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Recipes'
import toastOnBottomCenter from '../utils/customToast'

export default function useDeleteRecipe(userid, beanid, token) {
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.deleteRecipe(userid, beanid, body, token),
    {
      enabled: userid && beanid && token ? true : false,
      onSuccess: async () => {
        await queryClient.refetchQueries(["bean", beanid, "recipes"])
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Recipe is deleted successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ? error.message : 'An unknown error has ocurred.')
      }
    }
  )
}