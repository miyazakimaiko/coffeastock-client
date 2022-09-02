import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Recipes'

export default function useEditRecipe() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.editRecipe(
      user.sub, 
      body, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
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