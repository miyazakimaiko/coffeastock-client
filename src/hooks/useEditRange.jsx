import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN } from '../utils/Paths';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast';

export default function useEditRange(rangeName) {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

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
        await queryClient.invalidateQueries(["ranges"]);
        await queryClient.invalidateQueries(["range", `${rangeName}_range`]);
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ?? 'An unknown error has ocurred.');
      },
    }
  );
}