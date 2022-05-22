import { useMutation, useQueryClient } from 'react-query'
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast'

export default function useEditRange(userid, rangeName) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) =>
      await api.editRange(userid, rangeName, data.body.value, data.body),
    {
      enabled: Boolean(userid),
      onSuccess: async () => {
        await queryClient.invalidateQueries(["range", `${rangeName}_range`]);
        toastOnBottomCenter("success", `Entry is edited successfully.`);
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