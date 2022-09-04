import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/Beans'

export default function useAddBean() {
  const userData = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (body) => await api.addBean(userData.sub, body, userData.accessToken.jwtToken),
    {
      enabled: userData ? true : false,
      onSuccess: async () => {
        await queryClient.invalidateQueries('beans')
        await queryClient.invalidateQueries('ranges')
        toastOnBottomCenter('success', 'Coffee bean is added successfully.')
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