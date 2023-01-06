import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Users'

export default function useEditUserUnitIds() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (body) => await api.editUserUnitIds(
      user.sub, 
      body, 
      user.accessToken.jwtToken
    ),
    {
      enabled: user ? true : false,
      onSuccess: async () => {
        await queryClient.refetchQueries(['user', 'info']);
        toastOnBottomCenter('success', 'Units are edited successfully.')
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ?? 'An unknown error has ocurred.');
      },
    }
  )
}