import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Recipes'

export default function useAddRecipe() {
  const user = useUserData(); 
  const queryClient = useQueryClient();

  return useMutation(
    async (body) => await api.addRecipe(
      user.sub, 
      body.bean_id, 
      body, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
      onSuccess: (variables) => {
        queryClient.invalidateQueries(['bean', variables[0].bean_id, 'recipes'])
        queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Recipe is added successfully.')
      },
      onError: error => {
        toastOnBottomCenter('error', error.message ?? 'An unknown error has ocurred.')
      }
    }
  )
}