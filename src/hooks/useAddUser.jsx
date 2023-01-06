import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout } from '../context/AccountContext'
import * as api from '../api/Users'

export default function useAddUser() {
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (user) => await api.addUser(user.sub, user.contactid, user.accessToken.jwtToken),
    {
      onSuccess: () => toastOnBottomCenter('success', 'Welcome to Coffeeastock!'),
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ?? 'An unknown error has ocurred.');
      }
    }
  )
}