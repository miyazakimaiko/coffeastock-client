import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'

export default function useAddRange(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      await api.addRange(userid, data.rangeName, data.body);
    },
    {
      enabled: Boolean(userid),
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries("ranges")
        await queryClient.invalidateQueries([
          "range",
          `${variables.rangeName}_range`,
        ]);
      }
    }
  );
}