import { useMutation, useQueryClient } from 'react-query'
import { useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

export default function useEditRange(rangeName) {
  const user = useUserData();
  const queryClient = useQueryClient();

  return useMutation(
    async (data) =>
      await api.editRange(
        user.sub, 
        rangeName, 
        data.body.value, 
        data.body, 
        user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
      onSuccess: async () => {
        await queryClient.invalidateQueries(["range", `${rangeName}_range`]);
      }
    }
  );
}