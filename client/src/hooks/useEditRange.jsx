import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'

export default function useEditRange(userid, rangeName, token) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) =>
      await api.editRange(userid, rangeName, data.body.value, data.body, token),
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.invalidateQueries(["range", `${rangeName}_range`]);
      }
    }
  );
}