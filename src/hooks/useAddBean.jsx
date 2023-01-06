import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_COFFEE, TO_LOGIN } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useAddBean() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (body) => await api.addBean(user.sub, body, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
      onSuccess: async () => {
        await queryClient.invalidateQueries(['beans']);
        await queryClient.invalidateQueries(['ranges']);
        await queryClient.invalidateQueries(['recipes', 'summary']);
        await queryClient.invalidateQueries(['beans', 'summary']);
        await queryClient.invalidateQueries(['user', user.sub, 'totalUsedMb']);
        navigate(TO_COFFEE, { replace: true } );
        toastOnBottomCenter('success', 'Coffee bean is added successfully.');
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