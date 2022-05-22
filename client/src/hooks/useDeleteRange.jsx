import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast'

export default function useDeleteRange(userid) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => await api.deleteRange(userid, data.rangeName, data.body),
    {
      enabled: Boolean(userid),
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
      onError: (error) => {
        toastOnBottomCenter(
          "error",
          error.message ? error.message : "An unknown error has ocurred."
        );
      },
    }
  );
}