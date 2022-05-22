import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast'

export default function useAddRange(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      await api.addRange(userid, data.rangeName, data.body);
    },
    {
      enabled: Boolean(userid),
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries([
          "range",
          `${variables.rangeName}_range`,
        ]);
      },
      onError: (error) => {
        toastOnBottomCenter(
          "error",
          error.message ?? "An unknown error has ocurred."
        );
      },
    }
  );
}