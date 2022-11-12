import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useEditBean() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (bean) => await api.editBean(user.sub, bean, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
      onSuccess: async (variables) => {
        await queryClient.invalidateQueries(['bean', variables[0].bean_id])
        await queryClient.invalidateQueries(['recipes', 'summary']);
        await queryClient.invalidateQueries(['beans', 'summary']);
        toastOnBottomCenter('success', 'Coffee bean is edited successfully.')
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
  )
}