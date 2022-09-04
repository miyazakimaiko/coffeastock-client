import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
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
        await queryClient.invalidateQueries(['user', 'units']);
        toastOnBottomCenter('success', 'Units are edited successfully.')
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate('/login', { replace: true } );
          toastOnBottomCenter('error', 'Not authorized. Please login and try again.');
        }
        else toastOnBottomCenter('error', err.message ? err.message : 'An unknown error has ocurred.');
      },
    }
  )
}