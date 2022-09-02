import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Recipes'

export default function useDeleteRecipe(beanid) {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.deleteRecipe(user.sub, beanid, body, user.accessToken.jwtToken),
    {
      enabled: user && beanid ? true : false,
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