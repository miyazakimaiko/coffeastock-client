import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
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
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else {
          navigate(TO_GENERAL_ERROR, { replace: true } );
        }
      },
    }
  )
}