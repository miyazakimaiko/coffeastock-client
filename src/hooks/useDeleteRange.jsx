import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Ranges'

export default function useDeleteRange() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

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
        await queryClient.invalidateQueries('ranges');
        await queryClient.invalidateQueries(['range', `${variables.rangeName}_range`]);
        await queryClient.invalidateQueries(['user', user.sub, 'totalUsedMb']);
        toastOnBottomCenter(
          "success",
          "Selected range has been deleted successfully."
        );
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ? err.message : 'An unknown error has ocurred.');
      },
    }
  );
}