import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Ranges'

export default function useDeleteRange() {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => await api.deleteRange(
      user.sub, 
      data.rangeName, 
      data.body, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries([
          "range",
          `${variables.rangeName}_range`,
        ]);
        toastOnBottomCenter(
          "success",
          "Selected range has been deleted successfully."
        );
      },
      onError: error => {
        toastOnBottomCenter(
          "error",
          error.message ? error.message : "An unknown error has ocurred."
        );
      },
    }
  );
}