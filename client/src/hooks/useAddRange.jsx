import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

export default function useAddRange() {
  const userData = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      await api.addRange(
        userData.sub, 
        data.rangeName, 
        data.body, 
        userData.accessToken.jwtToken
      );
    },
    {
      enabled: userData ? true : false,
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries([
          "range",
          `${variables.rangeName}_range`,
        ]);
      }
    }
  );
}