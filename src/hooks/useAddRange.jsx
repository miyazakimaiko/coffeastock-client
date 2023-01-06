import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'
import toastOnBottomCenter from '../utils/customToast';

export default function useAddRange() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (data) => {
      await api.addRange(
        user.sub, 
        data.rangeName, 
        data.body, 
        user.accessToken.jwtToken
      );
    },
    {
      enabled: user ? true : false,
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries(['ranges']);
        await queryClient.invalidateQueries(['range', `${variables.rangeName}_range`]);
        await queryClient.invalidateQueries(['user', user.sub, 'totalUsedMb']);
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        toastOnBottomCenter('error', err.message);
      },
    }
  );
}